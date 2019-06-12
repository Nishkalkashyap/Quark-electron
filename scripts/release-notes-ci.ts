import * as fs from 'fs-extra';
import * as Mastodon from 'mastodon-api';
import * as YAML from 'yamljs';
import * as hasha from 'hasha';
import * as js from 'js-beautify';

import * as dotenv from 'dotenv';
import { PackageJson } from 'type-fest';
import { printConsoleStatus, fetchFolderContents, currentBranch, metaData } from './util';
import console = require('console');
dotenv.config({
    path: './scripts/mastodon.env'
});

const json: PackageJson = fs.readJsonSync('./package.json');
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
    // updateReadme();
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
    const files = await fetchFolderContents(metaData['master-all'].bucketName, `Quark-${json.version}`);
    const latest = YAML.parse((await files.find((val) => val.name.endsWith('latest.yml')).download()).toString());

    const shasumFiles = files.filter((file) => {
        console.log(file.name);
        return file.name.endsWith('shasum.json');
    }).map(async (file) => {
        return (await file.download())[0].toString();
    });

    const results = await Promise.all(shasumFiles);

    let obj: any = {};
    results.map((val) => {
        obj = Object.assign(JSON.parse(JSON.stringify(obj)), JSON.parse(val));
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

// function updateReadme() {
//     let file = fs.readFileSync('./README.md').toString();
//     const regex = /```json[\w\W]+?```/;
//     file = file.replace(regex, '```json\n' + JSON.stringify(json.dependencies, undefined, 4) + '\n```');
//     fs.writeFileSync('./README.md', file);
// }

interface IYAML {
    version: number;
    path: string;
    sha512: string;
    releaseDate: string;
    files: { url: string; sha512: string; size: number; }[]
}

interface StorageObjectMetadata {
    name: string,
    bucket: string,
    generation: string,
    metageneration: string,
    timeCreated: string,
    updated: string,
    storageClass: string,
    timeStorageClassUpdated: string,
    size: string,
    md5Hash: string,
    crc32c: string,
    etag: string
}