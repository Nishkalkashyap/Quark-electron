import * as fs from 'fs-extra';
import * as path from 'path';

const packageJSON = JSON.parse(fs.readFileSync('./package.json').toString());
const version = packageJSON.version;

const paths = [
    `./build/Quark-win-${version}.exe`,
    `./build/Quark-win-${version}.exe.blockmap`,
    './build/latest.yml',

    `./../Quark-electron-linux/build/Quark-linux-amd64-${version}.deb`,
    `./../Quark-electron-linux/build/Quark-linux-x64-${version}.tar.gz`,
    `./../Quark-electron-linux/build/Quark-linux-x86_64-${version}.AppImage`,
    `./../Quark-electron-linux/build/latest-linux.yml`,
]

paths.map((_path) => {
    console.log(_path);
    if (fs.existsSync(_path)) {
        fs.copySync(_path, `./release/${path.basename(_path)}`);
    }
});