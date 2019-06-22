import { app, BrowserWindow, ipcMain, crashReporter, shell, dialog } from "electron";
import * as path from 'path';
import * as fs from 'fs-extra';
import { IpcEvents, autoUpdatesFilePath, AutoUpdateInterface } from '@quarkjs/api/umd/src/api/electron/electron.internal';
import { IBrowserWindow } from '@quarkjs/api/umd/src/api/electron/electron.internal';
import { autoUpdater } from 'electron-updater';

import log from 'electron-log';
import { setMainProcessData, devModeWindows, runModeWindows, LANDING_PAGE_APP_PATH, buildFileMatchPattern, LANDING_PAGE_WINDOW_TYPE } from './util';
import { createOrFocusWindow } from './window';

autoUpdater.logger = log;
autoUpdater.logger['transports'].file.level = 'info';
log.info('App starting...');

interface WindowMeta {
    type: ('landing' | 'designer');
    filepath: string;
    windowType: IBrowserWindow[];
}

crashReporter.start({
    productName: 'Quarkjs',
    companyName: 'Quark',
    submitURL: 'https://quarkjs.io/crash-reporter'
});


async function setAutoUpdaterOptions() {
    log.info(`Auto updates file path: ${autoUpdatesFilePath}`);

    const exists = await fs.pathExists(autoUpdatesFilePath);
    if (exists) {
        const fileData: AutoUpdateInterface = await fs.readJson(autoUpdatesFilePath);
        autoUpdater.setFeedURL({
            provider: 'generic',
            url: `https://quark-release.quarkjs.io/${fileData.releaseChannel || 'stable'}`
        });
        console.log(`Update url set to: https://quark-release.quarkjs.io/${fileData.releaseChannel || 'stable'}`);

        autoUpdater.allowDowngrade = fileData.releaseChannel == 'stable';
        console.log(`Allow downgrade: ${autoUpdater.allowDowngrade}`);

        if (fileData.disableAutoUpdates) {
            console.log(`Auto Updates status: ${fileData.disableAutoUpdates} (fileData.disableAutoUpdates)`);
            return;
        }
    }
    const result = autoUpdater.checkForUpdatesAndNotify();
}

function registerListeners() {
    ipcMain.on(IpcEvents.ADD_RUN_MODE_WINDOW, (e, absoluteFilePath: string) => {
        createOrFocusWindow(runModeWindows, absoluteFilePath);
    });

    ipcMain.on(IpcEvents.ADD_DEV_MODE_WINDOW, (e, absoluteFilePath: string) => {
        createOrFocusWindow(devModeWindows, absoluteFilePath);
    });
}


app.commandLine.appendSwitch('--enable-experimental-web-platform-features');
app.on('ready', () => {
    setMainProcessData();
    createNewInstanceWindow(process.argv).catch(console.error);
    registerListeners();
    setAutoUpdaterOptions().catch((err) => {
        console.error(err);
        log.error(`Auto updater failed to initialize`);
    });
});

const _isSecondInstance = app.requestSingleInstanceLock();
if (!_isSecondInstance) {
    app.quit();
} else {
    app.on('second-instance', (event, commandLine) => {
        console.log(commandLine, '\n\n\n');
        createNewInstanceWindow(commandLine).catch(console.error);
    });
}


app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

async function createNewInstanceWindow(args: string[]): Promise<void> {
    const type = await getWindowMetaFromArgs(args);
    createOrFocusWindow(type.windowType, type.filepath);

    async function getWindowMetaFromArgs(args: string[]): Promise<WindowMeta> {
        let meta: WindowMeta;
        if (app.isPackaged || args.length == 2) {
            meta = {
                type: args.length == 2 ? 'designer' : 'landing',
                filepath: args.length == 2 ? path.resolve(args[1]) : LANDING_PAGE_APP_PATH,
                windowType: args.length == 2 ? args[1].match(buildFileMatchPattern) ? runModeWindows : devModeWindows : LANDING_PAGE_WINDOW_TYPE
            }
        } else {
            meta = {
                type: args.length == 3 ? 'designer' : 'landing',
                filepath: args.length == 3 ? path.resolve(args[2]) : LANDING_PAGE_APP_PATH,
                windowType: args.length == 3 ? args[2].match(buildFileMatchPattern) ? runModeWindows : devModeWindows : LANDING_PAGE_WINDOW_TYPE
            }
        }

        const passMetaFlag = (await fs.pathExistsSync(meta.filepath) && (await fs.stat(meta.filepath)).isFile());
        if (passMetaFlag) {
            return meta;
        }

        return {
            type: 'landing',
            filepath: LANDING_PAGE_APP_PATH,
            windowType: LANDING_PAGE_WINDOW_TYPE
        }
    }
}