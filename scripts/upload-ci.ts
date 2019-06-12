import * as fs from 'fs-extra';
import { getFilesToUpload, uploadFilesToBucket, metaData, currentBranch } from './util';
import * as hasha from 'hasha';
import * as path from 'path';

const json = JSON.parse(fs.readFileSync('./package.json').toString());

root();
async function root() {
    const paths = getFilesToUpload(json.version, process.platform);

    const shasumFilePath = `./${process.platform}-shasum.json`;
    await createShasumFile(paths, shasumFilePath);

    const logsFilePath = `./test/__testResults__/${process.platform}-test-logs.txt`;
    fs.copyFileSync('./test/__testResults__/test-logs.txt', logsFilePath);

    paths.push(shasumFilePath);
    paths.push(logsFilePath);
    paths.push('./dev-assets/releaseNotes.md');
    paths.push('./package.json');

    uploadFilesToBucket(metaData[currentBranch].bucketName, json.version, paths, currentBranch == 'master');
}

async function createShasumFile(paths: string[], outPath: string) {
    let obj: any = {};
    const promises = paths.map(async (filePath) => {
        const hash = await hasha.fromFile(filePath, { algorithm: 'sha512', encoding: 'base64' });
        obj[path.basename(filePath)] = hash;
        return hash;
    });

    await Promise.all(promises);
    fs.ensureFileSync(outPath);
    fs.writeJsonSync(outPath, obj);
}
