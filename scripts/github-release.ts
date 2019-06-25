import * as Octokit from '@octokit/rest';
import * as fs from 'fs-extra';
import * as path from 'path';

const octokit = new Octokit({
    auth: process.env.GITHUB_RELEASE
});

const packageJson = JSON.parse(fs.readFileSync('./package.json').toString());

async function createRelease() {
    await octokit.repos.createRelease({
        owner: 'Nishkalkashyap',
        repo: 'Quark-electron',
        tag_name: `${packageJson.version}`
    });

    octokit.repos.uploadReleaseAsset({
        // url,
        // headers,
        name,
        // file
    })
}