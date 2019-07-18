import * as Octokit from '@octokit/rest';
import * as fs from 'fs-extra';
import { currentBranch, branches } from './util';
import * as dotenv from 'dotenv';
dotenv.config({ path: './dev-assets/prod.env' });

export const octokit = new Octokit({
    auth: process.env.GITHUB_RELEASE
});

export const packageJson = JSON.parse(fs.readFileSync('./package.json').toString());
export const owner = 'Nishkalkashyap';
export const repo = 'Quark-electron';
export const tag_name = `v${packageJson.version}`;

export async function listRelease() {
    return await octokit.repos.listReleases({
        owner,
        repo
    });
}

export async function updateRelease(params: Octokit.ReposUpdateReleaseParams) {
    return await octokit.repos.updateRelease(Object.assign({
        owner,
        repo
    }, params));
}


export async function deleteRelease(id: number) {
    return await octokit.repos.deleteRelease({
        owner,
        repo,
        release_id: id
    });
}

export async function getCurrentReleaseForBranch(branch: branches) {
    const releases = await listRelease();
    const currentReleaseExists = releases.data.find((rel) => {
        return rel.tag_name == `v${packageJson.version}` && rel.target_commitish == branch;
    });
    return currentReleaseExists;
}

export async function getReleaseForTagName(tag_name: string) {
    const releases = await listRelease();
    const versionRelease = releases.data.find((rel) => {
        return rel.tag_name == tag_name;
    });
    return versionRelease;
}

export async function getAssetsForCurrentRelease(release_id: number) {
    const assets = await octokit.repos.listAssetsForRelease({
        owner,
        repo,
        release_id
    });
    return assets;
}