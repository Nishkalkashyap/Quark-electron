"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const { ipcMain } = require('electron');
function fileSystemOperations() {
    ipcMain.on('save-file', (event, path, data) => {
        console.log(path, data);
        fs_1.default.writeFile(path, data, (err) => {
            event.sender.send('save-file', err);
        });
    });
    ipcMain.on('open-file', (event, path) => {
        console.log(path);
        fs_1.default.readFile(path, 'utf8', (err, data) => {
            console.log(err, data);
            event.sender.send('open-file', err, data);
        });
    });
}
exports.fileSystemOperations = fileSystemOperations;
exports.fileSystem = fs_1.default;
