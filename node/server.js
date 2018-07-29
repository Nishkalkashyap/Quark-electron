"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = __importDefault(require("socket.io"));
const http_1 = __importDefault(require("http"));
const five = __importStar(require("johnny-five"));
const events_1 = require("events");
const performance_now_1 = __importDefault(require("performance-now"));
exports.mainWindow = null;
let board;
const globalEval = (1, eval);
var closure = new Object();
class SocketServer {
    constructor(port, browserWindow) {
        this.port = port;
        this.browserWindow = browserWindow;
        this.events = new events_1.EventEmitter();
        exports.mainWindow = browserWindow;
        this.httpServer = new http_1.default.Server();
        this.httpServer.on('error', () => {
        });
        this.httpServer.on('listening', () => {
        });
        this.httpServer.listen(4300);
        this.socketServer();
    }
    socketServer() {
        let io = socket_io_1.default(this.httpServer);
        io.on('connection', (socket) => {
            console.log(`New Connection at ${socket.id}`);
            socket.emit('connected');
            socket.on('initialize', (globalJavascript, dataArray) => {
                this.initialize(globalJavascript, dataArray);
            });
            socket.on('connect-to-board', () => {
                console.log('Connecting to board');
                this.connect_to_board();
            });
            socket.on('firmata', (state, variable) => {
                let a = performance_now_1.default() * 1000;
                closure[`func_${variable}`](state);
                let b = performance_now_1.default() * 1000;
                console.log((b - a).toFixed(3));
            });
        });
    }
    connect_to_board() {
        board = new five.Board({
            port: "COM3",
            repl: false
        });
        board.on('ready', () => {
            console.log('ready');
        });
        board.on('error', () => {
            console.log('Error on board');
        });
    }
    initialize(globalJavascript, dataArray) {
        closure = new Object();
        let components = JSON.parse(globalJavascript).components;
        console.log(components);
        console.log('Initializing');
        components.map((val, index) => {
            switch (val.component) {
                case "Led":
                    try {
                        let newVariable = `this.${val.variable}`;
                        let find = new RegExp(val.variable, 'g');
                        let code = dataArray[index].code.replace(find, newVariable);
                        closure[`${val.variable}`] = new five.Led(val.data.pin);
                        closure[`func_${val.variable}`] = new Function('state', code);
                    }
                    catch (err) {
                        console.log("Error On Switch", err);
                    }
                    break;
                default:
                    break;
            }
        });
    }
}
exports.SocketServer = SocketServer;
