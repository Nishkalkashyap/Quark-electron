import { currentBranch, fetchFolderContents, metaData } from "./util";
import * as fs from 'fs-extra';
import * as path from 'path';
import { execSync } from "child_process";


async function checkout() {

    if (currentBranch == 'master' || currentBranch == 'master-all') {
        return;
    }

    const releaseJson = fs.readJsonSync(path.join(__dirname, './release.json'));
    const packageJson = fs.readJsonSync('./package.json');
    const folderName = `Quark-${releaseJson[currentBranch] || packageJson.version}`;

    const content = await fetchFolderContents(metaData[currentBranch].bucketName, folderName);
    if (content.length) {
        throw Error(`Release already exists`);
    }

    if (currentBranch == 'insiders') {
        const file = (await fetchFolderContents(metaData['master-all'].bucketName, folderName)).find((file) => { return file.name.endsWith('git-commit.txt') });
        const gitCommit = (await file.download()).toString();
        execSync(`git checkout -qf ${gitCommit}`);
        return;
    }

}