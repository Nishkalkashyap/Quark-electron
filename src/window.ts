import { shell, app, dialog, BrowserWindow } from "electron";
import * as fs from 'fs';
import { IBrowserWindow, IpcEvents } from '@quarkjs/api/umd/src/api/electron/electron.internal';
import { getLandingPageWindow, getDesignerPageWindow, devModeWindows, LANDING_PAGE_APP_PATH } from './util';
import * as path from 'path';
import * as url from 'url';

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
        if (absoluteFilePath == LANDING_PAGE_APP_PATH || !fs.existsSync(absoluteFilePath)) {
            win = getLandingPageWindow();
            showLandingPage = true;
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