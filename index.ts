import { app, BrowserWindow } from "electron";
import * as fs from 'fs-extra';
import * as path from 'path';

type CustomBrowserWindow = Electron.BrowserWindow & {
    data: {
        project: string;
        showLandingPage: boolean;
    }
};

let windows: CustomBrowserWindow[] = [];

function createWindow(_workingDirectory?: string): Promise<CustomBrowserWindow> {
    typeof _workingDirectory == 'string' ? null : _workingDirectory = null;
    const workingDir = _workingDirectory || path.resolve(process.argv[1] || process.argv[0] || '.');
    const promise: Promise<CustomBrowserWindow> = new Promise((resolve, reject) => {
        // fs.pathExists(path.join(workingDir, 'quark.manifest.json'))
        fs.pathExists(path.join(workingDir, 'package.json'))
            .then((val) => {
                let win: CustomBrowserWindow;
                let showLandingPage: boolean;
                if (val) {
                    win = getDesignerPageWindow();
                    // win = getLandingPageWindow();
                    showLandingPage = false;
                } else {
                    win = getLandingPageWindow();
                    showLandingPage = true;
                }
                win.data = <any>{};
                win.data.project = workingDir;
                win.data.showLandingPage = showLandingPage;



                win.loadURL(`http://localhost:4200`);
                // window.loadURL(`file:\\\\D:\\ionic\\Project\\Quark-electron\\www\\index.html`);
                windows.push(win);
                win.addListener('closed', () => {
                    windows = windows.filter((win) => {
                        return win.data.project !== win.data.project;
                    });
                    win = <any>null;
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

        const val = windows.find((_val: CustomBrowserWindow) => {
            return _val.data.project === workingDirectory;
        });

        if (val) {
            if (val.isMinimized()) { val.restore() };
            val.focus();
        } else {
            createWindow(workingDirectory);
        }
    })
}


app.on('ready', createWindow);


app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// app.on('activate', function () {
// if (mainWindow === null) {
// createWindow();
// }
// });

// app.on('browser-window-created', function (e, window) {
// window.setMenu(null);
// });









function getLandingPageWindow(): CustomBrowserWindow {
    const win = new BrowserWindow({
        height: 600,
        width: 500,
        // resizable: false,
        resizable: true,
        show: true,
        frame: true,
        webPreferences: {
            webSecurity: false,
            nodeIntegration: true,
            nodeIntegrationInWorker: false,
            allowRunningInsecureContent: true
        }
    });
    return <CustomBrowserWindow>win;
}

function getDesignerPageWindow(): CustomBrowserWindow {
    const win = new BrowserWindow({
        height: 600,
        width: 800,
        show: true,
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
    return <CustomBrowserWindow>win;
}