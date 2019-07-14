import { currentBranch, doBucketTransfer, cleanDirectory, folderAlreadyExists, branches, printConsoleStatus } from "./util";
import * as fs from 'fs-extra';
import * as path from 'path';
import { execSync } from "child_process";
import { getCurrentReleaseForBranch, getAssetsForCurrentRelease, updateRelease, owner, repo, getReleaseForTagName } from "./github-release-assets";

release().catch((err) => {
        if (err) {
                console.error(err);
                throw Error(`Failed to release`);
        }
});
async function release() {

        const copyBranchName: branches = 'master-all';

        const releaseJson = fs.readJsonSync(path.join(__dirname, './release.json'));
        const brokenJson = fs.readJsonSync(path.join(__dirname, './broken-releases.json'));
        const packageJson = fs.readJsonSync('./package.json');
        console.log(`Releasing version: ${releaseJson['stable']}`);
        console.log(`Branch: ${currentBranch}`);
        const ignores = /(blockmap)/;


        const insidersFolderCopyFrom = `Quark-${copyBranchName}-${releaseJson['insiders']}`;
        const insidersFolderCopyTo = `Quark-insiders-${releaseJson['insiders']}`;
        const insidersAlreadyExists = await folderAlreadyExists('quark-release.quarkjs.io', insidersFolderCopyTo);
        const releaseNotesExist = fs.readFileSync('./dev-assets/current-release-notes.md').toString().replace(/\s/g, '').length;


        if (insidersAlreadyExists) {
                printConsoleStatus(`Error: Release Quark-insiders-${releaseJson['insiders']} already exists.`, 'warning');
        } else {
                if (!releaseNotesExist) {
                        throw Error(`Please add release notes.`);
                }

                // github-hooks
                const currentGithubRelease = await getCurrentReleaseForBranch('master-all');
                const assets = await getAssetsForCurrentRelease(currentGithubRelease.id);
                if (assets.data.length != 14) {
                        printConsoleStatus(`All assets were not released in github releases`, 'danger');
                        throw Error(`All assets were not released in github releases`);
                }
                await updateRelease({
                        owner, repo, draft: false, prerelease: true, release_id: currentGithubRelease.id,
                        name: `Quark-${currentGithubRelease.tag_name}-insiders`,
                        body: fs.readFileSync('./dev-assets/current-release-notes.md').toString()
                });

                // google-cloud-hooks
                await doBucketTransfer('quark-builds.quarkjs.io', 'quark-release.quarkjs.io', insidersFolderCopyFrom, insidersFolderCopyTo, false);
                await cleanDirectory('quark-release.quarkjs.io', 'insiders', ignores);
                await doBucketTransfer('quark-release.quarkjs.io', 'quark-release.quarkjs.io', insidersFolderCopyTo, 'insiders', true);


                // post-release-hooks
                fs.writeFileSync(`./dev-assets/current-release-notes.md`, '');

                printConsoleStatus(`Increasing version number`, 'info');
                execSync(`npm --no-git-tag-version version patch`);

                printConsoleStatus(`Remember to run npm install`, 'info');
                // execSync(`npm install`);
        }

        const stableFolderCopyFrom = `Quark-insiders-${releaseJson['stable']}`;
        const stableFolderCopyTo = `Quark-stable-${releaseJson['stable']}`;
        const stableAlreadyExists = await folderAlreadyExists('quark-release.quarkjs.io', stableFolderCopyTo);

        if ((brokenJson as string[]).includes(releaseJson['stable'])) {
                printConsoleStatus(`Tried to release broken release`, 'danger');
                throw Error(`Tried to release broken release`);
        }

        if (stableAlreadyExists) {
                printConsoleStatus(`Error: Release Quark-stable-${releaseJson['stable']} already exists.`, 'warning');
        } else {
                // github-hooks
                const stableReleaseGithub = await getReleaseForTagName(`v${releaseJson['stable']}`);
                if (stableReleaseGithub) {
                        await updateRelease({
                                owner, repo, release_id: stableReleaseGithub.id,
                                name: `Quark-${stableReleaseGithub.tag_name}`,
                                prerelease: false
                        });
                }

                await doBucketTransfer('quark-release.quarkjs.io', 'quark-release.quarkjs.io', stableFolderCopyFrom, stableFolderCopyTo, false);
                await cleanDirectory('quark-release.quarkjs.io', 'stable', ignores);
                await doBucketTransfer('quark-release.quarkjs.io', 'quark-release.quarkjs.io', stableFolderCopyTo, 'stable', true);
        }
}