
import { Storage, File } from '@google-cloud/storage';
import request = require('request');
import { bucketName } from './util';
import * as path from 'path';
process.env.GOOGLE_APPLICATION_CREDENTIALS = './dev-assets/cloud-storage-key.json';

const storage = new Storage({
    projectId: 'diy-mechatronics'
});


export async function uploadFileToBucket(bucketName: string, filePath: string, fileName: string) {
    const file = await storage.bucket(bucketName).upload(filePath, {
        destination: fileName
    });
    await file[0].makePublic();
}

export async function cleanCloudStorageDirectory(bucketName: string, dirName: string, ignores: RegExp) {
    const folders = await storage.bucket(bucketName).getFiles();
    const filesToDelete: Promise<[request.Response]>[] = [];
    folders.filter((folder) => {
        folder.map((file) => {
            if (file.name.startsWith(dirName)) {
                const canDeleteFile = !file.name.match(ignores);
                if (canDeleteFile) {
                    filesToDelete.push(file.delete());
                }
            }
        });
    });
    await Promise.all(filesToDelete);
}

export async function doCloudStorageBucketTransfer(copyFromBucket: bucketName, copyToBucket: bucketName, folderFrom: string, folderTo: string, makePublic: boolean) {
    const folders = await storage.bucket(copyFromBucket).getFiles();
    const destBucket = storage.bucket(copyToBucket);
    const filesToCopy: Promise<[File, request.Response]>[] = [];
    folders.filter((folder) => {
        folder.map((file) => {
            if (file.name.startsWith(folderFrom)) {
                const destFileName = path.posix.join(folderTo, path.basename(file.name));
                filesToCopy.push(file.copy(destBucket.file(destFileName)));
            }
        });
    });
    const copiedFiles = await Promise.all(filesToCopy);

    if (makePublic) {
        const publicPromiseAll = copiedFiles.map(async (file) => {
            await file[0].makePublic();
            if (file[0].name.match(/\.(yml|json|txt|md)$/)) {
                console.log(`File name: ${file[0].name} matched for no cache control.`);
                const meta = {
                    cacheControl: 'no-store',//this is the main one
                    'Cache-Control': 'no-store',
                    // metadata: {}
                }
                await file[0].setMetadata(meta);
            }
        });
        await Promise.all(publicPromiseAll);
    }
}