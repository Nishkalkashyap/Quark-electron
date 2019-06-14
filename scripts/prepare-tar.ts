import * as path from 'path';
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