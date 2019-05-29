import * as ncp from 'ncp';
import * as fs from 'fs-extra';
import * as recc from 'recursive-readdir';
import * as sharp from 'sharp';
import { printConsoleStatus } from './util';
import * as unzipper from 'unzipper';

copyDefinitions();
makeIcons();
unzipWWW().catch(console.error);

function copyDefinitions() {

    const Package = fs.readJsonSync('./package.json');
    const deps = Package.dependencies;
    const dev = Package.devDependencies;
    const all = Object.keys(Object.assign({ '@quarkjs/api': '' }, deps, dev));

    const includeFiles = [
        // '@squirtle/api',
        '@quarkjs/api',
        '@types/firmata',
        '@types/fs-extra',
        '@types/johnny-five',
        '@types/node',
        '@types/serialport',
        '@types/react',
        '@types/prop-types',
        '@types/react-dom',
        '@types/chart.js',
        '@types/styled-components',
        'electron',
        'vue',
        'tslib',
        'typescript'
    ]

    all.map((val) => {

        if (!includeFiles.includes(val))
            return;

        // recc(`./node_modules/` + val, [
        //     (file, stat) => {
        //         if (file.includes('quark')) {
        //             console.log(file);
        //         }
        //         return !stat.isDirectory() && !file.endsWith('.d.ts');
        //     }
        // ], (e, _files) => {
        //     if (e) {
        //         printConsoleStatus(e.name, 'danger');
        //         printConsoleStatus(e.message, 'danger');
        //         return;
        //     }
        //     if (_files.length == 0)
        //         return;
        //     printConsoleStatus(`Copied ${_files.length} definitions from ${val}`, 'success');
        // });
        copyFiles();

        function copyFiles() {
            const mkdirp = require('mkdirp');
            mkdirp('./definitions/' + val, (e) => {
                if (e) {
                    printConsoleStatus(`Error: ${e}`, 'danger');
                }
            });

            ncp.ncp(`./node_modules/` + val, './definitions/' + val, {
                filter: (file) => {
                    let bool = (
                        ((fs.statSync(file).isDirectory() || file.includes('.d.ts') || file.endsWith('package.json'))
                            && (!file.replace('node_modules', '').includes('node_modules')))
                        && (file.search(/api[\\/]umd/) == -1)
                        && (file.search('.git') == -1)
                    );
                    return bool;
                },
                dereference: true
            }, (e) => {
                if (e) {
                    printConsoleStatus(`Error: ${e.name}`, 'danger');
                    printConsoleStatus(`Error: ${e.message}`, 'danger');
                    return;
                }
                printConsoleStatus(`Copied definitions from ${val}`, 'success');
            });
        }
    });
}

function unzipWWW() {
    return new Promise(async (resolve) => {
        const squirtleOutPath = './buildResources/squirtle.zip';
        const wwwOutPath = './buildResources/www.zip';

        await Promise.all([
            unzip(squirtleOutPath, './.quark/quarkjs'),
            unzip(wwwOutPath, './www')
        ]);
        console.log('here');
        resolve();
    });

    function unzip(infile: string, outdir: string) {
        fs.ensureDirSync(outdir);
        fs.emptyDirSync(outdir);
        return new Promise((resolve) => {
            const wwwStream = fs.createReadStream(infile)
                .pipe(unzipper.Extract({ path: outdir }));
            wwwStream.on('end', () => {
                resolve();
            });
        });
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
                fs.ensureFileSync(`./buildResources/icons/${size}x${size}.png`);
                fs.writeFileSync(`./buildResources/icons/${size}x${size}.png`, buffer);
            }).catch((err) => {
                console.log(err);
            });
    }
}


