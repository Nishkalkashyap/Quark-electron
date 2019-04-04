(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "tslib", "electron", "fs-extra", "path", "url", "@squirtle/api/umd/src/api/electron/electron.internal", "electron-updater", "electron-log"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var electron_1 = require("electron");
    var fs = require("fs-extra");
    var path = require("path");
    var url = require("url");
    var electron_internal_1 = require("@squirtle/api/umd/src/api/electron/electron.internal");
    var electron_updater_1 = require("electron-updater");
    var electron_log_1 = require("electron-log");
    electron_updater_1.autoUpdater.logger = electron_log_1.default;
    electron_updater_1.autoUpdater.logger['transports'].file.level = 'info';
    electron_log_1.default.info('App starting...');
    electron_1.crashReporter.start({
        productName: 'Quarkjs',
        companyName: 'Quark',
        submitURL: 'http://localhost:3000/api/app-crashes',
        uploadToServer: false
    });
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
                            win.webContents.addListener('will-navigate', function (e, _url) {
                                e.preventDefault();
                                var protocol = url.parse(_url).protocol;
                                if ((protocol === 'http:' || protocol === 'https:') && !_url.includes('localhost')) {
                                    electron_1.shell.openExternal(_url);
                                }
                                if (_url.includes('localhost') || protocol == 'file:') {
                                    console.log(_url);
                                    win.loadURL(_url);
                                }
                            });
                            win.webContents.on('new-window', function (e) {
                                e.preventDefault();
                            });
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
            var quark = commandLine.find(function (val) {
                return val.endsWith('.qrk');
            });
            if (quark) {
                quark.endsWith('.build.qrk') ? createOrFocusWindow(runModeWindows, quark) : createOrFocusWindow(devModeWindows, quark);
                return;
            }
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
        var windowType = devModeWindows;
        if ((process.argv[2] || process.argv[1] || process.argv[0]).endsWith('.build.qrk')) {
            windowType = runModeWindows;
        }
        createWindow(windowType);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7SUFBQSxxQ0FBNkU7SUFDN0UsNkJBQStCO0lBQy9CLDJCQUE2QjtJQUM3Qix5QkFBMkI7SUFHM0IsMEZBQWlGO0lBRWpGLHFEQUErQztJQUUvQyw2Q0FBK0I7SUFDL0IsOEJBQVcsQ0FBQyxNQUFNLEdBQUcsc0JBQUcsQ0FBQztJQUN6Qiw4QkFBVyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQztJQUNyRCxzQkFBRyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBRTVCLHdCQUFhLENBQUMsS0FBSyxDQUFDO1FBQ2hCLFdBQVcsRUFBRSxTQUFTO1FBQ3RCLFdBQVcsRUFBRSxPQUFPO1FBQ3BCLFNBQVMsRUFBRSx1Q0FBdUM7UUFDbEQsY0FBYyxFQUFFLEtBQUs7S0FDeEIsQ0FBQyxDQUFDO0lBRUgsSUFBTSxjQUFjLEdBQXFCLEVBQUUsQ0FBQztJQUM1QyxJQUFNLGNBQWMsR0FBcUIsRUFBRSxDQUFDO0lBRTVDLFNBQVMsaUJBQWlCO1FBQ3RCLGtCQUFPLENBQUMsRUFBRSxDQUFDLDZCQUFTLENBQUMsbUJBQW1CLEVBQUUsVUFBQyxDQUFDLEVBQUUsR0FBRztZQUM3QyxtQkFBbUIsQ0FBQyxjQUFjLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDN0MsQ0FBQyxDQUFDLENBQUM7UUFFSCxrQkFBTyxDQUFDLEVBQUUsQ0FBQyw2QkFBUyxDQUFDLG1CQUFtQixFQUFFLFVBQUMsQ0FBQyxFQUFFLEdBQUc7WUFDN0MsbUJBQW1CLENBQUMsY0FBYyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzdDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELFNBQVMsa0JBQWtCLENBQUMsS0FBeUI7UUFBRSxjQUFjO2FBQWQsVUFBYyxFQUFkLHFCQUFjLEVBQWQs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