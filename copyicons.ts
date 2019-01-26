import * as ncp from 'ncp';
import * as fs from 'fs';
// import * as ncp from 'node_modules/@types/ncp';

ncp.ncp('./node_modules/', './definitions/', {
    filter: (file) => {
        return fs.statSync(file).isDirectory() || file.includes('.d.ts');
    }
}, (e) => {
    console.log(e, 'hehe');
});

ncp.ncp('./../QuarkUMD/src/assets/', './www/assets/', (e) => {
    // console.log(e);
});