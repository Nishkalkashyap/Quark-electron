import { currentBranch, doBucketTransfer, copyContentsToRoot } from "./util";
import * as fs from 'fs-extra';
import * as path from 'path';

release().catch(console.error);
async function release() {

        if (currentBranch == 'master') {
                return;
        }

        const releaseJson = fs.readJsonSync(path.join(__dirname, './release.json'));
        const packageJson = fs.readJsonSync('./package.json');
        const folderName = `Quark-${releaseJson[currentBranch] || packageJson.version}`;

        if (currentBranch == 'master-all') {
                await copyContentsToRoot('quark-build-nightly-all.quarkjs.io', folderName);
                return;
        }

        if (currentBranch == 'insiders') {
                await doBucketTransfer('quark-build-nightly-all.quarkjs.io', 'quark-build-insiders.quarkjs.io', folderName);
                await copyContentsToRoot('quark-build-insiders.quarkjs.io', folderName);
                return;
        }

        if (currentBranch == 'stable') {
                await doBucketTransfer('quark-build-insiders.quarkjs.io', 'quark-build-stable.quarkjs.io', folderName);
                await copyContentsToRoot('quark-build-stable.quarkjs.io', folderName)
                return;
        }
}