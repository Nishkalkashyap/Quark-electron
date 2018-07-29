"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const electron_1 = require("electron");
const ip = __importStar(require("ip"));
exports.menuTemplateDev = [{
        label: 'Options',
        submenu: [{
                label: 'Open Dev Tools',
                click() {
                    server_1.mainWindow.openDevTools();
                },
            },],
    }, {
        label: 'View',
        submenu: [{
                label: 'View IP Address',
                click() {
                    electron_1.dialog.showMessageBox(server_1.mainWindow, {
                        title: 'IP Address',
                        message: `${ip.address()}`
                    });
                }
            }]
    }];
