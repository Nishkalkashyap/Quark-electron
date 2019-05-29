import * as fs from 'fs-extra';
import * as archiver from 'archiver';
import { printConsoleStatus } from './util';

const archiveOutPath = './buildResources/www.zip';
zipFolder();

function zipFolder() {
    var output = fs.createWriteStream(archiveOutPath);
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

    archive.directory('./www', false);
    archive.finalize();
}
