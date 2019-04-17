import * as builder from 'electron-builder';
import { PlatformSpecificBuildOptions } from 'electron-builder';
import * as dotenv from 'dotenv';
import * as os from 'os';
dotenv.config({
    path: './scripts/prod.env'
});

if (os.platform() == 'linux') {
    process.env.DEBUG = 'electron-builder';
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
    "!definitions",
    "!release"
]

builder.build({
    config: {
        appId: 'in.nishkal',
        copyright: 'Copyright © 2019 Nishkal Kashyap',
        productName: 'Quark',
        artifactName: '${productName}-${os}-${arch}-${version}.${ext}',
        asar: true,
        asarUnpack: [
            "definitions-unpacked"
        ],
        fileAssociations: {
            ext: 'qrk',
            role: 'Editor'
        },
        files: defaultFiles,
        directories: {
            output: 'build',
            buildResources: 'buildResources'
        },
        win: {
            target: [
                {
                    target: 'nsis',
                    // arch: ['ia32', 'x64']
                },
                // {
                //     target: 'zip',
                //     // arch: ['x64', 'ia32']
                // },
                // {
                //     target: 'msi'
                // },
                // {
                //     target: 'squirrel'
                // },
                // {
                //     target: 'nsis-web'
                // },
                // {
                //     target: 'portable'
                // }
            ],
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
        linux: {
            "category": "IDE",
            "target": [
                // {
                //     "target": "deb"
                // },
                {
                    "target": "AppImage"
                },
                // {
                //     "target": "tar.gz"
                // }
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
            ]
        },
        appImage: {
            systemIntegration: 'ask',
            license: 'LICENSE'
        },
        mac: {
            target: 'default',
            category: 'public.app-category.utilities',
        },
        publish: {
            provider: 'generic',
            url: 'https://storage.googleapis.com/quarkjs-auto-update',
        },
        extraResources: [
            {
                from: 'definitions',
                to: 'definitions'
            }
        ]
    }
});


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