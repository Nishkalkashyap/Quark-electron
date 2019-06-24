import { currentBranch, doBucketTransfer, cleanDirectory, folderAlreadyExists, branches, printConsoleStatus } from "./util";
import * as fs from 'fs-extra';
import * as path from 'path';
import { execSync } from "child_process";

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

        if (!releaseNotesExist) {
                throw Error(`Please add release notes.`);
        }

        if (insidersAlreadyExists) {
                printConsoleStatus(`Error: Release Quark-insiders-${releaseJson['insiders']} already exists.`, 'warning');
        } else {
                await doBucketTransfer('quark-builds.quarkjs.io', 'quark-release.quarkjs.io', insidersFolderCopyFrom, insidersFolderCopyTo, false);
                await cleanDirectory('quark-release.quarkjs.io', 'insiders', ignores);
                await doBucketTransfer('quark-release.quarkjs.io', 'quark-release.quarkjs.io', insidersFolderCopyTo, 'insiders', true);
                fs.writeFileSync(`./dev-assets/current-release-notes.md`, '');

                printConsoleStatus(`Increasing version number`, 'info');
                execSync(`npm --no-git-tag-version version patch`);

                printConsoleStatus(`Running npm install`, 'info');
                execSync(`npm install`);
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
                await doBucketTransfer('quark-release.quarkjs.io', 'quark-release.quarkjs.io', stableFolderCopyFrom, stableFolderCopyTo, false);
                await cleanDirectory('quark-release.quarkjs.io', 'stable', ignores);
                await doBucketTransfer('quark-release.quarkjs.io', 'quark-release.quarkjs.io', stableFolderCopyTo, 'stable', true);
        }
}