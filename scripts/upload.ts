import { Storage, File } from '@google-cloud/storage';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as p from 'progress-stream';
import { stdout } from 'single-line-log';
import chalk from 'chalk';
import { table } from 'table';
import { exec } from 'child_process';
import { PackageJson } from '@google-cloud/common/build/src/util';
import { printConsoleStatus } from './util';
const json: PackageJson = require('./../package.json');
import * as hasha from 'hasha';

process.env.GOOGLE_APPLICATION_CREDENTIALS = './dev-assets/cloud-storage-key.json';
const bucketName = 'quarkjs-auto-update';

const storage = new Storage({
    projectId: 'diy-mechatronics'
});

const alreadyExists: string[] = [];
const obj: { [path: string]: Table } = {};
let uploadComplete = false;

storage.bucket(bucketName).getFiles().then((folders) => {
    folders.map(async (folder) => {
        const promises = folder.map(async (file) => {
            const replacedFileName = file.name.replace(`Quark-${json.version}/`, '');

            if (!file.name.includes(`Quark-${json.version}/`)) {
                return;
            }

            if (await file.exists()) {
                if (!(await checkIntrgrity(replacedFileName))) {
                    // printConsoleStatus(`Deleting file: ${replacedFileName}; **Shasum Mismatch**`, 'danger');
                    // await file.delete();
                    // printConsoleStatus(`File deleted: ${replacedFileName}`, 'warning');
                    // return;
                    printConsoleStatus(`Intrgrity check failed at: ${replacedFileName}`, 'warning');
                }

                printConsoleStatus(`Shasum matched in uploaded file: ${replacedFileName}`, 'info');
            }

            alreadyExists.push(replacedFileName);
            return true;
        });
        await Promise.all(promises);
        startUploading();
        statusChecker();
    });
}).catch((err) => {
    console.log(err);
});

function statusChecker() {
    setTimeout(() => {
        setInterval(() => {
            const flag = Object.keys(obj).every((key) => { return obj[key].errored; });
            if (flag) {
                startUploading();
            }
        }, 1000);
    }, 5000);

    setInterval(async () => {
        let data = [];
        Object.keys(obj).map((key) => {
            data.push([
                key,
                obj[key].delta,
                obj[key].eta + ' sec',
                obj[key].length,
                obj[key].percent + ' %',
                obj[key].remaining,
                obj[key].speed,
                obj[key].transffered,
                obj[key].uploaded ? chalk.greenBright('Complete') : chalk.magentaBright('In Progress'),
                (obj[key].errored && !obj[key].uploaded) ? chalk.bgRedBright.whiteBright('Errored!!!') : chalk.greenBright('Running'),
            ]);
        });

        data = data.sort((a, b) => {
            return (a[8].includes('Complete') && !b[8].includes('Complete')) ? -1 : 1;
        });

        data.push(['Path', 'Delta', 'ETA', 'Length', 'Percent', 'Remaining', 'Speed', 'Transferred', 'Status', 'Errored']);
        data = data.reverse();

        if (!uploadComplete) {
            stdout('\n' + table(data));
        }

        const statusFlag = Object.keys(obj).every((key) => {
            return obj[key].uploaded;
        });

        if (statusFlag && !uploadComplete) {
            uploadComplete = true;
            printConsoleStatus('All files were uploaded successfully\n\n', 'success');
            printConsoleStatus('Checking integrity of uploaded files.', 'info');

            const promises = fs.readdirSync(`./release/${json.version}`).map((key) => {
                return checkIntrgrity(key);
            });

            const intrgrityCheck = (await Promise.all(promises)).every((val) => val == true);
            if (!intrgrityCheck) {
                printConsoleStatus(`Integrity check failed. Try uploading again.`, 'danger');
                process.exit();
                return;
            }

            printConsoleStatus('All files checked. Status OK!\n\n', 'success');
            printConsoleStatus('Copying new release to root', 'info');

            const result = await copyToRoot();
            if (result) {
                printConsoleStatus('Files successfully copied to root\n\n', 'success');
                printConsoleStatus('Spawning new process to release notes.', 'info');
                const pro = exec('ts-node ./scripts/create-release-notes.ts');
                pro.stdout.pipe(process.stdout);
                pro.stderr.pipe(process.stderr);
                pro.addListener('exit', (code) => {
                    process.exit(code);
                });
            } else {
                printConsoleStatus('Could not copy files to root.', 'danger');
                throw Error('Failed to copy files.');
            }
        }
    }, 500);
}

