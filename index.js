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
            // win.webContents.executeJavaScript(`console.log('${(args)}')`)
        });
    }
    function createWindow(windowTypes, _fileName) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var fileName, _a, promise;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        // publishGlobalEvent(_fileName, _fileName);
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
                                appPath: electron_1.app.getAppPath(),
                                home: path.join(electron_1.app.getPath('home'), '.quark')
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
                            // win.webContents.addListener('will-navigate', (e, _url) => {
                            //     e.preventDefault();
                            //     const protocol = url.parse(_url).protocol;
                            //     if ((protocol === 'http:' || protocol === 'https:') && !_url.includes('localhost')) {
                            //         shell.openExternal(_url);
                            //     }
                            //     if (_url.includes('localhost') || protocol == 'file:') {
                            //         console.log(_url);
                            //         win.loadURL(_url);
                            //     }
                            // });
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
            resizable: !electron_1.app.isPackaged,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7SUFBQSxxQ0FBOEQ7SUFDOUQsNkJBQStCO0lBQy9CLDJCQUE2QjtJQUU3QiwwRkFBaUY7SUFFakYscURBQStDO0lBRS9DLDZDQUErQjtJQUMvQiw4QkFBVyxDQUFDLE1BQU0sR0FBRyxzQkFBRyxDQUFDO0lBQ3pCLDhCQUFXLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO0lBQ3JELHNCQUFHLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFFNUIsSUFBTSxjQUFjLEdBQXFCLEVBQUUsQ0FBQztJQUM1QyxJQUFNLGNBQWMsR0FBcUIsRUFBRSxDQUFDO0lBRTVDLFNBQVMsaUJBQWlCO1FBQ3RCLGtCQUFPLENBQUMsRUFBRSxDQUFDLDZCQUFTLENBQUMsbUJBQW1CLEVBQUUsVUFBQyxDQUFDLEVBQUUsR0FBRztZQUM3QyxtQkFBbUIsQ0FBQyxjQUFjLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDN0MsQ0FBQyxDQUFDLENBQUM7UUFFSCxrQkFBTyxDQUFDLEVBQUUsQ0FBQyw2QkFBUyxDQUFDLG1CQUFtQixFQUFFLFVBQUMsQ0FBQyxFQUFFLEdBQUc7WUFDN0MsbUJBQW1CLENBQUMsY0FBYyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzdDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELFNBQVMsa0JBQWtCLENBQUMsS0FBeUI7UUFBRSxjQUFjO2FBQWQsVUFBYyxFQUFkLHFCQUFjLEVBQWQsSUFBYztZQUFkLDZCQUFjOztRQUNqRSx3QkFBYSxDQUFDLGFBQWEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxVQUFDLEdBQUc7O1lBQ2xDLENBQUEsS0FBQSxHQUFHLENBQUMsV0FBVyxDQUFBLENBQUMsSUFBSSxZQUFDLEtBQUssU0FBSyxJQUFJLEdBQUU7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