import { execFile } from "child_process";
import * as fs from 'fs-extra';

runTest().catch(console.error);
async function runTest() {

    let filePath = process.platform == 'win32' ? 'win-unpacked/Quark.exe' : process.platform == 'linux' ? 'linux-unpacked/quark' : null;

    const cp = execFile(`./build/${filePath}`, ['./test/__testing__fjdsbfkbsdibsdi__testing__testing.qrk']);

    cp.on('message', (m) => { console.log(`message: ${m}`) });
    cp.on('close', (m) => { console.log(`close: ${m}`) });
    cp.on('error', (m) => { console.log(`error: ${m}`) });
    cp.on('exit', (m) => {
        console.log(`exit: ${m}`);
        const filePath = './test/__testResults/result.json';
        if (fs.existsSync(filePath)) {
            const result = fs.readJsonSync(filePath);
            if (result.value == true) {
                process.exit(0);
                return;
            }
        }
        process.exit(1);
    });
}