import { app, BrowserWindow, ipcMain, crashReporter, shell, remote, dialog } from "electron";
import * as path from 'path';
import * as url from 'url';
import * as fs from 'fs-extra';

import { IpcEvents } from '@squirtle/api/umd/src/api/electron/electron.internal';
import { IBrowserWindow } from '@squirtle/api/umd/src/api/electron/electron.internal';
import { autoUpdater } from 'electron-updater';

import log from 'electron-log';
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
    submitURL: 'http://localhost:3000/api/app-crashes',
    uploadToServer: false
});

const devModeWindows: IBrowserWindow[] = [];
const runModeWindows: IBrowserWindow[] = [];

const buildFileMatchPattern = /\.(build.qrk|qrk.asar)$/;
const LANDING_PAGE_APP_PATH = app.getPath('userData');
const LANDING_PAGE_WINDOW_TYPE = devModeWindows;

function registerListeners() {
    ipcMain.on(IpcEvents.ADD_RUN_MODE_WINDOW, (e, absoluteFilePath: string) => {
        createOrFocusWindow(runModeWindows, absoluteFilePath);
    });

    ipcMain.on(IpcEvents.ADD_DEV_MODE_WINDOW, (e, absoluteFilePath: string) => {
        createOrFocusWindow(devModeWindows, absoluteFilePath);
    });
}

function publishGlobalEvent(event: string | IpcEvents, ...args: any[]) {
    BrowserWindow.getAllWindows().map((win) => {
        win.webContents.send(event, ...args);
        // win.webContents.executeJavaScript(`console.log('${(args[0] as string).replace(/\\/g, '\\\\')}')`)
        // win.webContents.executeJavaScript(`console.log('${(args)}')`)
    });
}

async function _createWindow(windowTypes: IBrowserWindow[], absoluteFilePath: string): Promise<IBrowserWindow> {

    const promise: Promise<IBrowserWindow> = new Promise((resolve, reject) => {
        let win: IBrowserWindow;
        let showLandingPage: boolean;
        if (absoluteFilePath == LANDING_PAGE_APP_PATH) {
            win = getLandingPageWindow();
            showLandingPage = true;
        } else {
            win = getDesignerPageWindow();
            showLandingPage = false;
        }

        win.data = {
            project: path.resolve(absoluteFilePath),
            showLandingPage,
            isDevMode: windowTypes == devModeWindows,
            appPath: app.getAppPath(),
            home: path.join(app.getPath('home'), '.quark')
        }

        if (app.isPackaged) {
            win.loadURL(`file://${__dirname}/www/index.html`);
        } else {
            win.loadURL(`http://localhost:4200`);
        }

        // win.webContents.on('dom-ready', () => {
        win.webContents.on('did-finish-load', () => {
            win.show();
            win.webContents.executeJavaScript(`document.querySelector('app-views-container') || document.querySelector('app-new-landing')`)
                .then((val) => {
                    //val = null if not found
                    if (val == null) {
                        win.webContents.openDevTools();
                        dialog.showMessageBox(win, {
                            title: 'Error',
                            message: 'Failed to parse file.',
                            buttons: ['Close']
                        }, (r, c) => {
                            if (app.isPackaged) {
                                win.close();
                            }
                        });
                    }
                })
                .catch((err) => { console.log(err, 'never executed'); })
            publishGlobalEvent(IpcEvents.HIDE_BUILD_LOADING, win.data.project);
        });

        win.webContents.on('unresponsive', () => {
            console.log('Unresponsive');
        });

        win.webContents.on('crashed', (e, k) => {
            console.error('Window Crashed', k);
            // if (!k) {
            win.close();
            // }

            dialog.showMessageBox({
                title: 'Window Crashed',
                message: 'Reopen current project? ',
                buttons: ['Yes', 'No']
            }, (r, c) => {
                if (r == 0) {
                    createOrFocusWindow(windowTypes, absoluteFilePath);
                }
            });
        });


        windowTypes.push(win);
        win.webContents.addListener('will-navigate', (e, _url) => {
            e.preventDefault();
            const protocol = url.parse(_url).protocol;
            if ((protocol === 'http:' || protocol === 'https:') && !_url.includes('localhost')) {
                shell.openExternal(_url);
            }

            if (_url.includes('localhost') || protocol == 'file:') {
                console.log(_url);
                win.loadURL(_url);
            }
        });
        win.webContents.on('new-window', (e, _url) => {
            const protocol = url.parse(_url).protocol;
            if ((protocol === 'http:' || protocol === 'https:') && !_url.includes('localhost')) {
                shell.openExternal(_url);
            }
            e.preventDefault();
        });
        win.addListener('closed', () => {
            const index = windowTypes.findIndex((val) => { return val.data.project == win.data.project });
            windowTypes.splice(index, 1);
        });
        resolve(win);
    });
    return promise;
}



function createOrFocusWindow(windowTypes: IBrowserWindow[], absoluteFilePath: string) {

    const win = windowTypes.find((_win: IBrowserWindow) => {
        return _win.data.project == absoluteFilePath;
    });

    if (win) {
        if (win.isMinimized()) { win.restore() };
        win.focus();
    } else {
        _createWindow(windowTypes, absoluteFilePath);
    }
}


app.commandLine.appendSwitch('--enable-experimental-web-platform-features');
app.on('ready', () => {
    createNewInstanceWindow(process.argv).catch(console.error);
    registerListeners();
    autoUpdater.checkForUpdatesAndNotify();
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
}

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

    const passMetaFlag = (await fs.pathExists(meta.filepath) && (await fs.stat(meta.filepath)).isFile());
    if (passMetaFlag) {
        return meta;
    }

    return {
        type: 'landing',
        filepath: LANDING_PAGE_APP_PATH,
        windowType: LANDING_PAGE_WINDOW_TYPE
    }
}

function getLandingPageWindow(): IBrowserWindow {
    const win = new BrowserWindow({
        backgroundColor: '#000000',
        resizable: !app.isPackaged,
        show: false,
        frame: true,
        autoHideMenuBar: false,
        webPreferences: {
            webSecurity: false,
            nodeIntegration: true,
            nodeIntegrationInWorker: true,
            allowRunningInsecureContent: true
        }
    });
    return <IBrowserWindow>win;
}

function getDesignerPageWindow(): IBrowserWindow {
    const win = new BrowserWindow({
        backgroundColor: '#000000',
        show: false,
        frame: false,
        minHeight: 600,
        minWidth: 400,
        width: 900,
        height: 700,
        webPreferences: {
            webSecurity: false,
            nodeIntegration: true,
            nodeIntegrationInWorker: true,
            allowRunningInsecureContent: true
        }
    });
    return <IBrowserWindow>win;
}