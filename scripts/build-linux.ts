import * as git from 'simple-git';
import * as fs from 'fs-extra';
import * as path from 'path';

fs.copy('./buildResources', './../Quark-electron-linux/buildResources');

git('./').raw(
    [
        'ls-tree',
        '-r',
        'master',
        '--name-only'
    ], (err, result: string) => {
        if (result) {
            const arr = result.split('\n').filter((val) => {
                return val.length > 0;
            });
            arr.map((val) => {
                const srcPath = path.join('./', val);
                const destPath = path.join('./../Quark-electron-linux', val);
                fs.ensureFileSync(destPath);
                if (fs.existsSync(srcPath)) {
                    fs.writeFileSync(destPath, fs.readFileSync(srcPath).toString());
                }
            });
        }
    });

