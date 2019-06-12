import { currentBranch, doBucketTransfer, copyContentsToRoot, folderAlreadyExists } from "./util";
import * as fs from 'fs-extra';
import * as path from 'path';

release().catch(console.error);
async function release() {

        const releaseJson = fs.readJsonSync(path.join(__dirname, './release.json'));
        const packageJson = fs.readJsonSync('./package.json');

        console.log(`Releasing version: ${packageJson.version}`);
        console.log(`Branch: ${currentBranch}`);

        if (currentBranch == 'master') {
                const masterFolderName = `Quark-${packageJson.version}`;
                await copyContentsToRoot('quark-build-nightly.quarkjs.io', masterFolderName);
                return;
        }

        const masterAllFolderName = `Quark-${packageJson.version}`;
        await copyContentsToRoot('quark-build-nightly-all.quarkjs.io', masterAllFolderName);


        const insidersFolderName = `Quark-${releaseJson['insiders']}`;
        const insidersExists = await folderAlreadyExists('quark-build-insiders.quarkjs.io', insidersFolderName);
        if (!insidersExists) {
                await doBucketTransfer('quark-build-nightly-all.quarkjs.io', 'quark-build-insiders.quarkjs.io', insidersFolderName);
                await copyContentsToRoot('quark-build-insiders.quarkjs.io', insidersFolderName);
        }
        

        const stableFolderName = `Quark-${releaseJson['stable']}`;
        const stableReleaseExists = await folderAlreadyExists('quark-build-stable.quarkjs.io', stableFolderName);
        if (!stableReleaseExists) {
                await doBucketTransfer('quark-build-insiders.quarkjs.io', 'quark-build-stable.quarkjs.io', stableFolderName);
                await copyContentsToRoot('quark-build-stable.quarkjs.io', stableFolderName)
        }
}