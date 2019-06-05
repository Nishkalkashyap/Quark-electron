import { execFile } from "child_process";
import * as fs from 'fs-extra';
import * as path from 'path';
import { printConsoleStatus } from './util';

let hasEnded: boolean = false;
const packageJSON = JSON.parse(fs.readFileSync('./package.json').toString());
const version = packageJSON.version;

runTest().catch(console.error);
async function runTest() {
    console.time('test');

    setTimeout(() => {
        if (!hasEnded) {
            exitTest();
        }
    }, 1000 * 60 * 2);

    let filePath = process.platform == 'win32' ?
        'win-unpacked/Quark.exe' : process.platform == 'linux' ?
            // 'linux-unpacked/quark' : process.platform == 'darwin' ?
            `Quark-linux-x86_64-${version}.AppImage` : process.platform == 'darwin' ?
                'mac/Quark.app' : null;

    filePath.includes('mac') ? getMacosFolder() : null;
    if (!filePath) {
        process.exit(0);
    }

    const cp = execFile(`./build/${filePath}`, ['./test/__testing__fjdsbfkbsdibsdi__testing__testing.qrk']);

    if (cp.stderr && cp.stdout) {
        cp.stdout.on('data', (data) => { console.log(data); });
        cp.stderr.on('data', (data) => { console.log(data); });
    }


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
    const filePath = './test/__testResults__/result.json';
    hasEnded = true;
    if (fs.existsSync(filePath)) {
        const result = fs.readJsonSync(filePath);
        // console.log(result, result.value, typeof result.value);
        if (result.value == true) {
            printConsoleStatus('Test successful', 'success');
            process.exit(0);
        }
    }
    printConsoleStatus('Test Failed', 'danger');
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

// val =  [ 'Quark.app' ]
// dir =  [ 'Quark-mac-0.2.17.dmg',
//   'Quark-mac-0.2.17.dmg.blockmap',
//   'Quark-mac-0.2.17.zip',
//   'latest-mac.yml',
//   'mac' ]