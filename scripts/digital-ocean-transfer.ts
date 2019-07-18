import * as AWS from 'aws-sdk';
import * as dotenv from 'dotenv';
import * as fs from 'fs-extra';
import { currentBranch } from './util';
import { PromiseResult } from 'aws-sdk/lib/request';
dotenv.config({ path: './dev-assets/prod.env' });

const endpoint = `https://sfo2.digitaloceanspaces.com`;
const s3 = new AWS.S3({
    endpoint,
    accessKeyId: process.env.DIGITAL_OCEAN_ACCESS_KEY,
    secretAccessKey: process.env.DIGITAL_OCEAN_SECRET_KEY
});

const Bucket = `quark-release`;

// purgeCache();
// export async function purgeCache() {
//     const ep = `sfo2.digitaloceanspaces.com`;
//     const result = await fetch(`https://api.digitalocean.com/v2/cdn/endpoints/${ep}/cache`, {
//         method : 'deletejj',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${process.env.DIGITAL_OCEAN_API_TOKEN}`
//         },
//         body: JSON.stringify({
//             files: ['insiders/latest.yml']
//         })
//     });
//     console.log(result);
// }

// uploadFileToSpace('./package.json', 'Quark/package.json');
export function uploadFileToSpace(path: string, Key: string) {
    if (currentBranch == 'master') return;

    var params: AWS.S3.PutObjectRequest = {
        Body: fs.readFileSync(path),
        Bucket,
        Key,
        CacheControl: getCacheControlForFile(path)
    };
    s3.putObject(params, function (err, data) {
        if (err) console.error(err, err.stack);
        else console.log(data);
    });
}

// doSpaceTransfer('Quark-master-0.5.2', 'stable').then(console.log).catch(console.error)
export async function doSpaceTransfer(folderFrom: string, folderTo: string) {
    const objects = await s3.listObjectsV2({ Bucket }).promise();
    const promises = objects.Contents.map(async (file) => {
        if (!file.Key.includes(folderFrom)) {
            return;
        }

        const obj: AWS.S3.CopyObjectRequest = {
            Bucket,
            CopySource: `${Bucket}/${file.Key}`,
            ACL: 'public-read',
            Key: `${folderTo}${file.Key.replace(objects.Prefix, '').replace(folderFrom, '')}`,
            CacheControl: getCacheControlForFile(file.Key)
        }

        if (file.Key.match(/\.(yml)$/)) {
            obj.Metadata = {
                'max-age': '0'
            }
        }

        return await s3.copyObject(obj).promise();
    });
    return await Promise.all(promises);
}

// cleanSpace('stable', /(blockmap)/).then(console.log).catch(console.error);
export async function cleanSpace(dirName: string, ignores: RegExp) {
    const allFiles = await s3.listObjectsV2({ Bucket }).promise();
    const filesToDelete: PromiseResult<AWS.S3.DeleteObjectOutput, AWS.AWSError>[] = [];
    const promises = allFiles.Contents.map(async (file) => {
        if (file.Key.startsWith(dirName)) {
            const canDeleteFile = !file.Key.match(ignores);
            if (canDeleteFile) {
                filesToDelete.push(await s3.deleteObject({
                    Bucket,
                    Key: file.Key,
                }).promise());
            }
        }
    });
    return await Promise.all(promises);
}

function getCacheControlForFile(file: string): string | undefined {
    if (file.match(/\.(yml)$/)) {
        // return `public, max-age=${0}`
        return `max-age=${0}`
    }

    return undefined;
}