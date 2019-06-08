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

root().then(() => {
    fs.writeFileSync('./buildAssets/__package.json', fs.readFileSync('package.json'));
}).catch(console.error);
async function root() {
    await createShaHash().catch(console.error);
    await publishStatus().catch((err) => {
        printConsoleStatus(`Failed to publish status.`, 'danger');
        printConsoleStatus(`${err}`, 'danger');
    });
    updateReadme();
}



function gitDiff(): string {
    const current = fs.readJsonSync('./package.json');
    const previous = fs.readJsonSync('./buildAssets/__package.json');

    const currentDeps = getImportantDeps(current);
    const previousDeps = getImportantDeps(previous);

    let text = '';
    text = text.concat('#### Dependencies:', '\n');
    Object.keys(currentDeps).map((key) => {
        if (!previousDeps[key]) {
            text = text.concat(`* Added: \`${key}@${currentDeps[key]}\``, '\n');
            return;
        }

        if (previousDeps[key] != currentDeps[key]) {
            text = text.concat(`* Updated: \`${key}@${currentDeps[key]}\` (Previous: v${previousDeps[key]})`, '\n');
            return;
        }
    });

    Object.keys(previousDeps).map((key) => {
        if (!currentDeps[key]) {
            text = text.concat(`* Removed: \`${key}@${previousDeps[key]}\``, '\n');
        }
    });

    if (!text.match(/(Added|Updated|Removed)/)) {
        text = '';
    }

    return String().concat(text, '\n\n');

    function getImportantDeps(obj: any) {
        const deps = obj.dependencies;
        const dev = obj.devDependencies;

        Object.keys(dev).map((key) => {
            if (!key.includes('electron')) {
                delete dev[key];
            }
        });

        return Object.assign(deps, dev);
    }
}


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

function updateReadme() {
    let file = fs.readFileSync('./README.md').toString();
    const regex = /```json[\w\W]+?```/;
    file = file.replace(regex, '```json\n' + JSON.stringify(json.dependencies, undefined, 4) + '\n```');
    fs.writeFileSync('./README.md', file);
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