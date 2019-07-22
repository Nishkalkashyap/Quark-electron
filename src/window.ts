import { shell, app, dialog, BrowserWindow, ipcMain } from "electron";
import * as fs from 'fs-extra';
import { IBrowserWindow, IpcEvents } from '@quarkjs/api/umd/src/api/electron/electron.internal';
import { getLandingPageWindow, getDesignerPageWindow, devModeWindows, LANDING_PAGE_APP_PATH, runModeWindows, WindowMeta, buildFileMatchPattern, LANDING_PAGE_WINDOW_TYPE } from './util';
import * as path from 'path';
import * as url from 'url';

function publishGlobalEvent(event: string | IpcEvents, ...args: any[]) {
    BrowserWindow.getAllWindows().map((win) => {
        win.webContents.send(event, ...args);
        // win.webContents.executeJavaScript(`console.log('${(args[0] as string).replace(/\\/g, '\\\\')}')`)
        // win.webContents.executeJavaScript(`console.log('${(args)}')`)
    });
}

export function registerListeners() {
    ipcMain.on(IpcEvents.ADD_RUN_MODE_WINDOW, (e, absoluteFilePath: string) => {
        createOrFocusWindow(runModeWindows, absoluteFilePath);
    });

    ipcMain.on(IpcEvents.ADD_DEV_MODE_WINDOW, (e, absoluteFilePath: string) => {
        createOrFocusWindow(devModeWindows, absoluteFilePath);
    });
}

async function _createWindow(windowTypes: IBrowserWindow[], absoluteFilePath: string): Promise<IBrowserWindow> {

    const promise: Promise<IBrowserWindow> = new Promise((resolve, reject) => {
        let win: IBrowserWindow;
        let showLandingPage: boolean;
        const exists = fs.existsSync(absoluteFilePath);
        if (absoluteFilePath == LANDING_PAGE_APP_PATH || !exists) {
            win = getLandingPageWindow();
            showLandingPage = true;
            if (!exists) {
                console.log(`File ${absoluteFilePath} does not exists.`);
            }
        } else {
            win = getDesignerPageWindow(path.resolve(absoluteFilePath));
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
            // win.show();
            win.webContents.executeJavaScript(`document.querySelector('app-views-container') || document.querySelector('app-new-landing')`)
                .then((val) => {
                    //val = null if not found
                    if (val == null) {
                        telemetry.reportException('FailedToParseFile');
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
            telemetry.reportException(`WindowUnresponsive`);
        });

        win.webContents.on('crashed', (e, k) => {
            console.error('Window Crashed', k);
            telemetry.reportException(`WindowCrashed`);
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

export function createOrFocusWindow(windowTypes: IBrowserWindow[], absoluteFilePath: string) {

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

export async function createNewInstanceWindow(args: string[]): Promise<void> {
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