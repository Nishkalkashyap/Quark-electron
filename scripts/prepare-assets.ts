import * as ncp from 'ncp';
import * as fs from 'fs-extra';
import * as recc from 'recursive-readdir';
import * as sharp from 'sharp';
import * as path from 'path';

copyDefinitions();
makeIcons();
copyAssets();

// fs.emptyDirSync('./build');

function copyDefinitions() {

    const Package = fs.readJsonSync('./package.json');
    const deps = Package.dependencies;
    const dev = Package.devDependencies;
    const all = Object.keys(Object.assign({}, deps, dev));

    const includeFiles = ['@squirtle/api', '@types/firmata', '@types/fs-extra', '@types/johnny-five', '@types/node', '@types/serialport', '@types/p5', 'electron', '@types/chart.js', 'vue']

    all.map((val) => {

        if (!includeFiles.includes(val))
            return;

        recc(`./node_modules/` + val, [
            (file, stat) => {
                return !stat.isDirectory() && !file.endsWith('.d.ts');
            }
        ], (e, _files) => {
            if (e) {
                console.log(e);
                return;
            }
            if (_files.length == 0)
                return;
            console.log(_files.length, val);
            copyFiles();
        });

        function copyFiles() {
            const mkdirp = require('mkdirp');
            mkdirp('./definitions/' + val, (e) => {
                if (e) {
                    console.log(e);
                }
            });

            ncp.ncp(`./node_modules/` + val, './definitions/' + val, {
                filter: (file) => {
                    return (
                        ((fs.statSync(file).isDirectory() || file.includes('.d.ts') || file.endsWith('package.json'))
                            && (!file.replace('node_modules', '').includes('node_modules')))
                        && (file.search(/api[\\/]umd/) == -1)
                        && (file.search('.git') == -1)
                    );
                },
                dereference: true
            }, (e) => {
                if (e) {
                    console.log(e, 'failed');
                }
            });
        }
    });
}

function copyAssets() {
    try {
        ncp.ncp('./../QuarkUMD/dist/', './www/', {
            filter: (file) => {
                return file.search('js.map') == -1
            }
        }, (e) => {
            console.log(e);
        });
    } catch (err) {
        console.log(err);
    }
}

function makeIcons() {

    const sizes = [16, 24, 32, 48, 64, 96, 128, 256];

    sizes.map((size) => {
        writeIcons(size);
    });

    function writeIcons(size: number) {
        sharp('buildAssets/icon.png')
            // const buffer = fs.readFileSync(path.join('./', 'buildAssets/icon.png'));
            // sharp(Buffer.from(buffer.toString(), 'base64'))
            .resize(size, size)
            .toBuffer()
            .then((buffer) => {
                fs.writeFileSync(`./buildResources/icons/${size}x${size}.png`, buffer);
            }).catch((err) => {
                console.log(err);
            });
    }
}


