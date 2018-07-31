"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const usb = __importStar(require("usb"));
const serialport_1 = __importDefault(require("serialport"));
const event_emitter_1 = require("./event-emitter");
function usbEvents(io) {
    // let broadcastAddress = io.of('/');
    usb.on('attach', () => {
        event_emitter_1.eventEmitter.emit('usb-detect : server : usb-event');
        serialport_1.default.list().then((list) => {
            io.emit('com-port-list', list);
        }).catch((err) => {
            io.emit('com-port-error', err);
        });
    });
    usb.on('detach', () => {
        event_emitter_1.eventEmitter.emit('usb-detect : server : usb-event');
        serialport_1.default.list().then((list) => {
            io.emit('com-port-list', list);
        }).catch((err) => {
            io.emit('com-port-error', err);
        });
    });
}
exports.usbEvents = usbEvents;
