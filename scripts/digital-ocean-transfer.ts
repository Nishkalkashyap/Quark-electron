import * as AWS from 'aws-sdk';
import * as dotenv from 'dotenv';
import * as fs from 'fs-extra';
dotenv.config({ path: './dev-assets/prod.env' });

const s3 = new AWS.S3({
    endpoint: `https://sfo2.digitaloceanspaces.com`,
    accessKeyId: process.env.DIGITAL_OCEAN_ACCESS_KEY,
    secretAccessKey: process.env.DIGITAL_OCEAN_SECRET_KEY
});

// uploadFileToSpace('./package.json', 'Quark/package.json');
export function uploadFileToSpace(path: string, Key: string) {
    var params = {
        Body: fs.readFileSync(path),
        Bucket: 'quark-release',
        Key,
    };
    s3.putObject(params, function (err, data) {
        if (err) console.error(err, err.stack);
        else console.log(data);
    });
}
