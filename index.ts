import { app, BrowserWindow, ipcMain } from "electron";
import * as fs from 'fs-extra';
import * as path from 'path';

import { IpcEvents } from '@squirtle/api/umd/src/api/electron/electron.internal';
import { IBrowserWindow } from '@squirtle/api/umd/src/api/electron/electron.exports';

const devModeWindows: IBrowserWindow[] = [];
const runModeWindows: IBrowserWindow[] = [];

function registerListeners() {
    ipcMain.on(IpcEvents.ADD_DEV_MODE_WINDOW, (e, arg) => {
        createOrFocusWindow(runModeWindows, arg);
    });
}

function publishGlobalEvent(event: string | IpcEvents, ...args: any[]) {
    BrowserWindow.getAllWindows().map((win) => {
        win.webContents.send(event, ...args);
    });
}

function createWindow(windowTypes: IBrowserWindow[], _workingDirectory?: string): Promise<IBrowserWindow> {
    typeof _workingDirectory == 'string' ? null : _workingDirectory = null;
    const workingDir = _workingDirectory || path.resolve(process.argv[1] || path.join(process.argv[0], './no_file.json'));
    const promise: Promise<IBrowserWindow> = new Promise((resolve, reject) => {
        // fs.pathExists(path.join(workingDir, 'quark.manifest.json'))
        fs.pathExists(path.join(workingDir, 'package.json'))
            .then((val) => {
                let win: IBrowserWindow;
                let showLandingPage: boolean;
                if (val) {
                    win = getDesignerPageWindow();
                    // win = getLandingPageWindow();
                    showLandingPage = false;
                } else {
                    win = getLandingPageWindow();
                    showLandingPage = true;
                    // showLandingPage = false;
                }
                win.data = <any>{};
                win.data.project = workingDir;
                win.data.showLandingPage = showLandingPage;

                win.data = {
                    project: workingDir,
                    showLandingPage: showLandingPage,
                    isDevMode: windowTypes == devModeWindows
                }

                win.loadURL(`http://localhost:4200`);
                win.webContents.on('dom-ready', () => {
                    win.webContents.openDevTools();
                    win.show();
                    publishGlobalEvent(IpcEvents.HIDE_BUILD_LOADING, win.data.project);
                });
                windowTypes.push(win);
                win.addListener('closed', () => {
                    const index = windowTypes.findIndex((val) => { return val.data.project == win.data.project });
                    windowTypes.splice(index, 1);
                    win = null;
                });
                resolve(win);
            })
            .catch(() => {
                reject(null);
            });
    });
    return promise;
}

const _isSecondInstance = app.requestSingleInstanceLock();
if (!_isSecondInstance) {
    app.quit();
} else {
    app.on('second-instance', (event, commandLine, workingDirectory) => {
        createOrFocusWindow(devModeWindows, workingDirectory);
    })
}

function createOrFocusWindow(windowTypes: IBrowserWindow[], workingDirectory: string) {
    const val = windowTypes.find((_val: IBrowserWindow) => {
        return _val.data.project === workingDirectory;
    });

    if (val) {
        if (val.isMinimized()) { val.restore() };
        val.focus();
    } else {
        createWindow(windowTypes, workingDirectory);
    }
}


app.on('ready', () => {
    createWindow(devModeWindows);
    registerListeners();
});


app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

function getLandingPageWindow(): IBrowserWindow {
    const win = new BrowserWindow({
        height: 600,
        width: 500,
        backgroundColor : '#000000',
        // resizable: false,
        resizable: true,
        show: false,
        frame: true,
        autoHideMenuBar : false,
        webPreferences: {
            webSecurity: false,
            nodeIntegration: true,
            nodeIntegrationInWorker: false,
            allowRunningInsecureContent: true
        }
    });
    return <IBrowserWindow>win;
}

function getDesignerPageWindow(): IBrowserWindow {
    const win = new BrowserWindow({
        height: 600,
        width: 800,
        backgroundColor : '#000000',
        show: false,
        frame: false,
        minHeight: 600,
        minWidth: 400,
        webPreferences: {
            webSecurity: false,
            nodeIntegration: true,
            nodeIntegrationInWorker: false,
            allowRunningInsecureContent: true
        }
    });
    return <IBrowserWindow>win;
}