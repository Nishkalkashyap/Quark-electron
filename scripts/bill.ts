import { Storage } from '@google-cloud/storage';
import * as fs from 'fs-extra';
import * as path from 'path';
import { printConsoleStatus } from './util';
import chalk from 'chalk';
import { table } from 'table';
import { findExecutables } from '@ionic/utils-subprocess';

process.env.GOOGLE_APPLICATION_CREDENTIALS = './dev-assets/cloud-storage-key.json';
const bucketName = 'quarkjs-billing';
const billsFolder = './dev-assets/bills';
const lastChecked = './dev-assets/bills/last-checked.json';

const storage = new Storage({
    projectId: 'diy-mechatronics'
});

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

downloadBills().catch(console.error).then(async () => {
    await printBills();
});

async function downloadBills() {

    if (!fs.existsSync(lastChecked)) {
        fs.writeJsonSync(lastChecked, { time: 0 });
    }

    if ((Date.now() - await fs.readJson(lastChecked)['time']) < 3600000) {
        return;
    }


    const folders = await storage.bucket(bucketName).getFiles();
    folders.map((files) => {
        files.map(async (file) => {
            const destFile = path.join(billsFolder, file.name);
            const exists = fs.existsSync(destFile);
            await fs.ensureDir(path.dirname(destFile));
            if (exists) {
                printConsoleStatus(`File already exists: ${file.name}`, 'success');
                return;
            }

            await file.download({ destination: destFile });
            printConsoleStatus(`File downloaded: ${file.name}`, 'success');
            fs.writeJsonSync(lastChecked, { time: Date.now() });
        });
    });
}

async function printBills() {
    const fileNames = await fs.readdir(billsFolder);
    const jsonPromises = fileNames.filter((name) => { return name.includes('Bill') }).map((file) => {
        return fs.readJson(path.join(billsFolder, file));
    });

    const files: DataPoint[][] = await Promise.all(jsonPromises);
    // const data: (number | string)[][] = [['Description', 'Start Time', 'End Time', 'Cost (INR)']];
    let data: (number | string)[][] = [];

    files.map((file) => {
        file.map(({ description, startTime, endTime, cost }) => {
            if (!(cost && cost.amount > 1)) {
                return;
            }
            const startDate = (new Date(startTime));
            const endDate = (new Date(endTime));
            data.push([
                description,
                `${monthNames[startDate.getMonth()]} ${startDate.getDate()}`,
                `${monthNames[endDate.getMonth()]} ${endDate.getDate()}`,
                (cost || {} as any).amount
            ]);
        });
    });

    data = data.sort((a, b) => {
        return Number(b[3]) > Number(a[3]) ? -1 : 1;
    });

    data.push(['Description', 'Start Time', 'End Time', 'Cost (INR)']);
    data = data.reverse();

    console.log(table(data));
}

interface DataPoint {
    accountId: string;
    lineItemId: string;
    description: string;
    startTime: "2019-04-19T00:00:00-07:00",
    endTime: "2019-04-20T00:00:00-07:00",
    projectNumber: string;
    projectId: string;
    projectName: string;
    measurements: [
        {
            "measurementId": string;
            "sum": number;
            "unit": string;
        }
    ],
    cost: {
        amount: number,
        currency: "INR"
    }
}