(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "electron", "fs-extra", "path", "@squirtle/api/umd/src/api/electron/electron.internal"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var electron_1 = require("electron");
    var fs = require("fs-extra");
    var path = require("path");
    var electron_internal_1 = require("@squirtle/api/umd/src/api/electron/electron.internal");
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
    function createWindow(windowTypes, _workingDirectory) {
        typeof _workingDirectory == 'string' ? null : _workingDirectory = null;
        var workingDir = _workingDirectory || path.resolve(process.argv[1] || path.join(process.argv[0], './no_file.json'));
        var promise = new Promise(function (resolve, reject) {
            // fs.pathExists(path.join(workingDir, 'quark.manifest.json'))
            fs.pathExists(path.join(workingDir, 'package.json'))
                .then(function (val) {
                var win;
                var showLandingPage;
                if (val) {
                    // win = getDesignerPageWindow();
                    win = getLandingPageWindow();
                    showLandingPage = false;
                }
                else {
                    win = getLandingPageWindow();
                    // showLandingPage = true;
                    showLandingPage = false;
                }
                win.data = {};
                win.data.project = workingDir;
                win.data.showLandingPage = showLandingPage;
                win.data = {
                    project: workingDir,
                    showLandingPage: showLandingPage,
                    isDevMode: windowTypes == devModeWindows
                };
                win.loadURL("http://localhost:4200");
                win.webContents.on('dom-ready', function () {
                    win.webContents.toggleDevTools();
                    win.show();
                    publishGlobalEvent(electron_internal_1.IpcEvents.HIDE_BUILD_LOADING, win.data.project);
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
    });
    electron_1.app.on('window-all-closed', function () {
        if (process.platform !== 'darwin') {
            electron_1.app.quit();
        }
    });
    function getLandingPageWindow() {
        var win = new electron_1.BrowserWindow({
            height: 600,
            width: 500,
            // resizable: false,
            resizable: true,
            show: false,
            frame: true,
            autoHideMenuBar: false,
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
        var win = new electron_1.BrowserWindow({
            height: 600,
            width: 800,
            show: false,
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQUFBLHFDQUF1RDtJQUN2RCw2QkFBK0I7SUFDL0IsMkJBQTZCO0lBRTdCLDBGQUFpRjtJQUdqRixJQUFNLGNBQWMsR0FBcUIsRUFBRSxDQUFDO0lBQzVDLElBQU0sY0FBYyxHQUFxQixFQUFFLENBQUM7SUFFNUMsU0FBUyxpQkFBaUI7UUFDdEIsa0JBQU8sQ0FBQyxFQUFFLENBQUMsNkJBQVMsQ0FBQyxtQkFBbUIsRUFBRSxVQUFDLENBQUMsRUFBRSxHQUFHO1lBQzdDLG1CQUFtQixDQUFDLGNBQWMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUM3QyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxTQUFTLGtCQUFrQixDQUFDLEtBQXlCO1FBQUUsY0FBYzthQUFkLFVBQWMsRUFBZCxxQkFBYyxFQUFkLElBQWM7WUFBZCw2QkFBYzs7UUFDakUsd0JBQWEsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxHQUFHLENBQUMsVUFBQyxHQUFHOztZQUNsQyxDQUFBLEtBQUEsR0FBRyxDQUFDLFdBQVcsQ0FBQSxDQUFDLElBQUksWUFBQyxLQUFLLFNBQUssSUFBSSxHQUFFO1FBQ3pDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELFNBQVMsWUFBWSxDQUFDLFdBQTZCLEVBQUUsaUJBQTBCO1FBQzNFLE9BQU8saUJBQWlCLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQztRQUN2RSxJQUFNLFVBQVUsR0FBRyxpQkFBaUIsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLGdCQUFnQixDQUFDLENBQUMs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