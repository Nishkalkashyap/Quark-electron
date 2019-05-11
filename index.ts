import { app, BrowserWindow, ipcMain, crashReporter, shell, remote, dialog } from "electron";
import * as fs from 'fs-extra';
import * as path from 'path';
import * as url from 'url';

import { IpcEvents } from '@squirtle/api/umd/src/api/electron/electron.internal';
import { IBrowserWindow } from '@squirtle/api/umd/src/api/electron/electron.internal';
import { autoUpdater } from 'electron-updater';

import log from 'electron-log';
autoUpdater.logger = log;
autoUpdater.logger['transports'].file.level = 'info';
log.info('App starting...');

crashReporter.start({
    productName: 'Quarkjs',
    companyName: 'Quark',
    submitURL: 'http://localhost:3000/api/app-crashes',
    uploadToServer: false
});

const devModeWindows: IBrowserWindow[] = [];
const runModeWindows: IBrowserWindow[] = [];

const buildFileMatchPattern = /\.(build.qrk|qrk.asar)$/;

function registerListeners() {
    ipcMain.on(IpcEvents.ADD_RUN_MODE_WINDOW, (e, arg) => {
        createOrFocusWindow(runModeWindows, arg);
    });

    ipcMain.on(IpcEvents.ADD_DEV_MODE_WINDOW, (e, arg) => {
        createOrFocusWindow(devModeWindows, arg);
    });
}

function publishGlobalEvent(event: string | IpcEvents, ...args: any[]) {
    BrowserWindow.getAllWindows().map((win) => {
        win.webContents.send(event, ...args);
        // win.webContents.executeJavaScript(`console.log('${(args[0] as string).replace(/\\/g, '\\\\')}')`)
        // win.webContents.executeJavaScript(`console.log('${(args)}')`)
    });
}

async function createWindow(windowTypes: IBrowserWindow[], _fileName: string): Promise<IBrowserWindow> {
    // publishGlobalEvent(_fileName, _fileName);
    typeof _fileName == 'string' ? null : _fileName = null;
    let fileName = _fileName || path.resolve(process.argv[2] || process.argv[1] || path.join(process.argv[0], './no_file.qrk'));
    // fileName = (await fs.pathExists(fileName) && (await fs.stat(fileName)).isDirectory()) ? path.join(fileName, './no_file.qrk') : fileName;
    // console.log(fileName, process.argv);
    const promise: Promise<IBrowserWindow> = new Promise((resolve, reject) => {
        let win: IBrowserWindow;
        let showLandingPage: boolean;
        if (fileName.includes('no_file.qrk') || fileName == app.getAppPath() || fileName == path.dirname(app.getPath('exe'))) {
            win = getLandingPageWindow();
            showLandingPage = true;
        } else {
            win = getDesignerPageWindow();
            showLandingPage = false;
        }

        win.data = {
            // project: fileName,
            project: path.resolve(fileName),
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
                            win.close();
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

            dialog.showMessageBox(win, {
                title: 'Window Crashed',
                message: 'Reopen current project? ',
                buttons: ['Yes', 'No']
            }, (r, c) => {
                if (r == 0) {
                    createWindow(windowTypes, _fileName);
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
            win = null;
        });
        resolve(win);
        // })
        // .catch(() => {
        //     reject(null);
        // });
    });
    return promise;
}

const _isSecondInstance = app.requestSingleInstanceLock();
if (!_isSecondInstance) {
    app.quit();
} else {
    app.on('second-instance', (event, commandLine, workingDirectory) => {
        const quarkFilePath = (commandLine.find((val) => {
            return val.endsWith('.qrk') || !!val.match(buildFileMatchPattern);
        }));

        if (quarkFilePath) {
            quarkFilePath.match(buildFileMatchPattern) ? createOrFocusWindow(runModeWindows, path.resolve(quarkFilePath)) : createOrFocusWindow(devModeWindows, path.resolve(quarkFilePath));
            return;
        }
        createOrFocusWindow(devModeWindows, path.resolve(workingDirectory));
    });
}

function createOrFocusWindow(windowTypes: IBrowserWindow[], workingDirectory: string) {
    const val = windowTypes.find((_val: IBrowserWindow) => {
        return _val.data.project == path.resolve(workingDirectory);
    });

    if (val) {
        if (val.isMinimized()) { val.restore() };
        val.focus();
    } else {
        createWindow(windowTypes, path.resolve(workingDirectory));
    }
}


app.commandLine.appendSwitch('--enable-experimental-web-platform-features');
app.on('ready', () => {

    let windowType: typeof devModeWindows = devModeWindows;
    if ((process.argv[2] || process.argv[1] || process.argv[0]).match(buildFileMatchPattern)) {
        windowType = runModeWindows;
    }

    createWindow(windowType, path.resolve((process.argv[2] || process.argv[1] || process.argv[0])));
    registerListeners();
    autoUpdater.checkForUpdatesAndNotify();
});


app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

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