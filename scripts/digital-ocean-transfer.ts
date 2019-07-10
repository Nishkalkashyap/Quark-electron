import * as AWS from 'aws-sdk';
import * as dotenv from 'dotenv';
import * as fs from 'fs-extra';
import { currentBranch } from './util';
dotenv.config({ path: './dev-assets/prod.env' });

const s3 = new AWS.S3({
    endpoint: `https://sfo2.digitaloceanspaces.com`,
    accessKeyId: process.env.DIGITAL_OCEAN_ACCESS_KEY,
    secretAccessKey: process.env.DIGITAL_OCEAN_SECRET_KEY
});

const Bucket = `quark-release`;

// uploadFileToSpace('./package.json', 'Quark/package.json');
export function uploadFileToSpace(path: string, Key: string) {
    if (currentBranch == 'master') return;

    var params = {
        Body: fs.readFileSync(path),
        Bucket,
        Key,
    };
    s3.putObject(params, function (err, data) {
        if (err) console.error(err, err.stack);
        else console.log(data);
    });
}

// doSpaceTransfer('Quark-master-0.5.2', 'stable').then(console.log).catch(console.error)
export async function doSpaceTransfer(folderFrom: string, folderTo: string) {
    if (currentBranch == 'master') return;

    const objects = await s3.listObjectsV2({ Bucket }).promise();
    const promises = objects.Contents.map(async (file) => {
        if (!file.Key.includes(folderFrom)) {
            return;
        }

        return await s3.copyObject({
            Bucket,
            CopySource: `${Bucket}/${file.Key}`,
            Key: `${folderTo}${file.Key.replace(objects.Prefix, '').replace(folderFrom, '')}`,
        }).promise();
    });
    return await Promise.all(promises);
}