async function checkIntrgrity(filename: string): Promise<boolean> {
    const file = storage.bucket(bucketName).file(`Quark-${json.version}/${filename}`);
    const meta: StorageObjectMetadata = (await file.getMetadata())[0];
    const hash = await hasha.fromFile(`./release/${json.version}/${filename}`, { algorithm: 'md5', encoding: 'base64' });
    const result = meta.md5Hash == hash.toString();
    if (process.env.DELETE_FILES === 'yes' && !result) {
        file.delete();
    }
    return result;
}

async function copyToRoot() {
    return new Promise(async (resolve) => {
        const currentVersionFiles: File[] = [];
        const filesToDelete: File[] = [];
        storage.bucket(bucketName).getFiles().then(async (folders) => {
            folders.map((folder) => {
                folder.map((file) => {
                    if (!file.name.includes('/') && !file.name.toLocaleLowerCase().match(/(appimage|blockmap)/)) {
                        filesToDelete.push(file);
                    }

                    if (!file.name.includes(`Quark-${json.version}/`)) {
                        return;
                    }

                    currentVersionFiles.push(file);
                });
            });

            const promises: Promise<any>[] = currentVersionFiles.map((file) => {
                return file.copy(file.name.replace(`Quark-${json.version}/`, ''));
            });

            promises.concat(filesToDelete.map((file) => {
                return file.delete();
            }));

            await Promise.all(promises);
            resolve(true);
        }).catch((err) => {
            console.log(err);
            resolve(false);
        });
    });
}


function startUploading() {
    fs.readdirSync(`./release/${json.version}`).map((_path) => {

        const objKey = chalk.blueBright.bold(_path);

        obj[objKey] = {
            delta: chalk.blueBright('----'),
            length: chalk.cyanBright('----'),
            percent: chalk.greenBright('----'),
            remaining: chalk.magentaBright('----'),
            speed: chalk.redBright('----'),
            eta: chalk.whiteBright('----'),
            transffered: chalk.yellowBright('----'),
            uploaded: false,
            errored: false,
            stream: null
        }

        if (alreadyExists.includes(_path)) {
            obj[objKey].uploaded = true;
            return;
        }

        const file = storage.bucket(bucketName).file(`Quark-${json.version}/${_path}`)
        const filePath = path.join('./release', json.version, _path);
        const stat = fs.statSync(filePath);
        const prog = p({
            length: stat.size,
            time: 300
        });
        prog.on('progress', (percent) => {
            obj[objKey] = {
                delta: chalk.blueBright(Number(percent.delta).toFixed(2).toString()),
                eta: chalk.whiteBright(percent.eta.toString()),
                length: chalk.cyanBright(Number(percent.length).toFixed(2).toString()),
                percent: chalk.greenBright(Number(percent.percentage).toFixed(2).toString()),
                remaining: chalk.magentaBright(Number(percent.remaining).toFixed(2).toString()),
                speed: chalk.redBright(Number(percent.speed).toFixed(2)).toString(),
                transffered: chalk.yellowBright(percent.transferred.toString()),
                uploaded: obj[objKey].uploaded,
                errored: false,
                stream: null
            }
        });
        obj[objKey].stream = fs.createReadStream(filePath)
            .pipe(prog)
            .pipe(file.createWriteStream({ resumable: true }))
            .on('error', function (err) {
                if (err) {
                    obj[objKey].errored = true;
                }
                if (obj[objKey].stream) {
                    obj[objKey].stream.end();
                }
            })
            .on('finish', function () {
                obj[objKey].uploaded = true;
            }) as any;
    });
}

interface StorageObjectMetadata {
    name: string,
    bucket: string,
    generation: string,
    metageneration: string,
    timeCreated: string,
    updated: string,
    storageClass: string,
    timeStorageClassUpdated: string,
    size: string,
    md5Hash: string,
    crc32c: string,
    etag: string
}

interface Table {
    delta: string;
    eta: string;
    length: string;

    percent: string;
    remaining: string;
    speed: string;
    transffered: string;

    uploaded: boolean;

    errored: boolean;
    stream: NodeJS.ReadStream;
}