import * as fs from 'fs-extra';
import * as Mastodon from 'mastodon-api';
import * as YAML from 'yamljs';
import * as hasha from 'hasha';
import * as js from 'js-beautify';

import * as dotenv from 'dotenv';
import { PackageJson } from 'type-fest';
import { spawn, exec } from 'child_process';
import { printConsoleStatus } from './util';
dotenv.config({
    path: './scripts/mastodon.env'
});

const json: PackageJson = fs.readJsonSync('./package.json');
const latest: IYAML = YAML.parse(fs.readFileSync(`./release/${json.version}/latest.yml`).toString());
const latestLinux: IYAML = YAML.parse(fs.readFileSync(`./release/${json.version}/latest-linux.yml`).toString());
const tempReleaseNotesPath = `./dev-assets/current-release-notes.md`;
const releaseNotesPath = `./dev-assets/releaseNotes.md`;

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

async function createShaHash(): Promise<any> {
    const files = fs.readdirSync((`./release/${json.version}`));
    const binaries = files.filter((file) => {
        return !(file.includes('latest') || file.includes('blockmap'));
    });

    const obj = {} as any;
    const promises = binaries.map((bin) => {
        return new Promise(async (resolve) => {
            const hash = await hasha.fromFile(`./release/${json.version}/${bin}`, { algorithm: 'sha512', encoding: 'base64' });
            obj[bin] = hash;
            resolve(hash);
        });
    });

    await Promise.all(promises);

    const releasedBinaries = latest.files.concat(latestLinux.files);
    releasedBinaries.map((bin) => {
        if (obj[bin.url] == bin.sha512) {
            printConsoleStatus(`Sha512 matched for ${bin.url}`, 'info');
            return;
        }
        printConsoleStatus(`Sha512 mis matched for ${bin.url}`, 'danger');
    });


    const date = new Date(latest.releaseDate);
    const tempNotes = fs.readFileSync(tempReleaseNotesPath).toString();
    let baseReleaseNotes = fs.readFileSync(releaseNotesPath).toString();

    const preText = `<!-- Quark-${json.version}-start -->`;
    const postText = `<!-- Quark-${json.version}-end -->\n\n\n`;

    if (baseReleaseNotes.includes(json.version)) {
        const start = baseReleaseNotes.indexOf(preText);
        const end = baseReleaseNotes.indexOf(postText) + postText.length;

        const substr = baseReleaseNotes.substring(start, end);
        baseReleaseNotes = baseReleaseNotes.replace(substr, '');
    }

    let str = '';
    str = str.concat(preText, '\n');
    str = str.concat(`## Quark ${json.version} - ${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`, '\n\n');
    str = str.concat(tempNotes, '\n\n');
    str = str.concat(await gitDiff());
    str = str.concat(`!!! info See SHA-512 Hashes`, '\n');
    str = str.concat(`<DropDown>`, '\n');
    str = str.concat(`<ReleaseNotes :sha='${js.js_beautify(JSON.stringify(obj))}' />`, '\n');
    str = str.concat(`</DropDown>`, '\n');
    str = str.concat('!!!', '\n\n');
    str = str.concat('<!-- ---------------------------------------------- -->', '\n');
    str = str.concat(postText);
    str = str.concat(baseReleaseNotes);
    fs.writeFileSync(releaseNotesPath, str);
    printConsoleStatus(`Release notes added successfully!`, 'success');
    return str;
}

createShaHash().catch(console.error);
publishStatus().catch((err) => {
    printConsoleStatus(`Failed to publish status.`, 'danger');
    printConsoleStatus(`${err}`, 'danger');
});

