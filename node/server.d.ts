/// <reference types="node" />
import http from 'http';
import { BrowserWindow } from 'electron';
import { EventEmitter } from 'events';
export declare let mainWindow: any;
export declare class SocketServer {
    private port;
    private browserWindow;
    httpServer: http.Server;
    events: EventEmitter;
    constructor(port: number, browserWindow?: BrowserWindow);
    socketServer(): void;
    connect_to_board(): void;
    initialize(globalJavascript: string, dataArray: Array<{
        variable: string;
        code: string;
    }>): void;
}
