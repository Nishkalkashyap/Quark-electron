import * as fs from 'fs-extra';
import { getFilesForVersion, uploadFilesToBucket, metaData, currentBranch } from './util';

const json = JSON.parse(fs.readFileSync('./package.json').toString());

root();
function root() {
    const paths = getFilesForVersion(json.version, process.platform);

    const logsFilePath = `./test/__testResults__/${process.platform}-test-logs.txt`;
    fs.copyFileSync('./test/__testResults__/test-logs.txt', logsFilePath);

    paths.push(logsFilePath);
    paths.push('./dev-assets/releaseNotes.md');
    paths.push('./package.json');

    uploadFilesToBucket(metaData[currentBranch].storageUrl, json.version, paths, currentBranch == 'master');
}
