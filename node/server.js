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
const performance_now_1 = __importDefault(require("performance-now"));
const usb_detect_1 = require("./usb-detect");
const event_emitter_1 = require("./event-emitter");
exports.mainWindow = null;
let board;
// const globalEval = (1, eval);
class SocketServer {
    constructor(port, browserWindow) {
        this.port = port;
        this.browserWindow = browserWindow;
        this.closure = new Object();
        this.rendererInterval = setInterval(() => {
            console.log('Interval Set');
        }, 1000);
        clearInterval(this.rendererInterval);
        exports.mainWindow = browserWindow;
        this.httpServer = new http_1.default.Server();
        this.httpServer.on('error', () => {
        });
        this.httpServer.on('listening', () => {
        });
        this.httpServer.listen(4300);
        this.socketServer();
        event_emitter_1.eventEmitter.on('usb-detect : server : usb-event', () => {
            clearInterval(this.rendererInterval);
        });
    }
    socketServer() {
        this.io = socket_io_1.default(this.httpServer);
        usb_detect_1.usbEvents(this.io);
        this.io.on('connection', (_socket) => {
            console.log(`New Connection at ${_socket.id}`);
            _socket.emit('connected');
            _socket.on('initialize', (globalJavascript, dataArray) => {
                try {
                    this.initialize(globalJavascript, dataArray);
                }
                catch (err) {
                    console.log(err);
                }
            });
            _socket.on('connect-to-board', () => {
                console.log('Connecting to board');
                try {
                    this.connect_to_board();
                }
                catch (err) {
                    console.log(err);
                }
            });
            _socket.on('firmata', (functionName, args) => {
                try {
                    let a = performance_now_1.default() * 1000;
                    this.closure[functionName](args);
                    let b = performance_now_1.default() * 1000;
                    console.log((b - a).toFixed(3));
                }
                catch (err) {
                    console.log(err);
                }
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
    initialize(_global_config_js, dataArray) {
        this.closure = new Object();
        clearInterval(this.rendererInterval);
        let global_config_js = JSON.parse(_global_config_js);
        let components = global_config_js.components;
        let global_variables = global_config_js.global_variables;
        let renderer_update_interval = global_config_js.renderer_update_interval;
        let renderedVariables = global_config_js.rendered_views;
        renderedVariables.map((val) => {
            this.closure[`${val.variable}`] = {};
        });
        this.initializeJohnnyComponents(components);
        dataArray.map((val) => {
            this.closure[val.functionName] = new Function('args', val.code);
        });
        global_variables.map((val) => {
            if (typeof val == 'string') {
                this.closure[`${val}`] = '';
            }
            else if (typeof val == 'object') {
                let obj = val;
                this.closure[`${obj.variable}`] = obj.initialize;
            }
        });
        if (renderer_update_interval == undefined || renderer_update_interval < 1000) {
            this.rendererInterval = setInterval(() => {
                this.io.emit('update-renderer', this.closure);
            }, 1000);
            console.log(1000);
        }
        else {
            this.rendererInterval = setInterval(() => {
                this.io.emit('update-renderer', this.closure);
            }, renderer_update_interval);
            console.log(renderer_update_interval);
        }
    }
    initializeJohnnyComponents(components) {
        components.map((val) => {
            switch (val.class) {
                case 'Accelerometer':
                    this.closure[`${val.variable}`] = new five.Accelerometer(val.arguments);
                    break;
                case 'Altimeter':
                    this.closure[`${val.variable}`] = new five.Altimeter(val.arguments);
                    break;
                case 'Altimeter':
                    this.closure[`${val.variable}`] = new five.Animation(val.arguments);
                    break;
                case 'Barometer':
                    // this.closure[`${val.variable}`] = new five.Barometer(val.arguments);
                    break;
                case 'Board':
                    this.closure[`${val.variable}`] = new five.Board(val.arguments);
                    break;
                case 'Boards':
                    // this.closure[`${val.variable}`] = new five.Boards(val.arguments);
                    break;
                case 'Button':
                    this.closure[`${val.variable}`] = new five.Button(val.arguments);
                    break;
                case 'Compass':
                    this.closure[`${val.variable}`] = new five.Compass(val.arguments);
                    break;
                case 'ESC':
                    this.closure[`${val.variable}`] = new five.ESC(val.arguments);
                    break;
                case 'Expander':
                    // this.closure[`${val.variable}`] = new five.Expander(val.arguments);
                    break;
                case 'ESC':
                    // this.closure[`${val.variable}`] = new five.Fn(val.arguments);
                    break;
                case 'GPS':
                    // this.closure[`${val.variable}`] = new five.GPS(val.arguments);
                    break;
                case 'Gyro':
                    this.closure[`${val.variable}`] = new five.Gyro(val.arguments);
                    break;
                case 'Hygrometer':
                    this.closure[`${val.variable}`] = new five.Hygrometer(val.arguments);
                    break;
                case 'IMU':
                    this.closure[`${val.variable}`] = new five.IMU(val.arguments);
                    break;
                case 'IR.Reflect.Array':
                    this.closure[`${val.variable}`] = new five.IR.Reflect.Array(val.arguments);
                    break;
                case 'Joystick':
                    this.closure[`${val.variable}`] = new five.Joystick(val.arguments);
                    break;
                case 'Keypad':
                    // this.closure[`${val.variable}`] = new five.Keypad(val.arguments);
                    break;
                case 'LCD':
                    this.closure[`${val.variable}`] = new five.LCD(val.arguments);
                    break;
                case 'Led':
                    this.closure[`${val.variable}`] = new five.Led(val.arguments);
                    break;
                case 'Led.Digits':
                    this.closure[`${val.variable}`] = new five.Led.Digits(val.arguments);
                    break;
                case 'Led.Matrix':
                    this.closure[`${val.variable}`] = new five.Led.Matrix(val.arguments);
                    break;
                case 'Led.RGB':
                    this.closure[`${val.variable}`] = new five.Led.RGB(val.arguments);
                    break;
                case 'Leds':
                    this.closure[`${val.variable}`] = new five.Led(val.arguments);
                    break;
                default:
                    break;
            }
        });
    }
}
exports.SocketServer = SocketServer;
