"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
function createDialog(browserWindow) {
    console.log(browserWindow);
    electron_1.dialog.showOpenDialog(browserWindow, {
        title: 'Hello World'
    });
}
exports.createDialog = createDialog;
