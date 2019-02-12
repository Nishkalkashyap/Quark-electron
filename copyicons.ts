import * as ncp from 'ncp';
import * as fs from 'fs-extra';
import * as recc from 'recursive-readdir';

copyDefinitions();
copyAssets();

function copyDefinitions() {

    const Package = fs.readJsonSync('./package.json');
    const deps = Package.dependencies;
    const dev = Package.devDependencies;
    const all = Object.keys(Object.assign({}, deps, dev));

    const includeFiles = ['@squirtle/api', '@types/firmata', '@types/fs-extra', '@types/johnny-five', '@types/node', '@types/serialport', 'electron']

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
                        // && (file.search(/api[\\/]umd/) == -1)
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
    ncp.ncp('./../QuarkUMD/src/assets/', './www/assets/', (e) => {
        console.log(e);
    });
}