async function gitDiff(): Promise<string> {
    let str = ''

    return new Promise((resolve) => {
        const cp = exec('git --no-pager diff -U2000 ./package.json', {
            cwd: process.cwd(),
            timeout: 1000
        });
        cp.stdout.on('data', (d: Buffer) => {
            str = str.concat(d.toString());
        });
        cp.on('exit', () => {
            resolve(match());
        });
    });

    function match(): string {
        const dependencies = str.match(/"dependencies":\s?{(\n|.|\s)+?}/);
        const devDependencies = str.match(/"devDependencies":\s?{(\n|.|\s)+?}/);

        if (!dependencies) {
            printConsoleStatus('No change in dependency detected.', 'warning');
            return '';
        }

        const allDeps = dependencies[0].replace('"dependencies":', '').split('\n');
        const importantDevDependencies = devDependencies[0].replace('"devDependencies":', '').split('\n').filter((val) => val.includes('electron'));

        const deps = allDeps.concat(importantDevDependencies);

        const added = deps
            .filter((val) => { return val.startsWith('+'); })
            .map((val) => { return val.replace('+', '').replace(/[\s,"^]/g, '') })
            .sort(((a, b) => { return a > b ? -1 : 1 }));

        const removed = deps
            .filter((val) => { return val.startsWith('-'); })
            .map((val) => { return val.replace('-', '').replace(/[\s,"^]/g, '') })
            .sort(((a, b) => { return a > b ? -1 : 1 }));

        const addedObj = {};
        added.map((val) => {
            const split = val.split(':');
            addedObj[split[0]] = split[1];
        });

        const removedObj = {};
        removed.map((val) => {
            const split = val.split(':');
            removedObj[split[0]] = split[1];
        });

        let text = '';

        if (!(added.length && removed.length)) {
            return text;
        }

        text = text.concat('#### Dependencies:', '\n');
        Object.keys(addedObj).map((key) => {
            if (removedObj[key]) {
                if (addedObj[key] != removedObj[key])
                    text = text.concat(`* Updated: \`${key}@${addedObj[key]}\` (Previous: v${removedObj[key]})`, '\n');
            } else {
                text = text.concat(`* Added: \`${key}@${addedObj[key]}\``, '\n');
            }
        });

        Object.keys(removedObj).map((key) => {
            if (!addedObj[key]) {
                text = text.concat(`* Removed: \`${key}@${removedObj[key]}\``, '\n');
            }
        });

        return String().concat(text, '\n\n');
    }
}

async function publishStatus() {
    const M = new Mastodon({
        client_key: process.env.CLIENT_KEY,
        client_secret: process.env.CLIENT_SECRET,
        access_token: process.env.CLIENT_TOKEN,
        timeout_ms: 60 * 1000,
        api_url: 'https://social.quarkjs.io/api/v1/'
    });

    const date = new Date(latest.releaseDate);

    //2 is the account id of the bot
    M.get('accounts/2/statuses', null, async (err, data: IStatus[] = []) => {

        if (err) {
            console.error(err);
            return;
        }

        const statuses = data.filter((status) => {
            return status.tags.some((st) => { return st.name == 'newrelease' });
        });

        const lastStatus = (statuses[0] || {} as any).content || '';

        const dashes = `------------------------`;
        let currentReleaseNotes = '';
        const diff = (await gitDiff()).replace(/[#`]\s?/gi, '');
        const tempReleaseNoets = fs.readFileSync(tempReleaseNotesPath).toString().replace(/[#`]\s?/gi, '');

        currentReleaseNotes = currentReleaseNotes.concat(tempReleaseNoets, '\n\n');
        currentReleaseNotes = currentReleaseNotes.concat(diff, '\n\n');

        currentReleaseNotes.length > 360 ? currentReleaseNotes = currentReleaseNotes.replace(/\(Previous.+\)/g, '') : null;
        currentReleaseNotes.length > 360 ? currentReleaseNotes = currentReleaseNotes.replace(/\b@.+/g, '') : null;
        if (currentReleaseNotes.length > 360) {
            currentReleaseNotes = currentReleaseNotes.replace(/Dependencies/g, 'Dependencies Updated');
            currentReleaseNotes = currentReleaseNotes.replace(/\*(.*?):\s?/g, '* ');
        }
        currentReleaseNotes.length > 360 ? currentReleaseNotes = tempReleaseNoets : null;
        currentReleaseNotes.length > 360 ? currentReleaseNotes = currentReleaseNotes.substring(0, 355).concat('\n', '....') : null;

        const emoji = getRandomEmoji();

        let notes = '';
        notes = notes.concat(`Quark-v${json.version} - ${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`, '\n');
        notes = notes.concat('Release Notes: https://quarkjs.io/FAQ/release-notes.html', '\n');
        notes = notes.concat(dashes, '\n\n');
        notes = notes.concat(currentReleaseNotes, '\n\n');
        notes = notes.concat(dashes, '\n');
        notes = notes.concat(`#newRelease ${emoji} ${emoji} ${getRandomEmoji()}`);

        if (lastStatus.includes(currentReleaseNotes)) {
            return;
        }

        if (lastStatus.includes(`Quark-v${json.version}`)) {
            M.delete(`statuses/${statuses[0].id}`, null, (err, data) => {
                postStatus();
            });
            return;
        }

        postStatus();

        function getRandomEmoji() {
            const emojis = ['💯', '🍻', '💃', '👊', '🐶', '💃'];
            return emojis[randomIntFromInterval(0, 5)];

            function randomIntFromInterval(min: number, max: number) {
                return Math.floor(Math.random() * (max - min + 1) + min);
            }
        }


        function postStatus() {
            const params = {
                status: notes,
                visibility: 'public'
            }
            M.post('statuses', params, (err, data: IStatus) => {
                if (err) {
                    console.log(err, notes, notes.length);
                    printConsoleStatus('An error occured while trying to post status.', 'danger');
                    return;
                }
                printConsoleStatus(`Status was updated successfully!`, 'success');
            });
        }
    });
}

interface IStatus {
    id: string;
    content: string;
    created_at: string;
    tags: { name: string, url: string }[]
}

interface IYAML {
    version: number;
    path: string;
    sha512: string;
    releaseDate: string;
    files: { url: string; sha512: string; size: number; }[]
}