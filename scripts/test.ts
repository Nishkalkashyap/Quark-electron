import { execFile } from "child_process";
import * as fs from 'fs-extra';
import * as path from 'path';
import { printConsoleStatus } from './util';

let hasEnded: boolean = false;

runTest().catch(console.error);
async function runTest() {
    console.time('test');

    setTimeout(() => {
        if (!hasEnded) {
            exitTest();
        }
    }, 1000 * 60 * 2);

    let filePath = process.platform == 'win32' ? 'win-unpacked/Quark.exe' : process.platform == 'linux' ? 'linux-unpacked/quark' : null;

    if (!filePath) {
        getMacosFolder();
        process.exit(0);
    }

    const cp = execFile(`./build/${filePath}`, ['./test/__testing__fjdsbfkbsdibsdi__testing__testing.qrk']);

    cp.on('message', (m) => { console.log(`message: ${m}`) });
    cp.on('close', (m) => { console.log(`close: ${m}`) });
    cp.on('error', (m) => { console.log(`error: ${m}`) });
    cp.on('exit', (m) => {
        console.timeEnd('test');
        console.log(`exit: ${m}`);
        exitTest();
    });
}

function exitTest() {
    const filePath = './test/__testResults/result.json';
    hasEnded = true;
    if (fs.existsSync(filePath)) {
        const result = fs.readJsonSync(filePath);
        if (result.value == true) {
            printConsoleStatus('Test successful', 'success');
            process.exit(0);
            return;
        }
    }
    printConsoleStatus('Test Failed', 'success');
    process.exit(1);
}

function getMacosFolder() {
    const dir = fs.readdirSync('./build');
    dir.map((val) => {
        if (val.endsWith('mac')) {
            console.log('val = ', fs.readdirSync(path.join('./build', val)));
        }
    });
    console.log('dir = ', dir);
}