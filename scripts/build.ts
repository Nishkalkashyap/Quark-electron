import * as builder from 'electron-builder';
import { PlatformSpecificBuildOptions } from 'electron-builder';
import * as dotenv from 'dotenv';
import { printConsoleStatus, isProductionBranch } from './util';
import { execSync } from 'child_process';
import console = require('console');

if ((isProductionBranch && process.env.CI)) {
    dotenv.config({ path: './dev-assets/prod.env' });
}

if (process.platform == 'darwin') {

    console.log('Deleting definitions');
    console.log(execSync(`rm -rf assets-definitions/electron/dist`).toString());

    if (!isProductionBranch) {
        process.env.CSC_IDENTITY_AUTO_DISCOVERY = 'false';
    }
    // dont do this. not in mac due to security reasons.
    // process.env.DEBUG = 'electron-builder';
}

const defaultFiles: PlatformSpecificBuildOptions['files'] = [
    "**/*",
    // "!**/node_modules/*/{CHANGELOG.md,README.md,README,readme.md,readme}",
    "!**/node_modules/*/{test,__tests__,tests,powered-test,example,examples}",
    // "!**/node_modules/*.d.ts",
    "!**/node_modules/.bin",
    "!**/*.{iml,o,hprof,orig,pyc,pyo,rbc,swp,csproj,sln,xproj}",
    "!.editorconfig",
    "!**/._*",
    "!**/{.DS_Store,.git,.hg,.svn,CVS,RCS,SCCS,.gitignore,.gitattributes}",
    "!**/{__pycache__,thumbs.db,.flowconfig,.idea,.vs,.nyc_output}",
    "!**/{appveyor.yml,.travis.yml,circle.yml}",
    "!**/{npm-debug.log,yarn.lock,.yarn-integrity,.yarn-metadata.json}",


    "!dist",
    "!build",
    "!.vscode",
    "!assets-definitions",
    "!release",
    "!dev-assets",
    "!scripts",
    "!splash_assets",
    "!.quark",
    "!test",
    "!appveyor-tools",
    "!readme",
    "!src",
    "!buildAssets",
]

printConsoleStatus(`Starting Build`, 'success');

builder.build({
    config: {
        // generateUpdatesFilesForAllChannels: true,
        appId: 'in.nishkal',
        copyright: 'Copyright © 2019 Nishkal Kashyap',
        productName: 'Quark',
        artifactName: '${productName}-${os}-${arch}-${version}.${ext}',
        asar: true,
        asarUnpack: [
            "definitions-unpacked"
        ],
        fileAssociations: [
            { ext: 'qrk' },
            { ext: 'qrk.asar' }
        ],
        files: defaultFiles,
        directories: {
            output: 'build',
            buildResources: 'buildResources'
        },
        win: {
            target: filterCI([
                {
                    target: 'nsis',
                    arch: ['x64']
                },
                {
                    target: 'zip',
                    arch: ['x64']
                },
                {
                    target: 'msi',
                    arch: ['x64']
                },
            ]),
            forceCodeSigning: isProductionBranch,
            publisherName: 'Nishkal'
        },
        nsis: {
            oneClick: false,
            perMachine: true,
            allowToChangeInstallationDirectory: true,
            license: 'LICENSE',
            runAfterFinish: true,
            createDesktopShortcut: true,
            createStartMenuShortcut: true
        },
        appx: {
            identityName: '12724Nishkal.Quarkjs',
            displayName: 'Quarkjs',
            "applicationId": "Quarkjs",
            "publisher": "CN=88BEC0DF-9467-4B64-BE19-2F563CC75E57",
            "publisherDisplayName": "Nishkal"
        },



        linux: {
            "category": "IDE",
            "target": filterCI([
                {
                    "target": "deb",
                    arch: ['x64']
                },
                {
                    "target": "AppImage",
                    arch: ['x64']
                },
                {
                    "target": "tar.gz",
                    arch: ['x64']
                }
            ])
        },
        appImage: {
            systemIntegration: 'ask',
            license: 'LICENSE'
        },



        mac: {
            category: 'public.app-category.developer-tools',
            target: 'default',//no need of other
            forceCodeSigning: isProductionBranch,//has to be true for prod
            "darkModeSupport": true,

            hardenedRuntime: isProductionBranch,//has to be true for prod
            "gatekeeperAssess": false,
            "entitlements": "dev-assets/entitlements.mac.plist",
            "entitlementsInherit": "dev-assets/entitlements.mac.plist"
        },
        dmg: {
            sign: false
        },




        publish: {
            provider: 'generic',
            url: 'https://quark-release.quarkjs.io/stable'
        },
        extraResources: [
            {
                from: 'assets-definitions',
                to: 'definitions'
            }
        ],
        afterSign: isProductionBranch ? "dev-assets/notarize.js" : undefined
    }
}).then((val) => {
    console.log(val);
}).catch((err) => {
    process.exit(1);
});

function filterCI<T>(arr: builder.TargetConfiguration[]): builder.TargetConfigType {
    const isMaster = !isProductionBranch;
    return arr.filter((val) => {
        if (process.env.CI && isMaster) {
            return val.target.match(/(nsis|AppImage|yml|dmg)$/);
        }

        if (!process.env.CI) {
            return val.target.match(/(nsis|AppImage|yml)$/);
        }

        return true;
    });
}

function filterCIMacOS(arr: builder.TargetConfiguration[]): builder.TargetConfiguration[] {
    const isMaster = !isProductionBranch;
    return arr.filter((val) => {
        if (process.env.CI && isMaster) {
            return val.target.match(/(nsis|AppImage|yml|dmg)$/);
        }

        if (!process.env.CI) {
            return val.target.match(/(nsis|AppImage|yml)$/);
        }

        return true;
    });
}


// http://sha256timestamp.ws.symantec.com/sha256/timestamp
// http://timestamp.globalsign.com/scripts/timstamp.dll
// https://timestamp.geotrust.com/tsa
// http://timestamp.verisign.com/scripts/timstamp.dll 
// http://timestamp.comodoca.com/rfc3161
// http://timestamp.wosign.com
// http://tsa.startssl.com/rfc3161
// http://time.certum.pl
// http://timestamp.digicert.com
// https://freetsa.org
// http://dse200.ncipher.com/TSS/HttpTspServer
// http://tsa.safecreative.org
// http://zeitstempel.dfn.de
// https://ca.signfiles.com/tsa/get.aspx
// http://services.globaltrustfinder.com/adss/tsa
// https://tsp.iaik.tugraz.at/tsp/TspRequest
// http://timestamp.apple.com/ts01