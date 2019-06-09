import * as fs from 'fs-extra';
import * as path from 'path';
import * as archiver from 'archiver';
import { printConsoleStatus } from './util';
import console = require('console');
import * as tar from 'tar';

const wwwOutPath = './buildResources/www.tar.gz';
const squirtleOutPath = './buildResources/squirtle.tar.gz';
makeZip('./../QuarkUMD/dist', wwwOutPath, '');
makeZip('./../@squirtle/api', squirtleOutPath, 'package');

function makeZip(inDir: string, outFilePath: string, prefix: string) {
    console.log(path.join(process.cwd(), outFilePath), path.resolve(inDir));
    (<any>tar).c({
        // tar.c({
        gzip: true,
        file: path.join(process.cwd(), outFilePath),
        cwd: path.resolve(inDir),
        filter: (path) => {
            return !(path.includes('node_modules') || path.includes('.git'))
        },
        prefix
    }, ['']).then((val) => {
        printConsoleStatus(`Tarball has been created ${outFilePath}`, 'success');
    }).catch((err) => {
        printConsoleStatus(`Tarball Error ${outFilePath}`, 'danger');
        console.log(err);
    });
}

function makeeZip(inDir: string, outFilePath: string) {
    var output = fs.createWriteStream(outFilePath);
    const archive = archiver('zip', {
        zlib: { level: 9 }
    });

    output.on('close', async function () {
        printConsoleStatus(archive.pointer() + ' total bytes', 'info');
        printConsoleStatus('archiver has been finalized and the output file descriptor has closed.', 'info');
    });

    output.on('end', function () {
        printConsoleStatus('Data has been drained', 'info');
    });

    archive.on('warning', function (err) {
        if (err.code === 'ENOENT') {
            // log warning
        } else {
            // throw error
            throw err;
        }
    });

    // good practice to catch this error explicitly
    archive.on('error', function (err) {
        throw err;
    });

    archive.pipe(output);

    // archive.directory(inDir, false);
    archive.glob('**', {
        cwd: inDir,
        ignore: ['**/node_modules/**']
    })
    archive.finalize();
}