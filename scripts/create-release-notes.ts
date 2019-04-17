import * as fs from 'fs-extra';
import * as Mastodon from 'mastodon-api'

const json = fs.readJsonSync('./package.json');
const tempReleaseNotesPath = `./current-release-notes.md`;
const releaseNotesPath = `./releaseNotes.md`;

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

if (fs.readFileSync(releaseNotesPath).toString().includes(fs.readFileSync(tempReleaseNotesPath).toString())) {
    throw Error('Please Update Release Notes');
}

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
}

function publishStatus() {
    const M = new Mastodon({
        client_key: 'fbebde85f946a9fa38a2712f846b271efbcf5fbeca1a19569204bc12da2bb5de',
        client_secret: '887ed999db6948be15d3a4e5351c04b7d4860f0a88cb4fb9f49d0205cbf4f088',
        access_token: 'e947816069f9f0445076b56e09af96de7263f33d5d184550609d3b8e670ff198',
        timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
        api_url: 'https://social.quarkjs.io/api/v1/', // optional, defaults to https://mastodon.social/api/v1/
    });

    const date = new Date();

    //2 is the account id of the bot
    M.get('accounts/2/statuses', null, (err, data: IStatus[] = []) => {

        if (err) {
            return;
        }

        const statuses = data.filter((status) => {
            return status.tags.some((st) => { return st.name == 'newrelease' });
        });

        const lastStatus = (statuses[0] || {} as any).content || '';
        const preText = `Quark-v${json.version} - ${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
        const tempNotes = fs.readFileSync(tempReleaseNotesPath).toString().replace(/###\s?/gi, '');
        const dashes = `------------------------`;
        const finalNotes = String().concat(preText, `\nRelease Notes:\n${dashes}\n\n`, tempNotes, `\n\n${dashes}\n#newRelease`);
        if (lastStatus.includes(tempNotes)) {
            return;
        }

        const params = {
            status: finalNotes,
            visibility: 'public'
        }

        if (lastStatus.includes(`Quark-v${json.version}`)) {
            M.delete(`statuses/${statuses[0].id}`, null, (err, data) => {
                postStatus();
            });
            return;
        }

        postStatus();

        function postStatus() {
            M.post('statuses', params, (err, data: IStatus) => {
                // console.log(err, data);
                if (err) {
                    console.error('An error occured while trying to post status.');
                    console.log(err);
                }
                console.log();
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