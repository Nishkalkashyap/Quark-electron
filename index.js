(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "electron", "fs-extra", "path", "@squirtle/api/umd/src/api/electron/electron.internal", "electron-updater"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var electron_1 = require("electron");
    var fs = require("fs-extra");
    var path = require("path");
    var electron_internal_1 = require("@squirtle/api/umd/src/api/electron/electron.internal");
    var electron_updater_1 = require("electron-updater");
    var devModeWindows = [];
    var runModeWindows = [];
    function registerListeners() {
        electron_1.ipcMain.on(electron_internal_1.IpcEvents.ADD_RUN_MODE_WINDOW, function (e, arg) {
            createOrFocusWindow(runModeWindows, arg);
        });
        electron_1.ipcMain.on(electron_internal_1.IpcEvents.ADD_DEV_MODE_WINDOW, function (e, arg) {
            createOrFocusWindow(devModeWindows, arg);
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
            // win.webContents.executeJavaScript(`console.log('${(args[0] as string).replace(/\\/g, '\\\\')}')`)
        });
    }
    function createWindow(windowTypes, _fileName) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var fileName, _a, promise;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        typeof _fileName == 'string' ? null : _fileName = null;
                        fileName = _fileName || path.resolve(process.argv[2] || process.argv[1] || path.join(process.argv[0], './no_file.qrk'));
                        return [4 /*yield*/, fs.pathExists(fileName)];
                    case 1:
                        _a = (_b.sent());
                        if (!_a) return [3 /*break*/, 3];
                        return [4 /*yield*/, fs.stat(fileName)];
                    case 2:
                        _a = (_b.sent()).isDirectory();
                        _b.label = 3;
                    case 3:
                        fileName = (_a) ? path.join(fileName, './no_file.qrk') : fileName;
                        promise = new Promise(function (resolve, reject) {
                            var win;
                            var showLandingPage;
                            if (!fileName.includes('no_file.qrk')) {
                                win = getDesignerPageWindow();
                                // win = getLandingPageWindow();
                                showLandingPage = false;
                            }
                            else {
                                win = getLandingPageWindow();
                                showLandingPage = true;
                            }
                            win.data = {
                                project: fileName,
                                showLandingPage: showLandingPage,
                                isDevMode: windowTypes == devModeWindows,
                                appPath: electron_1.app.getAppPath()
                            };
                            win.loadURL("http://localhost:4200");
                            // win.loadURL(`file://${__dirname}/www/index.html`);
                            win.webContents.on('dom-ready', function () {
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
                            // })
                            // .catch(() => {
                            //     reject(null);
                            // });
                        });
                        return [2 /*return*/, promise];
                }
            });
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7SUFBQSxxQ0FBdUQ7SUFDdkQsNkJBQStCO0lBQy9CLDJCQUE2QjtJQUU3QiwwRkFBaUY7SUFFakYscURBQStDO0lBRS9DLElBQU0sY0FBYyxHQUFxQixFQUFFLENBQUM7SUFDNUMsSUFBTSxjQUFjLEdBQXFCLEVBQUUsQ0FBQztJQUU1QyxTQUFTLGlCQUFpQjtRQUN0QixrQkFBTyxDQUFDLEVBQUUsQ0FBQyw2QkFBUyxDQUFDLG1CQUFtQixFQUFFLFVBQUMsQ0FBQyxFQUFFLEdBQUc7WUFDN0MsbUJBQW1CLENBQUMsY0FBYyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzdDLENBQUMsQ0FBQyxDQUFDO1FBRUgsa0JBQU8sQ0FBQyxFQUFFLENBQUMsNkJBQVMsQ0FBQyxtQkFBbUIsRUFBRSxVQUFDLENBQUMsRUFBRSxHQUFHO1lBQzdDLG1CQUFtQixDQUFDLGNBQWMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUM3QyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxTQUFTLGtCQUFrQixDQUFDLEtBQXlCO1FBQUUsY0FBYzthQUFkLFVBQWMsRUFBZCxxQkFBYyxFQUFkLElBQWM7WUFBZCw2QkFBYzs7UUFDakUsd0JBQWEsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxHQUFHLENBQUMsVUFBQyxHQUFHOztZQUNsQyxDQUFBLEtBQUEsR0FBRyxDQUFDLFdBQVcsQ0FBQSxDQUFDLElBQUksWUFBQyxLQUFLLFNBQUssSUFBSSxHQUFFO1lBQ3JDLG9HQUFvRztRQUN4RyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxTQUFlLFlBQVksQ0FBQyxXQUE2QixFQUFFLFNBQWtCOzs7Ozs7d0JBQ3pFLE9BQU8sU0FBUyxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFD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