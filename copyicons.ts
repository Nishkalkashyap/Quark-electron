import * as ncp from 'ncp';

ncp.ncp('./../QuarkUMD/src/assets/', './www/assets/', (e) => {
    console.log(e);
});

ncp.ncp('./../QuarkUMD/www/assets/', './www/assets/', (e) => {
    console.log(e);
});