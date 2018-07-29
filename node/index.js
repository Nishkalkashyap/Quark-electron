"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
let mainWindow;
let server = new server_1.SocketServer(4300, mainWindow);
// console.log(server);
