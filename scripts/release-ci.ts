import { currentBranch, doBucketTransfer, folderAlreadyExists, printConsoleStatus } from "./util";
import * as fs from 'fs-extra';
import * as path from 'path';

release().catch(console.error);
async function release() {

        const releaseJson = fs.readJsonSync(path.join(__dirname, './release.json'));
        const packageJson = fs.readJsonSync('./package.json');

        console.log(`Releasing version: ${packageJson.version}`);
        console.log(`Branch: ${currentBranch}`);

        // if (currentBranch == 'master') {
        //         return;
        // }

        // const masterAllFolderName = `Quark-${packageJson.version}`;
        // await copyContentsToRoot('quark-build-nightly-all.quarkjs.io', masterAllFolderName);

        const insidersFolderCopyFrom = `Quark-master-${releaseJson['stable']}`;
        const insidersFolderCopyTo = `Quark-insiders-${releaseJson['stable']}`;
        const insidersReleaseExists = await folderAlreadyExists('quark-release.quarkjs.io', insidersFolderCopyTo);
        if (!insidersReleaseExists) {
                await doBucketTransfer('quark-builds.quarkjs.io', 'quark-release.quarkjs.io', insidersFolderCopyFrom, insidersFolderCopyTo);
        } else {
                printConsoleStatus(`Release ${insidersFolderCopyTo} already exists.`, 'warning');
        }

        // const stableFolderName = `Quark-${currentBranch}-${releaseJson['stable']}`;
        // const stableReleaseExists = await folderAlreadyExists('quark-release.quarkjs.io', stableFolderName);
        // if (!stableReleaseExists) {
        //         await doBucketTransfer('quark-builds.quarkjs.io', 'quark-release.quarkjs.io', stableFolderName);
        // }
}