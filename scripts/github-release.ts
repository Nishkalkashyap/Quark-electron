import * as Octokit from '@octokit/rest';
import * as fs from 'fs-extra';
import * as path from 'path';
import { getFilesToUpload, currentBranch } from './util';
import * as mime from 'mime-types';
import { printConsoleStatus } from 'print-console-status';
import { packageJson, octokit, owner, repo, tag_name, getCurrentReleaseForBranch } from './github-release-assets';

const files = getFilesToUpload(packageJson.version, process.platform);
root()
    .then((res) => {
        printConsoleStatus(`Uploaded all files to github`, 'success');
    })
    .catch((err) => {
        console.error(err);
        throw Error(`Error uploading file`);
    });

async function root() {
    const currentReleaseExists = await getCurrentReleaseForBranch(currentBranch);

    let release: Octokit.ReposListReleasesResponseItem[] | Octokit.ReposCreateReleaseResponse;
    if (currentReleaseExists) {
        release = currentReleaseExists;
    } else {
        release = (await createRelease()).data;
    }

    const url = release.upload_url;
    return await uploadAssets(url, release.id);
}



async function uploadAssets(url: string, release_id: number) {
    const assets = await octokit.repos.listAssetsForRelease({
        owner,
        repo,
        release_id
    });

    const promises = files.map(async (file) => {
        if (!fs.existsSync(file)) {
            return;
        }


        const name = path.basename(file);
        const exists = assets.data.find((val) => {
            return val.name == name;
        });

        if (exists) {
            await octokit.repos.deleteReleaseAsset({ owner, repo, asset_id: exists.id })
        }

        printConsoleStatus(`Uploading file: ${name}`, 'info');
        return await octokit.repos.uploadReleaseAsset({
            name,
            file: fs.readFileSync(file),
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
        tag_name,
        target_commitish: currentBranch,
        name: `Quark-${tag_name}-${currentBranch}`,
        draft: true,
        prerelease: true
    });
}