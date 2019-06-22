import { Tray, Menu, BrowserWindow, app, Notification } from 'electron';
import * as path from 'path';

let tray: Tray = null;
export function registerTray() {
    tray = new Tray(path.join(app.getAppPath(), './appAssets/32x32.png'));
    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Quit',
            click: (menuItem, win, e) => {
                const length = BrowserWindow.getAllWindows().length;
                if (!length) {
                    app.quit();
                } else {
                    const notif = new Notification({ title: 'Quark', body: 'You must close all windows first' });
                    notif.show();
                }
            }
        }
    ]);
    tray.setContextMenu(contextMenu);

    app.on('browser-window-created', (e, w) => {
        const length = BrowserWindow.getAllWindows().length;
        tray.setToolTip(`${length} window(s) opened.`);
    });

    app.on('browser-window-blur', (e, w) => {
        const length = BrowserWindow.getAllWindows().length;
        tray.setToolTip(`${length} window(s) opened.`);
    });
}