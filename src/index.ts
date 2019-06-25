import { app, crashReporter, Notification } from "electron";
import log from 'electron-log';
import { setMainProcessData, mainProcessData, } from './util';
import { registerListeners, createNewInstanceWindow } from './window';
import { initializeLogger, setAutoUpdaterOptions } from './auto-updater';
import { registerProcessExplorer } from './process.explorer';
import { enableAutoLaunch } from './auto-launch';
import { registerTray } from './tray';

const _isSecondInstance = app.requestSingleInstanceLock();
if (!_isSecondInstance) {
    app.quit();
} else {
    app.on('second-instance', (event, commandLine) => {
        console.log(commandLine, '\n\n\n');
        createNewInstanceWindow(commandLine).catch(console.error);
    });
}

initializeLogger();
crashReporter.start({
    productName: 'Quarkjs',
    companyName: 'Quark',
    submitURL: 'https://quarkjs.io/crash-reporter'
});

app.commandLine.appendSwitch('--enable-experimental-web-platform-features');
app.setAppUserModelId(process.execPath);
app.on('ready', () => {
    // has to be first
    setMainProcessData();

    createNewInstanceWindow(process.argv).catch(console.error);
    registerListeners();
    registerProcessExplorer();
    enableAutoLaunch();
    registerTray();
    setAutoUpdaterOptions().catch((err) => {
        console.error(err);
        log.error(`Auto updater failed to initialize`);
    });
});


let notificationWasShownOnce: boolean = false;
app.on('window-all-closed', function () {
    console.log(JSON.stringify(mainProcessData || {}, undefined, 4), 'Main Process Data');
    if (process.platform !== 'darwin') {
        // if (!(mainProcessData.leaveAppRunningOnWindowClose && app.isPackaged)) {
        if (!(mainProcessData.leaveAppRunningOnWindowClose)) {
            app.quit();
        } else {
            if (!notificationWasShownOnce) {
                const notif = new Notification({ title: 'Quark', body: 'Quark is running in the background. You can access the app from the tray icon.' });
                notif.show();
                notificationWasShownOnce = true;
            }
        }
    }
});