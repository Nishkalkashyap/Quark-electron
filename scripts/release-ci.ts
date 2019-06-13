import { currentBranch, doBucketTransfer, folderAlreadyExists } from "./util";
import * as fs from 'fs-extra';
import * as path from 'path';

release().catch(console.error);
async function release() {

        const releaseJson = fs.readJsonSync(path.join(__dirname, './release.json'));
        const packageJson = fs.readJsonSync('./package.json');

        console.log(`Releasing version: ${packageJson.version}`);
        console.log(`Branch: ${currentBranch}`);

        // if (currentBranch == 'master') {
        //         const masterFolderName = `Quark-${packageJson.version}`;
        //         await copyContentsToRoot('quark-build-nightly.quarkjs.io', masterFolderName);
        //         return;
        // }

        // const masterAllFolderName = `Quark-${packageJson.version}`;
        // await copyContentsToRoot('quark-build-nightly-all.quarkjs.io', masterAllFolderName);

        // const stableFolderName = `Quark-${releaseJson['stable']}`;
        // const stableReleaseExists = await folderAlreadyExists('quark-release.quarkjs.io', stableFolderName);
        // if (!stableReleaseExists) {
        //         await doBucketTransfer('quark-builds.quarkjs.io', 'quark-build-stable.quarkjs.io', stableFolderName);
        //         await copyContentsToRoot('quark-build-stable.quarkjs.io', stableFolderName)
        // }
}