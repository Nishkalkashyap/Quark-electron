import * as Octokit from '@octokit/rest';
import * as fs from 'fs-extra';
import * as path from 'path';
import { getFilesToUpload } from './util';
import * as mime from 'mime-types';
import * as dotenv from 'dotenv';
import console = require('console');
dotenv.config({ path: './dev-assets/prod.env' });

const octokit = new Octokit({
    auth: process.env.GITHUB_RELEASE
});

const packageJson = JSON.parse(fs.readFileSync('./package.json').toString());
const owner = 'Nishkalkashyap';
const repo = 'Quark-electron';
const tag = `v${packageJson.version}`;

const files = getFilesToUpload(packageJson.version, process.platform);
root().catch(console.error);

async function root() {
    const releases = await listRelease();
    const currentReleaseExists = releases.data.find((rel) => {
        return rel.tag_name == tag
    });

    let release: Octokit.ReposListReleasesResponseItem[] | Octokit.ReposCreateReleaseResponse;
    if (currentReleaseExists) {
        release = currentReleaseExists;
    } else {
        release = (await createRelease()).data;
    }

    const url = release.upload_url;
    await uploadAssets(url);
}

async function listRelease() {
    return await octokit.repos.listReleases({
        owner,
        repo
    });
}

async function uploadAssets(url: string) {
    const promises = files.map(async (file) => {

        if (!fs.existsSync(file)) {
            return;
        }

        return await octokit.repos.uploadReleaseAsset({
            name: path.basename(file),
            file: fs.readFileSync(file).toString(),
            url,
            headers: {
                "content-length": fs.statSync(file).size,
                "content-type": mime.lookup(file) as any
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