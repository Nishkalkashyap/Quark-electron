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

process.env.GOOGLE_APPLICATION_CREDENTIALS = './cloud-storage-key.json';
const bucketName = 'quarkjs-auto-update';

const storage = new Storage({
    projectId: 'diy-mechatronics'
});

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
const alreadyExists: string[] = [];
const obj: { [path: string]: Table } = {};
let uploadComplete = false;

storage.bucket(bucketName).getFiles().then((folders) => {
    folders.map((folder) => {
        folder.map((file) => {
            if (!file.name.includes(`Quark-${json.version}/`)) {
                return;
            }
            alreadyExists.push(file.name.replace(`Quark-${json.version}/`, ''));
        });
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
                obj[key].eta + ' min',
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
            printConsoleStatus('All files were uploaded successfully!', 'success');

            const result = await copyToRoot();

            if (result) {
                const pro = exec('ts-node ./scripts/create-release-notes.ts');
                pro.stdout.pipe(process.stdout);
                pro.stderr.pipe(process.stderr);

                pro.addListener('exit', (code) => {
                    process.exit(code);
                });
            } else {
                throw Error('Failed to copy files.');
            }
        }
    }, 500);
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
                length: chalk.cyanBright(Number(percent.length).toFixed(2).toString()),
                percent: chalk.greenBright(Number(percent.percentage).toFixed(2).toString()),
                remaining: chalk.magentaBright(Number(percent.remaining).toFixed(2).toString()),
                speed: chalk.redBright(Number(percent.speed).toFixed(2)).toString(),
                eta: chalk.whiteBright(percent.eta.toString()),
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
                obj[objKey].errored = true;
                if (obj[objKey].stream) {
                    obj[objKey].stream.end();
                }
            })
            .on('finish', function () {
                obj[objKey].uploaded = true;
            }) as any;
    });
}