"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_updater_1 = require("electron-updater");
function checkForUpdates() {
    electron_updater_1.autoUpdater.on('checking-for-update', () => {
        console.log('checking for updates');
    });
    electron_updater_1.autoUpdater.on('update-available', (ev, info) => {
        console.log('updates available');
    });
    electron_updater_1.autoUpdater.on('update-not-available', (ev, info) => {
        console.log('updates not available');
    });
    electron_updater_1.autoUpdater.on('error', (ev, err) => {
        console.log('error on updates');
    });
    electron_updater_1.autoUpdater.on('download-progress', (ev, progressObj) => {
        console.log('download in progress');
    });
    electron_updater_1.autoUpdater.checkForUpdates();
    electron_updater_1.autoUpdater.on('update-downloaded', (ev, info) => {
        // Wait 5 seconds, then quit and install
        // In your application, you don't need to wait 5 seconds.
        // You could call autoUpdater.quitAndInstall(); immediately
        setTimeout(function () {
            electron_updater_1.autoUpdater.quitAndInstall();
        }, 5000);
    });
}
exports.checkForUpdates = checkForUpdates;
