import * as builder from 'electron-builder';
import { PlatformSpecificBuildOptions } from 'electron-builder';
import * as dotenv from 'dotenv';
import { printConsoleStatus, currentBranch } from './util';
if (currentBranch == 'master-all' && process.env.CI) {
    dotenv.config({ path: './scripts/prod.env' });
}

// if (os.platform() == 'linux') {
//     process.env.DEBUG = 'electron-builder';
// }

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
    "!definitions",
    "!release",
    "!dev-assets",
    "!scripts",
    "!splash_assets",
    "!.quark",
    "!test",
    "!appveyor-tools",
    "!readme",
]

printConsoleStatus(`Starting Build`, 'success');

builder.build({
    config: {
        generateUpdatesFilesForAllChannels: true,
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
                // {
                //     target: 'appx',
                //     arch: ['x64']
                // }
                {
                    target: 'msi',
                    arch: ['x64']
                },
                // {
                //     target: 'squirrel'
                // },
                // {
                //     target: 'nsis-web'
                // },
                // {fails
                //     target: 'portable',
                //     arch: ['x64']
                // }
            ]),
            forceCodeSigning: !!process.env.CSC_LINK,
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
                // {
                //     "target": "rpm",
                //     "arch": ["x64"]
                // },
                // {
                //     "target": "apk"
                // }
                // {
                //     "target": "snap",
                //     "arch": ["x64"]
                // }
            ])
        },
        appImage: {
            systemIntegration: 'ask',
            license: 'LICENSE'
        },


        mac: {
            // target: 'default',
            // category: 'public.app-category.utilities',
            category: 'public.app-category.developer-tools',
            target: [
                {
                    target: 'dmg',
                    arch: ['x64']
                },
                {
                    target: 'pkg',
                    arch: ['x64']
                },
                // {
                //     target: 'zip',
                //     arch: ['x64']
                // },
                {
                    target: 'dir',
                    arch: ['x64']
                },
            ]

        },




        publish: {
            provider: 'generic',
            url: 'https://quark-release.quarkjs.io/stable'
        },
        extraResources: [
            {
                from: 'definitions',
                to: 'definitions'
            }
        ],

        // artifactBuildStarted: (c) => {
        //     printConsoleStatus('\n\nBuild Started', 'success');
        //     printConsoleStatus(`Mets: ${c.targetPresentableName}; ${c.file}; ${c.arch}`, 'info');
        // },
        afterSign: (c) => {
            // printConsoleStatus('\n\nApplication Signed', 'success');
        },
        afterPack: (c) => {
            // printConsoleStatus('\n\nApplication packaged', 'success');
            // printConsoleStatus('MetaData:', 'success');
            // printConsoleStatus(`Platform Name: ${c.electronPlatformName}`, 'info');
            // printConsoleStatus(`Targets: ${c.targets.join(' ')}`, 'info');
            // printConsoleStatus(`Arch: ${c.arch}`, 'info');
        },
        afterAllArtifactBuild: async (c) => {
            // printConsoleStatus('\n\nAll artifacts built', 'success');
            // printConsoleStatus(`${c.artifactPaths.join(' ')}`, 'info');
            // printConsoleStatus(`Outdir: ${c.outDir}`, 'info');

            // printConsoleStatus('\n\nBuild Success', 'success');
            return []
        }
    }
});

function filterCI(arr: builder.TargetConfiguration[]) {
    const isMaster = currentBranch == 'master';
    return arr.filter((val) => {
        if (process.env.CI && isMaster) {
            return val.target.match(/(nsis|AppImage|yml)$/);
        }

        if (!process.env.CI) {
            return val.target.match(/(nsis|AppImage|yml)$/);
        }

        return true;
    }) as builder.TargetConfigType
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