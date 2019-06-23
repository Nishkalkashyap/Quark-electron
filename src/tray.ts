import { Tray, Menu, BrowserWindow, app, Notification } from 'electron';
import * as path from 'path';
import { createNewInstanceWindow } from './window';

let tray: Tray = null;

export function registerTray() {
    tray = new Tray(path.join(app.getAppPath(), './appAssets/32x32.png'));
    setTrayMenu(tray);

    app.on('browser-window-created', (e, w) => {
        const length = BrowserWindow.getAllWindows().length;
        tray.setToolTip(`${length} window(s) opened.`);
        setTrayMenu(tray);
    });

    app.on('browser-window-blur', (e, w) => {
        const length = BrowserWindow.getAllWindows().length;
        tray.setToolTip(`${length} window(s) opened.`);
        setTrayMenu(tray);
    });
}

function setTrayMenu(tray: Tray) {
    if (!tray) {
        return;
    }
    const template: Electron.MenuItemConstructorOptions[] = [
        {
            label: 'Start',
            click: () => {
                createNewInstanceWindow([]).catch(console.error);
            }
        },
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
    ];

    const windowsMenu: Electron.MenuItemConstructorOptions = {
        label: 'Windows',
        submenu: []
    };

    (windowsMenu.submenu as any).push(...BrowserWindow.getAllWindows().map((win) => {
        const temp: Electron.MenuItemConstructorOptions = {
            label: win.getTitle().replace(/\s+-\s+Quark/, ''),
            submenu: [
                {
                    label: 'Close',
                    click: () => {
                        const w = findWindowFromTitle(win.getTitle());
                        if (w) { w.close() }
                    }
                },
                {
                    label: 'Focus',
                    click: () => {
                        const w = findWindowFromTitle(win.getTitle());
                        if (w) { w.focus() }
                    }
                }
            ]
        }
        return temp;
    }));

    template.push(windowsMenu);

    const contextMenu = Menu.buildFromTemplate(template);
    tray.setContextMenu(contextMenu);

    function findWindowFromTitle(title: string) {
        return BrowserWindow.getAllWindows().find((w) => w.getTitle().includes(title))
    }
}