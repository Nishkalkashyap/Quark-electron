(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "electron", "fs-extra", "path", "@squirtle/api/umd/src/api/electron/electron.internal", "electron-updater"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var electron_1 = require("electron");
    var fs = require("fs-extra");
    var path = require("path");
    var electron_internal_1 = require("@squirtle/api/umd/src/api/electron/electron.internal");
    var electron_updater_1 = require("electron-updater");
    var devModeWindows = [];
    var runModeWindows = [];
    function registerListeners() {
        electron_1.ipcMain.on(electron_internal_1.IpcEvents.ADD_DEV_MODE_WINDOW, function (e, arg) {
            createOrFocusWindow(runModeWindows, arg);
        });
    }
    function publishGlobalEvent(event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        electron_1.BrowserWindow.getAllWindows().map(function (win) {
            var _a;
            (_a = win.webContents).send.apply(_a, [event].concat(args));
        });
    }
    function createWindow(windowTypes, _fileName) {
        typeof _fileName == 'string' ? null : _fileName = null;
        var fileName = _fileName || path.resolve(process.argv[2] || process.argv[1] || path.join(process.argv[0], './no_file.qrk'));
        fileName = (fs.pathExists(fileName) && fs.statSync(fileName).isDirectory()) ? path.join(fileName, './no_file.qrk') : fileName;
        var promise = new Promise(function (resolve, reject) {
            // fs.pathExists(path.join(workingDir, 'quark.manifest.json'))
            fs.pathExists(path.join(path.dirname(fileName), 'package.json'))
                .then(function (val) {
                var win;
                var showLandingPage;
                if (val) {
                    win = getDesignerPageWindow();
                    // win = getLandingPageWindow();
                    showLandingPage = false;
                }
                else {
                    win = getLandingPageWindow();
                    showLandingPage = true;
                    // showLandingPage = false;
                }
                console.log(process.argv);
                win.data = {
                    project: fileName,
                    showLandingPage: showLandingPage,
                    isDevMode: windowTypes == devModeWindows,
                    appPath: electron_1.app.getAppPath()
                };
                win.loadURL("http://localhost:4200");
                // win.loadURL(`file://${__dirname}/www/index.html`);
                win.webContents.on('dom-ready', function () {
                    // win.webContents.openDevTools();
                    win.show();
                    win.webContents.executeJavaScript("document.querySelector('app-views-container')")
                        .then(function (val) {
                        //val = null if not found
                        if (val == null) {
                            win.webContents.openDevTools();
                        }
                    })
                        .catch(function (err) { console.log(err, 'never executed'); });
                    publishGlobalEvent(electron_internal_1.IpcEvents.HIDE_BUILD_LOADING, win.data.project);
                });
                win.webContents.on('unresponsive', function () {
                    console.log('Unresponsive');
                });
                win.webContents.on('crashed', function (e, k) {
                    console.error('Window Crashed', k);
                    // if (!k) {
                    win.close();
                    // }
                });
                windowTypes.push(win);
                win.addListener('closed', function () {
                    var index = windowTypes.findIndex(function (val) { return val.data.project == win.data.project; });
                    windowTypes.splice(index, 1);
                    win = null;
                });
                resolve(win);
            })
                .catch(function () {
                reject(null);
            });
        });
        return promise;
    }
    var _isSecondInstance = electron_1.app.requestSingleInstanceLock();
    if (!_isSecondInstance) {
        electron_1.app.quit();
    }
    else {
        electron_1.app.on('second-instance', function (event, commandLine, workingDirectory) {
            createOrFocusWindow(devModeWindows, workingDirectory);
        });
    }
    function createOrFocusWindow(windowTypes, workingDirectory) {
        var val = windowTypes.find(function (_val) {
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
            createWindow(windowTypes, workingDirectory);
        }
    }
    electron_1.app.on('ready', function () {
        createWindow(devModeWindows);
        registerListeners();
        electron_updater_1.autoUpdater.checkForUpdatesAndNotify();
    });
    electron_1.app.on('window-all-closed', function () {
        if (process.platform !== 'darwin') {
            electron_1.app.quit();
        }
    });
    function getLandingPageWindow() {
        var win = new electron_1.BrowserWindow({
            backgroundColor: '#000000',
            // resizable: false,
            resizable: true,
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
        return win;
    }
    function getDesignerPageWindow() {
        var win = new electron_1.BrowserWindow({
            backgroundColor: '#000000',
            show: false,
            frame: false,
            minHeight: 600,
            minWidth: 400,
            webPreferences: {
                webSecurity: false,
                nodeIntegration: true,
                nodeIntegrationInWorker: true,
                allowRunningInsecureContent: true
            }
        });
        return win;
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQUFBLHFDQUE2RDtJQUM3RCw2QkFBK0I7SUFDL0IsMkJBQTZCO0lBRTdCLDBGQUFpRjtJQUVqRixxREFBK0M7SUFFL0MsSUFBTSxjQUFjLEdBQXFCLEVBQUUsQ0FBQztJQUM1QyxJQUFNLGNBQWMsR0FBcUIsRUFBRSxDQUFDO0lBRTVDLFNBQVMsaUJBQWlCO1FBQ3RCLGtCQUFPLENBQUMsRUFBRSxDQUFDLDZCQUFTLENBQUMsbUJBQW1CLEVBQUUsVUFBQyxDQUFDLEVBQUUsR0FBRztZQUM3QyxtQkFBbUIsQ0FBQyxjQUFjLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDN0MsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsU0FBUyxrQkFBa0IsQ0FBQyxLQUF5QjtRQUFFLGNBQWM7YUFBZCxVQUFjLEVBQWQscUJBQWMsRUFBZCxJQUFjO1lBQWQsNkJBQWM7O1FBQ2pFLHdCQUFhLENBQUMsYUFBYSxFQUFFLENBQUMsR0FBRyxDQUFDLFVBQUMsR0FBRzs7WUFDbEMsQ0FBQSxLQUFBLEdBQUcsQ0FBQyxXQUFXLENBQUEsQ0FBQyxJQUFJLFlBQUMsS0FBSyxTQUFLLElBQUksR0FBRTtRQUN6QyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxTQUFTLFlBQVksQ0FBQyxXQUE2QixFQUFFLFNBQWtCO1FBQ25FLE9BQU8sU0FBUyxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3ZELElBQUksUUFBUSxHQUFHLFNBQVMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJ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