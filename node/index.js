"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const auto_updater_1 = require("./auto-updater");
const file_system_1 = require("./file-system");
let mainWindow;
let server = new server_1.SocketServer(4300, mainWindow);
file_system_1.fileSystemOperations();
auto_updater_1.checkForUpdates();
