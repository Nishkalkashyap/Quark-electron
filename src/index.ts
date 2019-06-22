import { app, crashReporter } from "electron";
import log from 'electron-log';
import { setMainProcessData, } from './util';
import { registerListeners, createNewInstanceWindow } from './window';
import { initializeLogger, setAutoUpdaterOptions } from './auto-updater';
import { registerProcessExplorer } from './process.explorer';

initializeLogger();

crashReporter.start({
    productName: 'Quarkjs',
    companyName: 'Quark',
    submitURL: 'https://quarkjs.io/crash-reporter'
});

app.commandLine.appendSwitch('--enable-experimental-web-platform-features');
app.on('ready', () => {
    setMainProcessData();
    createNewInstanceWindow(process.argv).catch(console.error);
    registerListeners();
    registerProcessExplorer();
    setAutoUpdaterOptions().catch((err) => {
        console.error(err);
        log.error(`Auto updater failed to initialize`);
    });
});

const _isSecondInstance = app.requestSingleInstanceLock();
if (!_isSecondInstance) {
    app.quit();
} else {
    app.on('second-instance', (event, commandLine) => {
        console.log(commandLine, '\n\n\n');
        createNewInstanceWindow(commandLine).catch(console.error);
    });
}


app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});