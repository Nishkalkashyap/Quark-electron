/// <reference types="node" />
/// <reference types="socket.io" />
import socketIo from 'socket.io';
import http from 'http';
import { BrowserWindow } from 'electron';
export declare let mainWindow: any;
export declare class SocketServer {
    private port;
    private browserWindow;
    httpServer: http.Server;
    io: socketIo.Server;
    closure: Object;
    rendererInterval: NodeJS.Timer;
    constructor(port: number, browserWindow?: BrowserWindow);
    socketServer(): void;
    connect_to_board(): void;
    initialize(_global_config_js: string, dataArray: Array<{
        functionName: string;
        code: string;
    }>): void;
    initializeJohnnyComponents(components: any): void;
}
