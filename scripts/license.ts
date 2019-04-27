
import * as fs from 'fs-extra';
import * as lic from 'license-checker';
import * as Path from 'path';
import * as recc from 'recursive-readdir';

export function createLicenseFile() {
    const includedKeys: { [name: string]: string } = {};
    lic.init({
        start: './',
        production: true
    }, async (err, lic) => {
        if (err) {
            console.log(err, 'Errored');
        } else {
            let mainLicenseFile = '\r\nThis application bundles the following third-party packages in accordance with the following licenses:\r\n';
            mainLicenseFile = mainLicenseFile.concat('\r\n----------------------------------------------------------------------------', '\r\n');

            let subLicenseFile = '\r\nThis application bundles the following third-party packages in accordance with the following licenses:\r\n';
            subLicenseFile = subLicenseFile.concat('\r\n----------------------------------------------------------------------------', '\r\n');


            const keys = Object.keys(lic);

            // generate license file to be bundled
            keys.map((key) => {
                const pack = lic[key];
                const packageNameWithoutVersion = key.replace(getVersionFromName(key), '');

                if (includedKeys[packageNameWithoutVersion]) {
                    return;
                }

                if (pack['path'].includes('squirtle')) {
                    return;
                }

                if (pack.licenseFile) {
                    includedKeys[packageNameWithoutVersion] = pack.repository;

                    subLicenseFile = subLicenseFile.concat(`\r\nPackage: ${packageNameWithoutVersion};`);

                    mainLicenseFile = mainLicenseFile.concat(`\r\n\r\nPackage: ${key}`, '\r\n', `License: ${pack.licenses}`, '\r\n', `License Source: ${Path.basename(pack.licenseFile || '')}`, '\r\n');
                    mainLicenseFile = mainLicenseFile.concat(`Source Text: \r\n\r\n${(fs.readFileSync(pack.licenseFile)).toString()}\r\n`);
                    mainLicenseFile = mainLicenseFile.concat('\r\n----------------------------------------------------------------------------', '\r\n');
                }
            });
            fs.writeFileSync('./ThirdPartyNotices.txt', mainLicenseFile);
            // fs.writeFileSync('./SubLicenses.txt', subLicenseFile);
        }
    });

    function getVersionFromName(name: string) {
        return name.match(/@[0-9\.]+/)[0];
    }
}

export function createLicenseFileeee() {
    let files: string[] = [];
    recc('./node_modules', [(file, stat) => {
        return !(file.endsWith('package.json') || stat.isDirectory())
    }], (err, _files) => {
        files = _files.map((val, index, arr) => {
            return Path.basename(Path.dirname(val));
        });
        console.log(files);
    });
}

createLicenseFile();