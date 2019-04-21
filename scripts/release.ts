import * as fs from 'fs-extra';
import * as path from 'path';
import chalk from 'chalk';

const packageJSON = JSON.parse(fs.readFileSync('./package.json').toString());
const version = packageJSON.version;

const writeFolder = `./release/${version}`;

fs.ensureDirSync(writeFolder);
fs.emptyDirSync(writeFolder);

const paths = [
    `./build/Quark-win-${version}.exe`,
    `./build/Quark-win-${version}.exe.blockmap`,
    `./build/Quark-win-x64-${version}.zip`,
    './build/latest.yml',

    `./../Quark-electron-linux/build/Quark-linux-amd64-${version}.deb`,
    `./../Quark-electron-linux/build/Quark-linux-x64-${version}.tar.gz`,
    `./../Quark-electron-linux/build/Quark-linux-x86_64-${version}.AppImage`,
    `./../Quark-electron-linux/build/latest-linux.yml`,
]

paths.map((_path) => {
    if (fs.existsSync(_path)) {
        console.log(chalk.greenBright(`️️️️️️|  ✔️  |  Found file: ${_path}`));
        // fs.copySync(_path, `./release/${path.basename(_path)}`);
        fs.copySync(_path, path.join(writeFolder, path.basename(_path)));
        return;
    }

    console.log(chalk.redBright(`️|  ❗️  |  File not found: ${_path}`));
});