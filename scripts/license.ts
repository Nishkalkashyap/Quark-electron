
import * as recc from 'recursive-readdir';
import * as fs from 'fs-extra';
import * as lic from 'license-checker';
import * as Path from 'path';


export function createLicenseFile() {
    lic.init({
        start: './',
        production: true
    }, async (err, lic) => {
        if (err) {
            console.log(err, 'Errored');
        } else {
            let str = '\r\nThis application bundles the following third-party packages in accordance with the following licenses:\r\n';
            str = str.concat('\r\n----------------------------------------------------------------------------', '\r\n');
            const keys = Object.keys(lic);
            keys.map((key) => {
                const pack = lic[key];
                if (pack.licenseFile) {
                    str = str.concat(`\r\n\r\nPackage: ${key}`, '\r\n', `License: ${pack.licenses}`, '\r\n', `License Source: ${Path.basename(pack.licenseFile || '')}`, '\r\n');
                    str = str.concat(`Source Text: \r\n\r\n${(fs.readFileSync(pack.licenseFile)).toString()}\r\n`);
                    str = str.concat('\r\n----------------------------------------------------------------------------', '\r\n');
                }
            });
            fs.writeFileSync('./ThirdPartyNotices.txt', str);
        }
    });
}



export function _createLicenseFile() {

    const excludes = ['@squirtle']

    recc('./node_modules/', [
        (file, stat) => {
            return !(stat.isDirectory() || file.endsWith('package.json')) || file.search(/@squirtle/) !== -1
        }
    ]).then((val) => {
        console.log(`Found total : ${val.length} files`);
        const noLicenseFiles: string[] = [];
        val.map((path, index) => {
            fs.readJson(path).then((json) => {
                if (!json.license) {
                    noLicenseFiles.push(path);
                    console.log(path, 'no-license');
                }

                if (index == val.length - 1) {
                    console.log(`Found total : ${noLicenseFiles.length} files with no license`);
                }
            }).catch((err) => {
                console.log('Error');
            });
        });
    });
}

createLicenseFile();