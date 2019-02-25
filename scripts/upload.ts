import { Storage } from '@google-cloud/storage';

const projectId = 'diy-mechatronics';

const storage = new Storage({
    projectId: projectId,
});

const bucketName = 'quark-auto-update';

storage.getBuckets().then((buckets) => {
    console.log(buckets);
}).catch((err) => {
    console.log(err);
})

// storage.bucket(bucketName).getFiles().then((files) => {
//     files[0]
// }).catch((err) => {
//     console.log(err);
// });