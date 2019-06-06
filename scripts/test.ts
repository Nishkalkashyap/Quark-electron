import { execFile, execSync } from "child_process";
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

    let command = process.platform == 'win32' ?
        `./build/win-unpacked/Quark.exe` : process.platform == 'linux' ?
            // './build/linux-unpacked/quark' : process.platform == 'darwin' ?
            `./build/Quark-linux-x86_64-${version}.AppImage` : process.platform == 'darwin' ?
                // './build/mac/Quark.app' : null;
    // `./build/Quark-mac-${version}.dmg` : null;
    `./build/Quark-mac-${version}.pkg` : null;

    command.match(/(mac|dmg)/) ? macOSHandle() : null;
    if (!command) {
        process.exit(0);
    }

    execFile(command, ['./test/__testing__fjdsbfkbsdibsdi__testing__testing.qrk'], {
        env: process.env,
    }, (error, stdout, stderr) => {
        console.timeEnd('test');
        postBuild();
        console.log(stdout);
        console.log(stderr);
        console.log(error);
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

function postBuild() {
    const dir = fs.readdirSync('./build').map((val) => {
        return {
            val,
            isDir: fs.statSync(path.join('./build', val)).isDirectory()
        }
    })
    dir.map((val) => {
        if (!!val.val.match(/(mac|unpacked)/) && val.isDir) {
            console.log('build-dir = ', fs.readdirSync(path.join('./build', val.val)));
        }
    });
    console.log('dir = \n\n', JSON.stringify(dir, undefined, 4));

    if (process.platform == 'win32') {
        // const result = execSync(`ls`);
        // console.log(result.toString());
    } else {
        const result = execSync(`ls -la ./build`);
        console.log(result.toString());
    }
}

function macOSHandle() {
    const result = execSync(`chmod -R 777 ./build`);
    console.log(result.toString());
    execSync(`ls -la`);
}

// val =  [ 'Quark.app' ]
// dir =  [ 'Quark-mac-0.2.17.dmg',
//   'Quark-mac-0.2.17.dmg.blockmap',
//   'Quark-mac-0.2.17.zip',
//   'latest-mac.yml',
//   'mac' ]