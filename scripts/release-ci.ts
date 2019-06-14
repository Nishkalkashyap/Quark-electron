import { currentBranch, doBucketTransfer, cleanDirectory, printConsoleStatus } from "./util";
import * as fs from 'fs-extra';
import * as path from 'path';

release().catch((err) => {
        if (err) {
                console.error(err);
                throw Error(`Failed to release`);
        }
});
async function release() {

        // const copyBranchName = 'master-all';
        const copyBranchName = 'master';

        const releaseJson = fs.readJsonSync(path.join(__dirname, './release.json'));
        const packageJson = fs.readJsonSync('./package.json');
        console.log(`Releasing version: ${packageJson.version}`);
        console.log(`Branch: ${currentBranch}`);

        // const releaseNotesFile = fs.readFileSync('./dev-assets/releaseNotes.md').toString();
        // if (!releaseNotesFile.includes(`Quark-${packageJson.version}`)) {
        //         printConsoleStatus(`Not upload files. Reason: release notes not found for current version ${packageJson.version}`, 'warning');
        //         return;
        // }

        const insidersFolderCopyFrom = `Quark-${copyBranchName}-${releaseJson['insiders']}`;
        const insidersFolderCopyTo = `Quark-insiders-${releaseJson['insiders']}`;
        await doBucketTransfer('quark-builds.quarkjs.io', 'quark-release.quarkjs.io', insidersFolderCopyFrom, insidersFolderCopyTo, false);
        await cleanDirectory('quark-release.quarkjs.io', 'insiders');
        await doBucketTransfer('quark-release.quarkjs.io', 'quark-release.quarkjs.io', insidersFolderCopyTo, 'insiders', true);

        const stableFolderCopyFrom = `Quark-insiders-${releaseJson['stable']}`;
        const stableFolderCopyTo = `Quark-stable-${releaseJson['stable']}`;
        await doBucketTransfer('quark-release.quarkjs.io', 'quark-release.quarkjs.io', stableFolderCopyFrom, stableFolderCopyTo, false);
        await cleanDirectory('quark-release.quarkjs.io', 'stable');
        await doBucketTransfer('quark-release.quarkjs.io', 'quark-release.quarkjs.io', stableFolderCopyTo, 'stable', true);
}