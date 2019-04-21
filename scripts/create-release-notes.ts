import * as fs from 'fs-extra';
import * as Mastodon from 'mastodon-api';
import chalk from 'chalk';
import * as YAML from 'yamljs';
import * as hasha from 'hasha';
import * as js from 'js-beautify';

import * as dotenv from 'dotenv';
import { PackageJson } from 'type-fest';
dotenv.config({
    path: './scripts/mastodon.env'
});

const json: PackageJson = fs.readJsonSync('./package.json');
const latest = YAML.parse(fs.readFileSync(`./release/${json.version}/latest.yml`).toString());
const tempReleaseNotesPath = `./current-release-notes.md`;
const releaseNotesPath = `./releaseNotes.md`;

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
    str = str.concat(`!!! info See SHA-512 Hashes`, '\n');
    str = str.concat(`<DropDown>`, '\n');
    str = str.concat(`<ReleaseNotes :sha='${js.js_beautify(JSON.stringify(obj))}' />`, '\n');
    str = str.concat(`</DropDown>`, '\n');
    str = str.concat('!!!', '\n\n');
    str = str.concat('<!-- ---------------------------------------------- -->', '\n');
    str = str.concat(postText);
    str = str.concat(baseReleaseNotes);
    fs.writeFileSync(releaseNotesPath, str);
    console.log(chalk.greenBright('|  ✅  | Release notes added successfully!'));
    return str;
}

createShaHash().catch(console.error);
publishStatus().catch(console.error);
// createReleaseNotes();

async function publishStatus() {
    const M = new Mastodon({
        client_key: process.env.CLIENT_KEY,
        client_secret: process.env.CLIENT_SECRET,
        access_token: process.env.CLIENT_TOKEN,
        timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
        api_url: 'https://social.quarkjs.io/api/v1/', // optional, defaults to https://mastodon.social/api/v1/
    });

    const date = new Date();

    //2 is the account id of the bot
    M.get('accounts/2/statuses', null, (err, data: IStatus[] = []) => {


        if (err) {
            console.error(err);
            return;
        }

        const statuses = data.filter((status) => {
            return status.tags.some((st) => { return st.name == 'newrelease' });
        });

        const lastStatus = (statuses[0] || {} as any).content || '';
        const preText = `Quark-v${json.version} - ${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
        const tempNotes = fs.readFileSync(tempReleaseNotesPath).toString().replace(/###\s?/gi, '');
        const dashes = `------------------------`;
        const emoji = getRandomEmoji();
        const finalNotes = String().concat(preText, `\nRelease Notes:\n${dashes}\n\n`, tempNotes, `\n\n${dashes}\n#newRelease ${emoji} ${emoji} ${getRandomEmoji()}`);
        if (lastStatus.includes(tempNotes)) {
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
                status: finalNotes,
                visibility: 'public'
            }
            M.post('statuses', params, (err, data: IStatus) => {
                if (err) {
                    console.error('An error occured while trying to post status.');
                    console.log(err);
                }
                console.log(chalk.greenBright('|  ✅  | Status was updated successfully!'));
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