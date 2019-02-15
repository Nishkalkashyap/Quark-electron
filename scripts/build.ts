import * as builder from 'electron-builder';
import { PlatformSpecificBuildOptions } from 'electron-builder';

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
    "!definitions"
]


builder.build({
    config: {
        appId: 'in.nishkal',
        copyright: 'Copyright © 2019 Nishkal Kashyap',
        productName: 'Quark',
        artifactName: '${productName}-${os}-${arch}-${version}.${ext}',
        asar: true,

        // asar: false,
        asarUnpack: [
            "definitions-unpacked"
        ],
        files: defaultFiles,
        directories: {
            output: 'build',
            buildResources: 'buildResources'
        },
        win: {
            target: 'nsis'
        },
        nsis: {
            oneClick: false,
            perMachine: true,
            allowToChangeInstallationDirectory: true,
            license: 'LICENSE',
            runAfterFinish: true,
            createDesktopShortcut: true,
            createStartMenuShortcut: true,
        },
        linux: {
            target: 'AppImage'
        },
        appImage: {
            systemIntegration: 'ask',
            license: 'LICENSE'
        },
        mac: {
            target: 'default',
            category: 'public.app-category.utilities'
        },
        publish: {
            provider: 'github',
            owner: "Nishkalkashyap",
            repo: 'https://github.com/Nishkalkashyap/quark-release'
        },
        compression: 'store',
        extraResources: [
            {
                from: 'definitions',
                to: 'definitions'
            }
        ]
    }
});