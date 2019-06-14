import { currentBranch, doBucketTransfer, cleanDirectory, folderAlreadyExists, branches, printConsoleStatus } from "./util";
import * as fs from 'fs-extra';
import * as path from 'path';

release().catch((err) => {
        if (err) {
                console.error(err);
                throw Error(`Failed to release`);
        }
});
async function release() {

        const copyBranchName: branches = 'master-all';

        const releaseJson = fs.readJsonSync(path.join(__dirname, './release.json'));
        const packageJson = fs.readJsonSync('./package.json');
        console.log(`Releasing version: ${releaseJson['stable']}`);
        console.log(`Branch: ${currentBranch}`);


        const insidersFolderCopyFrom = `Quark-${copyBranchName}-${releaseJson['insiders']}`;
        const insidersFolderCopyTo = `Quark-insiders-${releaseJson['insiders']}`;
        const insidersAlreadyExists = await folderAlreadyExists('quark-release.quarkjs.io', insidersFolderCopyTo);

        if (insidersAlreadyExists) {
                printConsoleStatus(`Error: Release Quark-insiders-${packageJson.version} already exists.`, 'warning');
        } else {
                await doBucketTransfer('quark-builds.quarkjs.io', 'quark-release.quarkjs.io', insidersFolderCopyFrom, insidersFolderCopyTo, false);
                await cleanDirectory('quark-release.quarkjs.io', 'insiders');
                await doBucketTransfer('quark-release.quarkjs.io', 'quark-release.quarkjs.io', insidersFolderCopyTo, 'insiders', true);
        }

        const stableFolderCopyFrom = `Quark-insiders-${releaseJson['stable']}`;
        const stableFolderCopyTo = `Quark-stable-${releaseJson['stable']}`;
        const stableAlreadyExists = await folderAlreadyExists('quark-release.quarkjs.io', stableFolderCopyTo);

        if (stableAlreadyExists) {
                printConsoleStatus(`Error: Release Quark-stable-${packageJson.version} already exists.`, 'warning');
        } else {
                await doBucketTransfer('quark-release.quarkjs.io', 'quark-release.quarkjs.io', stableFolderCopyFrom, stableFolderCopyTo, false);
                await cleanDirectory('quark-release.quarkjs.io', 'stable');
                await doBucketTransfer('quark-release.quarkjs.io', 'quark-release.quarkjs.io', stableFolderCopyTo, 'stable', true);
        }
}