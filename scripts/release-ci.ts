import { currentBranch, doBucketTransfer, cleanDirectory } from "./util";
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

        const insidersFolderCopyFrom = `Quark-master-${releaseJson['insiders']}`;
        const insidersFolderCopyTo = `Quark-insiders-${releaseJson['insiders']}`;
        await doBucketTransfer('quark-builds.quarkjs.io', 'quark-release.quarkjs.io', insidersFolderCopyFrom, insidersFolderCopyTo);
        await cleanDirectory('quark-release.quarkjs.io', 'insiders');
        await doBucketTransfer('quark-release.quarkjs.io', 'quark-release.quarkjs.io', insidersFolderCopyTo, 'insiders');

        const stableFolderCopyFrom = `Quark-insiders-${releaseJson['stable']}`;
        const stableFolderCopyTo = `Quark-stable-${releaseJson['stable']}`;
        await doBucketTransfer('quark-release.quarkjs.io', 'quark-release.quarkjs.io', stableFolderCopyFrom, stableFolderCopyTo);
        await cleanDirectory('quark-release.quarkjs.io', 'stable');
        await doBucketTransfer('quark-release.quarkjs.io', 'quark-release.quarkjs.io', stableFolderCopyTo, 'stable');
}