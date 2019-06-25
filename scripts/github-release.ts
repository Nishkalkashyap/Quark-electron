import * as Octokit from '@octokit/rest';
import * as fs from 'fs-extra';
import * as path from 'path';
import { getFilesToUpload } from './util';
import * as mime from 'mime-types';
import * as dotenv from 'dotenv';
import console = require('console');
dotenv.config({ path: './scripts/prod.env' });

const octokit = new Octokit({
    auth: process.env.GITHUB_RELEASE
});
console.log(process.env.GITHUB_RELEASE);

const packageJson = JSON.parse(fs.readFileSync('./package.json').toString());
const owner = 'Nishkalkashyap';
const repo = 'Quark-electron';
const tag = `v${packageJson.version}`;

// const files = getFilesToUpload(packageJson.version, process.platform);
const files = ['./package.json'];

// list releases
// check if ci-test exists
// if exists, upload assets
// if not, create releas and then upload assets

root().catch(console.error);

async function root() {
    const releases = await listRelease();
    const currentReleaseExists = releases.data.find((rel) => {
        return rel.tag_name == tag
    });
    console.log(releases.data);

    if (currentReleaseExists) {
        // currentReleaseExists.ur
    } else {
        // const release = await createRelease();
        // console.log(release);
        createRelease().then((val) => {
            console.log(val);
        }).catch(console.error);
    }
}

async function listRelease() {
    return await octokit.repos.listReleases({
        owner,
        repo
    });
}

async function uploadAssets(url: string) {
    const promises = files.map(async (file) => {
        return await octokit.repos.uploadReleaseAsset({
            name: path.basename(file),
            file,
            url,
            headers: {
                "content-length": fs.statSync('').size,
                "content-type": mime.lookup('') as any
            }
        })
    });

    return Promise.all(promises);
}

async function createRelease() {
    return await octokit.repos.createRelease({
        owner,
        repo,
        tag_name: tag,
        target_commitish: 'master',
        name: `Quark-${tag}`,
        draft: true,
        prerelease: true
    });
}