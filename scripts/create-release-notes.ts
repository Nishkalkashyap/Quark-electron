import * as fs from 'fs-extra';
import * as Mastodon from 'mastodon-api';
import chalk from 'chalk';

import * as dotenv from 'dotenv';
dotenv.config({
    path: './scripts/mastodon.env'
});

const json = fs.readJsonSync('./package.json');
const tempReleaseNotesPath = `./current-release-notes.md`;
const releaseNotesPath = `./releaseNotes.md`;

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

createReleaseNotes();
publishStatus();

function createReleaseNotes() {

    const tempNotes = fs.readFileSync(tempReleaseNotesPath).toString();
    const baseReleaseNotes = fs.readFileSync(releaseNotesPath).toString();
    const date = new Date();
    const str =
        `## Quark ${json.version} - ${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}
__Release Notes for v${json.version}__`
    const finalReleaseNotes = String().concat(str, '\n\n', tempNotes, '\n\n\n', '----------------------------------------------\n\n\n', baseReleaseNotes);
    if (baseReleaseNotes.includes(`# Quark ${json.version} - ${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`)) {
        return;
    }
    fs.writeFileSync(releaseNotesPath, finalReleaseNotes);
    console.log(chalk.greenBright('|  ✅  | Release notes added successfully!'));
}

function publishStatus() {
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