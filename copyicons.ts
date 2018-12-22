import * as ncp from 'ncp';

ncp.ncp('./../QuarkUMD/www/assets/', './www/assets/', (e) => {
    console.log(e);
});