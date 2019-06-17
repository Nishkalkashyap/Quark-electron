import * as fs from 'fs-extra';
import { getFilesToUpload, uploadFilesToBucket, currentBranch } from './util';
import * as hasha from 'hasha';
import * as path from 'path';
import { execSync } from 'child_process';

const json = JSON.parse(fs.readFileSync('./package.json').toString());

root();
async function root() {
    const paths = getFilesToUpload(json.version, process.platform);

    const shasumFilePath = `./${process.platform}-shasum.json`;
    paths.push(shasumFilePath);
    await createShasumFile(paths, shasumFilePath);

    const gitFilePath = './git-commit.txt';
    paths.push(gitFilePath);
    addGitCommit(gitFilePath);

    const wwwOutPath = './buildResources/www.tar.gz';
    paths.push(wwwOutPath);


    if (process.platform != 'darwin') {
        const logsFilePath = `./test/__testResults__/${process.platform}-test-logs.txt`;
        fs.copyFileSync('./test/__testResults__/test-logs.txt', logsFilePath);
        paths.push(logsFilePath);
    }


    paths.push('./dev-assets/current-release-notes.md');
    paths.push('./package.json');

    uploadFilesToBucket('quark-builds.quarkjs.io', `${currentBranch}-${json.version}`, paths, currentBranch == 'master');
}

async function createShasumFile(paths: string[], outPath: string) {
    let obj: any = {};
    const promises = paths
        .filter((filePath) => {
            return fs.existsSync(filePath)
        }).filter((filePath) => {
            return !filePath.match(/\.(blockmap|yml)$/)
        })
        .map(async (filePath) => {
            try {
                const hash = await hasha.fromFile(filePath, { algorithm: 'sha512', encoding: 'base64' });
                obj[path.basename(filePath)] = hash;
                return hash;
            } catch (err) {
                throw Error(err);
            }
        });

    await Promise.all(promises);
    fs.ensureFileSync(outPath);
    fs.writeJsonSync(outPath, obj);
}

function addGitCommit(filePath: string) {
    const res = execSync('git show --format="%H" --no-patch').toString();
    fs.ensureFileSync(filePath);
    fs.writeFileSync(filePath, res);
}
