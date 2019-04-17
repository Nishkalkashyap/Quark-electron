import { Storage } from '@google-cloud/storage';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as p from 'progress-stream';
import { stdout } from 'single-line-log';
import chalk from 'chalk';
import { table } from 'table';
import { exec } from 'child_process';


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

    status: boolean;
}
const alreadyExists = [];

storage.bucket(bucketName).getFiles().then((folders) => {
    folders.map((folder) => {
        folder.map((file) => {
            console.log(file.metadata);
            if (!(file.name.includes('latest') || file.name.includes('blockmap'))) {
                alreadyExists.push(file.name);
            }
        });
        console.log(alreadyExists);
        startUploading();
    })
}).catch((err) => {
    console.log(err);
});

function startUploading() {
    const obj: { [path: string]: Table } = {};
    fs.readdirSync('./release').map((_path) => {

        if (alreadyExists.includes(_path)) {
            return;
        }

        const file = storage.bucket(bucketName).file(_path);
        const filePath = path.join('./release', _path);
        const stat = fs.statSync(filePath);
        const prog = p({
            length: stat.size,
            time: 300
        });
        prog.on('progress', (percent) => {
            obj[chalk.bgBlue.whiteBright.bold(_path)] = {
                delta: chalk.blueBright(Number(percent.delta).toFixed(2).toString()),
                length: chalk.cyanBright(Number(percent.length).toFixed(2).toString()),
                percent: chalk.greenBright(Number(percent.percentage).toFixed(2).toString()),
                remaining: chalk.magentaBright(Number(percent.remaining).toFixed(2).toString()),
                speed: chalk.redBright(Number(percent.speed).toFixed(2)).toString(),
                eta: chalk.whiteBright(percent.eta.toString()),
                transffered: chalk.yellowBright(percent.transferred.toString()),
                status: false
            }
        });
        fs.createReadStream(filePath)
            .pipe(prog)
            .pipe(file.createWriteStream({ resumable: true }))
            .on('error', function (err) {
                console.log(err);
                console.error(`An Error Occured while uploading ${_path}`);
            })
            .on('finish', function () {
                obj[chalk.bgBlue.whiteBright.bold(_path)].status = true;
            });
    });

    let uploadComplete = false;
    setInterval(() => {
        const data = [['Path', 'Delta', 'ETA', 'Length', 'Percent', 'Remaining', 'Speed', 'Transferred', 'Status']];
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
                obj[key].status ? chalk.greenBright('Complete') : chalk.magentaBright('In Progress')
            ]);
        });

        if (!uploadComplete) {
            stdout('\n' + table(data));
        }

        const flag = Object.keys(obj).every((key) => {
            return obj[key].status;
        });

        if (flag && !uploadComplete) {
            uploadComplete = true;
            console.log(chalk.greenBright('\n\nAll files were uploaded successfully! ✅ ✅\n\n'))

            const pro = exec('ts-node ./scripts/create-release-notes.ts');
            pro.stdout.pipe(process.stdout);
            pro.stderr.pipe(process.stderr);

            pro.addListener('exit', (code) => {
                process.exit(code);
            });
        }
    }, 500);
}