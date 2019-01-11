"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const fs = require("fs-extra");
const path = require("path");
let windows = [];
function createWindow(_workingDirectory) {
    typeof _workingDirectory == 'string' ? null : _workingDirectory = null;
    const workingDir = _workingDirectory || path.resolve(process.argv[1] || process.argv[0] || '.');
    const promise = new Promise((resolve, reject) => {
        // fs.pathExists(path.join(workingDir, 'quark.manifest.json'))
        fs.pathExists(path.join(workingDir, 'package.json'))
            .then((val) => {
            let win;
            let showLandingPage;
            if (val) {
                win = getDesignerPageWindow();
                // win = getLandingPageWindow();
                showLandingPage = false;
            }
            else {
                win = getLandingPageWindow();
                showLandingPage = true;
            }
            win.data = {};
            win.data.project = workingDir;
            win.data.showLandingPage = showLandingPage;
            win.loadURL(`http://localhost:4200`);
            // window.loadURL(`file:\\\\D:\\ionic\\Project\\Quark-electron\\www\\index.html`);
            windows.push(win);
            win.addListener('closed', () => {
                windows = windows.filter((win) => {
                    return win.data.project !== win.data.project;
                });
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
const _isSecondInstance = electron_1.app.requestSingleInstanceLock();
if (!_isSecondInstance) {
    electron_1.app.quit();
}
else {
    electron_1.app.on('second-instance', (event, commandLine, workingDirectory) => {
        const val = windows.find((_val) => {
            return _val.data.project === workingDirectory;
        });
        if (val) {
            if (val.isMinimized()) {
                val.restore();
            }
            ;
            val.focus();
        }
        else {
            createWindow(workingDirectory);
        }
    });
}
electron_1.app.on('ready', createWindow);
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
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
function getLandingPageWindow() {
    const win = new electron_1.BrowserWindow({
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
    return win;
}
function getDesignerPageWindow() {
    const win = new electron_1.BrowserWindow({
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
    return win;
}
//# sourceMappingURL=index.js.map