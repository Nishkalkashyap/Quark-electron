import { Storage } from '@google-cloud/storage';
import * as fs from 'fs-extra';
import { printConsoleStatus, buckets, getFilesForVersion } from './util';
import * as path from 'path';
import { execSync } from 'child_process';
import console = require('console');

process.env.GOOGLE_APPLICATION_CREDENTIALS = './dev-assets/cloud-storage-key.json';
const bucketName: buckets = 'quarkjs-builds';
const json = JSON.parse(fs.readFileSync('./package.json').toString());
const version = json.version;

const storage = new Storage({
    projectId: 'diy-mechatronics'
});

const linuxFiles = getFilesForVersion(version, 'linux');
const winFiles = getFilesForVersion(version, 'win32');

// const isMaster = process.env.TRAVIS_BRANCH ? process.env.TRAVIS_BRANCH.includes('master') : !!execSync('git branch').toString().match(/\*[\s]+?master/);
const gitBranch = execSync('git branch').toString();
console.log(gitBranch);
const isMaster = gitBranch.includes('master') ? true : false;

const paths = process.platform == 'linux' ? linuxFiles : process.platform == 'win32' ? winFiles : linuxFiles;

paths.push('./test/__testResults__/test-logs.txt');
paths.push('./dev-assets/releaseNotes.md');
paths.push('./package.json');

upload();
function upload() {

    paths.map((_path) => {
        if (fs.existsSync(_path)) {
            const file = storage.bucket(bucketName).file(`Quark-${json.version}-${isMaster ? 'master' : 'release'}/${_path.endsWith('txt') ? (process.platform + '-' + path.basename(_path)) : path.basename(_path)}`);
            fs.createReadStream(_path)
                .pipe(file.createWriteStream())
                .on('error', function (err) {
                    if (err) {
                        console.error(err);
                        printConsoleStatus(`Error uploading: ${_path}`, 'danger');
                    }
                })
                .on('finish', function () {
                    printConsoleStatus(`Finished file: ${_path}`, 'success');
                });
            return;
        }


        printConsoleStatus(`File not found: ${_path}; Allow faliure: ${isMaster};`, 'danger');
        if (!isMaster) {
            console.log(gitBranch);
            throw Error(`File not found: ${_path}`);
        }
    });


}