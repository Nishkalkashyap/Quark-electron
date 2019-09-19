import * as ncp from 'ncp';
import * as fs from 'fs-extra';
import * as sharp from 'sharp';
import { printConsoleStatus, storage, bucketName } from './util';
import * as tar from 'tar';
import { makeTar } from './prepare-tar';
import { execSync } from 'child_process';

root().catch((err) => {
    console.error(err);
    throw Error('Failed to prepare assets');
});
async function root() {
    if (process.env.CI) {
        await downloadTarArchive();
    } else {
        const wwwOutPath = './buildResources/www.tar.gz';
        await makeTar('./../QuarkUMD/dist', wwwOutPath, '');
    }
    await extractTarArchives();
    await copyDefinitions();
    makeIcons();
}

async function copyDefinitions() {
    const Package = fs.readJsonSync('./package.json');
    const deps = Package.dependencies;
    const dev = Package.devDependencies;
    const all = Object.keys(Object.assign({ '@quarkjs/api': '' }, deps, dev));

    const includeFiles = [
        '@quarkjs/api',
        '@types/firmata',
        '@types/fs-extra',
        // '@types/johnny-five',
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
    ];

    return new Promise((resolve) => {


        all.map((val) => {

            if (!includeFiles.includes(val)) {
                return;
            }

            copyFiles();

            function copyFiles() {

                fs.ensureDirSync('./assets-definitions/' + val);
                ncp.ncp(`./node_modules/` + val, './assets-definitions/' + val, {
                    filter: (file) => {
                        let bool = (
                            ((fs.statSync(file).isDirectory() || file.includes('.d.ts') || file.endsWith('package.json'))
                                && (!file.replace('node_modules', '').includes('node_modules')))
                            && (file.search(/api[\\/]umd/) == -1)
                            && (file.search('.git') == -1)
                        );
                        return bool;
                    },
                    // dereference: true
                }, (e) => {
                    if (e) {
                        console.error(e);
                        printConsoleStatus(`Error: ${e.name}`, 'danger');
                        printConsoleStatus(`Error: ${e.message}`, 'danger');
                        throw Error(`Error: ${e.message}`);
                    } else {
                        printConsoleStatus(`Copied definitions from ${val}`, 'success');
                    }
                    resolve();
                });
            }
        });
    });
}


async function downloadTarArchive() {
    const wwwOutPath = './buildResources/www.tar.gz';
    fs.ensureFileSync(wwwOutPath);
    printConsoleStatus(`Downloading archive: ${wwwOutPath}`, 'info');
    const bucketName: bucketName = 'quark-build-assets';
    await storage.bucket(bucketName).file('www.tar.gz').download({
        destination: wwwOutPath
    });
    printConsoleStatus(`Downloaded archive: ${wwwOutPath}`, 'success');
}

async function extractTarArchives() {
    const squirtleOutPath = './buildResources/squirtle.tar.gz';
    const wwwOutPath = './buildResources/www.tar.gz';

    await Promise.all([
        // extractArchive(squirtleOutPath, './.quark/quarkjs'),
        extractArchive(wwwOutPath, './www')
    ]);

    async function extractArchive(infile: string, outdir: string) {
        fs.ensureDirSync(outdir);
        fs.emptyDirSync(outdir);
        await tar.x({ C: outdir, file: infile });
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
                throw Error(`Error: ${err}`);
            });
    }
}


