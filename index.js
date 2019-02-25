(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "electron", "fs-extra", "path", "@squirtle/api/umd/src/api/electron/electron.internal", "electron-updater", "electron-log"], factory);
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
    var electron_log_1 = require("electron-log");
    electron_updater_1.autoUpdater.logger = electron_log_1.default;
    electron_updater_1.autoUpdater.logger['transports'].file.level = 'info';
    electron_log_1.default.info('App starting...');
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
                            if (electron_1.app.isPackaged) {
                                win.loadURL("file://" + __dirname + "/www/index.html");
                            }
                            else {
                                win.loadURL("http://localhost:4200");
                            }
                            win.webContents.on('dom-ready', function () {
                                win.show();
                                win.webContents.executeJavaScript("document.querySelector('app-views-container') || document.querySelector('app-new-landing')")
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7SUFBQSxxQ0FBdUQ7SUFDdkQsNkJBQStCO0lBQy9CLDJCQUE2QjtJQUU3QiwwRkFBaUY7SUFFakYscURBQStDO0lBRS9DLDZDQUErQjtJQUMvQiw4QkFBVyxDQUFDLE1BQU0sR0FBRyxzQkFBRyxDQUFDO0lBQ3pCLDhCQUFXLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO0lBQ3JELHNCQUFHLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFFNUIsSUFBTSxjQUFjLEdBQXFCLEVBQUUsQ0FBQztJQUM1QyxJQUFNLGNBQWMsR0FBcUIsRUFBRSxDQUFDO0lBRTVDLFNBQVMsaUJBQWlCO1FBQ3RCLGtCQUFPLENBQUMsRUFBRSxDQUFDLDZCQUFTLENBQUMsbUJBQW1CLEVBQUUsVUFBQyxDQUFDLEVBQUUsR0FBRztZQUM3QyxtQkFBbUIsQ0FBQyxjQUFjLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDN0MsQ0FBQyxDQUFDLENBQUM7UUFFSCxrQkFBTyxDQUFDLEVBQUUsQ0FBQyw2QkFBUyxDQUFDLG1CQUFtQixFQUFFLFVBQUMsQ0FBQyxFQUFFLEdBQUc7WUFDN0MsbUJBQW1CLENBQUMsY0FBYyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzdDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELFNBQVMsa0JBQWtCLENBQUMsS0FBeUI7UUFBRSxjQUFjO2FBQWQsVUFBYyxFQUFkLHFCQUFjLEVBQWQsSUFBYztZQUFkLDZCQUFjOztRQUNqRSx3QkFBYSxDQUFDLGFBQWEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxVQUFDLEdBQUc7O1lBQ2xDLENBQUEsS0FBQSxHQUFHLENBQUMsV0FBVyxDQUFBLENBQUMsSUFBSSxZQUFDLEtBQUssU0FBSyxJQUFJLEdBQUU7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