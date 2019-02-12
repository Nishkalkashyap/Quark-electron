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
        electron_1.ipcMain.on(electron_internal_1.IpcEvents.ADD_RUN_MODE_WINDOW, function (e, arg) {
            createOrFocusWindow(runModeWindows, arg);
            publishGlobalEvent(null, "Main Process : " + arg);
        });
        electron_1.ipcMain.on(electron_internal_1.IpcEvents.ADD_DEV_MODE_WINDOW, function (e, arg) {
            createOrFocusWindow(devModeWindows, arg);
            publishGlobalEvent(null, "Main Process : " + arg);
        });
    }
    function publishGlobalEvent(event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        electron_1.BrowserWindow.getAllWindows().map(function (win) {
            // win.webContents.send(event, ...args);
            win.webContents.executeJavaScript("console.log('" + args[0].replace(/\\/g, '\\\\') + "')");
        });
    }
    function createWindow(windowTypes, _fileName) {
        typeof _fileName == 'string' ? null : _fileName = null;
        var fileName = _fileName || path.resolve(process.argv[2] || process.argv[1] || path.join(process.argv[0], './no_file.qrk'));
        fileName = (fs.pathExists(fileName) && fs.statSync(fileName).isDirectory()) ? path.join(fileName, './no_file.qrk') : fileName;
        var promise = new Promise(function (resolve, reject) {
            // fs.pathExists(path.join(workingDir, 'quark.manifest.json'))
            // fs.pathExists(path.join(path.dirname(fileName), 'package.json'))
            //     .then((val) => {
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
                // showLandingPage = false;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQUFBLHFDQUF1RDtJQUN2RCw2QkFBK0I7SUFDL0IsMkJBQTZCO0lBRTdCLDBGQUFpRjtJQUVqRixxREFBK0M7SUFFL0MsSUFBTSxjQUFjLEdBQXFCLEVBQUUsQ0FBQztJQUM1QyxJQUFNLGNBQWMsR0FBcUIsRUFBRSxDQUFDO0lBRTVDLFNBQVMsaUJBQWlCO1FBQ3RCLGtCQUFPLENBQUMsRUFBRSxDQUFDLDZCQUFTLENBQUMsbUJBQW1CLEVBQUUsVUFBQyxDQUFDLEVBQUUsR0FBRztZQUM3QyxtQkFBbUIsQ0FBQyxjQUFjLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDekMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLG9CQUFrQixHQUFLLENBQUMsQ0FBQztRQUN0RCxDQUFDLENBQUMsQ0FBQztRQUVILGtCQUFPLENBQUMsRUFBRSxDQUFDLDZCQUFTLENBQUMsbUJBQW1CLEVBQUUsVUFBQyxDQUFDLEVBQUUsR0FBRztZQUM3QyxtQkFBbUIsQ0FBQyxjQUFjLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDekMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLG9CQUFrQixHQUFLLENBQUMsQ0FBQztRQUN0RCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxTQUFTLGtCQUFrQixDQUFDLEtBQXlCO1FBQUUsY0FBYzthQUFkLFVBQWMsRUFBZCxxQkFBYyxFQUFkLElBQWM7WUFBZCw2QkFBYzs7UUFDakUsd0JBQWEsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxHQUFHLENBQUMsVUFBQyxHQUFHO1lBQ2xDLHdDQUF3QztZQUN4QyxHQUFHLENBQUMsV0FBVyxDQUFDLGlCQUFpQixDQUFDLGtCQUFpQixJQUFJLENBQUMsQ0FBQyxDQUFZLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsT0FBSSxDQUFDLENBQUE7UUFDckcsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsU0FBUyxZQUFZLENBQUMsV0FBNkIsRUFBRSxTQUFrQjtRQUNuRSxPQUFPLFNBQVMsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN2RCxJQUFJLFFBQVEsR0FBRyxTQUFTLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLGVBQWUsQ0FBQyxDQUFDLENBQUM7UUFDNUgsUUFBUSxHQUFHLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7UUFDOUgsSUFBTSxPQUFPLEdBQTRCLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDakUsOERBQThEO1lBQzlELG1FQUFtRTtZQUNuRSx1QkFBdUI7WUFDdkIsSUFBSSxHQUFtQixDQUFDO1lBQ3hCLElBQUksZUFBd0IsQ0FBQztZQUM3QixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsRUFBRTtnQkFDbkMsR0FBRyxHQUFHLHFCQUFxQixFQUFFLENBQUM7Z0JBQzlCLGdDQUFnQztnQkFDaEMsZUFBZSxHQUFHLEtBQUssQ0FBQzthQUMzQjtpQkFBTTtnQkFDSCxHQUFHLEdBQUcsb0JBQW9CLEVBQUUsQ0FBQztnQkFDN0IsZUFBZSxHQUFHLElBQUksQ0FBQztnQkFDdkIsMkJBQTJCO2FBQzlCO1lBRUQsR0FBRyxDQUFDLElBQUksR0FBRztnQkFDUCxPQUFPLEVBQUUsUUFBUTtnQkFDakIsZUFBZSxpQkFBQTtnQkFDZixTQUFTLEVBQUUsV0FBVyxJQUFJLGNBQWM7Z0JBQ3hDLE9BQU8sRUFBRSxjQUFHLENBQUMsVUFBVSxFQUFFO2FBQzVCLENBQUE7WUFFRCxHQUFHLENBQUMsT0FBTyxDQUFDLHVCQUF1QixDQUFDLENBQUM7WUFDckMscURBQXFEO1lBQ3JELEdBQUcsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLFdBQVcsRUFBRTtnQkFDNUIsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNYLEdBQUcsQ0FBQyxXQUFXLENBQUMsaUJBQWlCLENBQUMsK0NBQStDLENBQUM7cUJBQzdFLElBQUksQ0FBQyxVQUFDLEdBQUc7b0JBQ04seUJBQXlCO29CQUN6QixJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUU7d0JBQ2IsR0FBRyxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztxQkFDbEM7Z0JBQ0wsQ0FBQyxDQUFDO3FCQUNELEtBQUssQ0FBQyxVQUFDLEdBQUcsSUFBTyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7Z0JBQzVELGtCQUFrQixDQUFDLDZCQUFTLENBQUMsa0JBQWtCLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN2RSxDQUFDLENBQUMsQ0FBQztZQUVILEdBQUcsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLGNBQWMsRUFBRTtnQkFDL0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUNoQyxDQUFDLENBQUMsQ0FBQztZQUVILEdBQUcsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxVQUFDLENBQUMsRUFBRSxDQUFDO2dCQUMvQixPQUFPLENBQUMsS0FBSyxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNuQyxZQUFZO2dCQUNaLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDWixJQUFJO1lBQ1IsQ0FBQyxDQUFDLENBQUM7WUFHSCxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3RCLEdBQUcsQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFO2dCQUN0QixJQUFNLEtBQUssR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDLFVBQUMsR0FBRyxJQUFPLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDOUYsV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQzdCLEdBQUcsR0FBRyxJQUFJLENBQUM7WUFDZixDQUFDLENBQUMsQ0FBQztZQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNiLEtBQUs7WUFDTCxpQkFBaUI7WUFDakIsb0JBQW9CO1lBQ3BCLE1BQU07UUFDVixDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFFRCxJQUFNLGlCQUFpQixHQUFHLGNBQUcsQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO0lBQzFELElBQUksQ0FBQyxpQkFBaUIsRUFBRTtRQUNwQixjQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDZDtTQUFNO1FBQ0gsY0FBRyxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxVQUFDLEtBQUssRUFBRSxXQUFXLEVBQUUsZ0JBQWdCO1lBQzNELG1CQUFtQixDQUFDLGNBQWMsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1FBQzFELENBQUMsQ0FBQyxDQUFDO0tBQ047SUFFRCxTQUFTLG1CQUFtQixDQUFDLFdBQTZCLEVBQUUsZ0JBQXdCO1FBQ2hGLElBQU0sR0FBRyxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBQyxJQUFvQjtZQUM5QyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxLQUFLLGdCQUFnQixDQUFDO1FBQ2xELENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxHQUFHLEVBQUU7WUFDTCxJQUFJLEdBQUcsQ0FBQyxXQUFXLEVBQUUsRUFBRTtnQkFBRSxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUE7YUFBRTtZQUFBLENBQUM7WUFDekMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ2Y7YUFBTTtZQUNILFlBQVksQ0FBQyxXQUFXLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztTQUMvQztJQUNMLENBQUM7SUFHRCxjQUFHLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRTtRQUNaLFlBQVksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUM3QixpQkFBaUIsRUFBRSxDQUFDO1FBQ3BCLDhCQUFXLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztJQUMzQyxDQUFDLENBQUMsQ0FBQztJQUdILGNBQUcsQ0FBQyxFQUFFLENBQUMsbUJBQW1CLEVBQUU7UUFDeEIsSUFBSSxPQUFPLENBQUMsUUFBUSxLQUFLLFFBQVEsRUFBRTtZQUMvQixjQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDZDtJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsU0FBUyxvQkFBb0I7UUFDekIsSUFBTSxHQUFHLEdBQUcsSUFBSSx3QkFBYSxDQUFDO1lBQzFCLGVBQWUsRUFBRSxTQUFTO1lBQzFCLG9CQUFvQjtZQUNwQixTQUFTLEVBQUUsSUFBSTtZQUNmLElBQUksRUFBRSxLQUFLO1lBQ1gsS0FBSyxFQUFFLElBQUk7WUFDWCxlQUFlLEVBQUUsS0FBSztZQUN0QixjQUFjLEVBQUU7Z0JBQ1osV0FBVyxFQUFFLEtBQUs7Z0JBQ2xCLGVBQWUsRUFBRSxJQUFJO2dCQUNyQix1QkFBdUIsRUFBRSxJQUFJO2dCQUM3QiwyQkFBMkIsRUFBRSxJQUFJO2FBQ3BDO1NBQ0osQ0FBQyxDQUFDO1FBQ0gsT0FBdUIsR0FBRyxDQUFDO0lBQy9CLENBQUM7SUFFRCxTQUFTLHFCQUFxQjtRQUMxQixJQUFNLEdBQUcsR0FBRyxJQUFJLHdCQUFhLENBQUM7WUFDMUIsZUFBZSxFQUFFLFNBQVM7WUFDMUIsSUFBSSxFQUFFLEtBQUs7WUFDWCxLQUFLLEVBQUUsS0FBSztZQUNaLFNBQVMsRUFBRSxHQUFHO1lBQ2QsUUFBUSxFQUFFLEdBQUc7WUFDYixjQUFjLEVBQUU7Z0JBQ1osV0FBVyxFQUFFLEtBQUs7Z0JBQ2xCLGVBQWUsRUFBRSxJQUFJO2dCQUNyQix1QkFBdUIsRUFBRSxJQUFJO2dCQUM3QiwyQkFBMkIsRUFBRSxJQUFJO2FBQ3BDO1NBQ0osQ0FBQyxDQUFDO1FBQ0gsT0FBdUIsR0FBRyxDQUFDO0lBQy9CLENBQUMifQ==