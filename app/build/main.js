webpackJsonp([4],{

/***/ 152:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = addGlobalVariablesFromDump;
/* harmony export (immutable) */ __webpack_exports__["a"] = addCSSFromDump;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return logger; });
/* harmony export (immutable) */ __webpack_exports__["b"] = addClassFromDump;
function addGlobalVariablesFromDump(_this) {
    var defaults = JSON.parse(_this.global_config.defaultSettings.getValue());
    for (var _i = 0, _a = Object.keys(defaults.styles.theme); _i < _a.length; _i++) {
        var color = _a[_i];
        for (var _b = 0, _c = Object.keys(defaults.styles.theme[color]); _b < _c.length; _b++) {
            var type = _c[_b];
            _this.document.documentElement.style.setProperty("--" + color + "-color-" + type, defaults.styles.theme[color][type]);
            // console.log(`--${color}-color-${type}`, defaults.styles.theme[color][type]);
        }
    }
}
function addCSSFromDump(data) {
    try {
        var prevStyle = document.getElementById("style-" + data.config.id);
        prevStyle.parentNode.removeChild(prevStyle);
    }
    catch (err) {
        null;
    }
    var edit = String().concat("}", data.code.css.getValue());
    edit = edit.replace(/}/g, "}." + data.config.css_class + " ");
    edit = edit.slice(1, edit.length - data.config.css_class.length - 2);
    var style = document.createElement('style');
    style.setAttribute('id', "style-" + data.config.id);
    style.innerHTML = edit;
    document.body.appendChild(style);
}
var logger = {
    data: [],
    log: function (message, indent, fullColor) {
        logger.data.push({ message: message, indent: indent, type: 'log', fullColor: fullColor, timestamp: indent ? 1 : Date.now() });
    },
    warn: function (message, indent, fullColor) {
        logger.data.push({ message: message, indent: indent, type: 'warn', fullColor: fullColor, timestamp: indent ? 1 : Date.now() });
    },
    error: function (message, indent, fullColor) {
        logger.data.push({ message: message, indent: indent, type: 'error', fullColor: fullColor, timestamp: indent ? 1 : Date.now() });
    },
    right: function (message, indent, fullColor) {
        logger.data.push({ message: message, indent: indent, type: 'right', fullColor: fullColor, timestamp: indent ? 1 : Date.now() });
    },
    indent: function (message, indent, fullColor) {
        logger.data.push({ message: message, indent: indent, type: 'indent', fullColor: fullColor, timestamp: indent ? 1 : Date.now() });
    }
};
function addClassFromDump(component, globalConfigJS) {
    // let json: globalConfigInterface["js"] = JSON.parse(globalConfigJS.getValue());
    // switch (component.class) {
    //     case 'Accelerometer':
    //         json.components.push(five_Accelerometer);
    //         break;
    //     case 'Altimeter':
    //         json.components.push(five_Altimeter);
    //         break;
    //     case 'Animation':
    //         json.components.push(five_Animation);
    //         break;
    //     case 'Barometer':
    //         json.components.push(five_Barometer);
    //         break;
    //     case 'Board':
    //         json.components.push(five_Board);
    //         break;
    //     case 'Boards':
    //         json.components.push(five_Boards);
    //         break;
    //     case 'Button':
    //         json.components.push(five_Button);
    //         break;
    //     case 'Compass':
    //         json.components.push(five_Compass);
    //         break;
    //     case 'ESC':
    //         json.components.push(five_ESC);
    //         break;
    //     case 'ESCs':
    //         json.components.push(five_ESCs);
    //         break;
    //     case 'Expander':
    //         json.components.push(five_Expander);
    //         break;
    //     case 'Fn':
    //         json.components.push(five_Fn);
    //         break;
    //     case 'GPS':
    //         json.components.push(five_GPS);
    //         break;
    //     case 'Gyro':
    //         json.components.push(five_Gyro);
    //         break;
    //     case 'Hygrometer':
    //         json.components.push(five_Hygrometer);
    //         break;
    //     case 'IMU':
    //         json.components.push(five_IMU);
    //         break;
    //     case 'IR.Reflect.Array':
    //         json.components.push(five_IR_Reflect_Array);
    //         break;
    //     case 'Joystick':
    //         json.components.push(five_Joystick);
    //         break;
    //     case 'Keypad':
    //         json.components.push(five_Keypad);
    //         break;
    //     case 'LCD':
    //         json.components.push(five_LCD);
    //         break;
    //     case 'Led':
    //         json.components.push(five_Led);
    //         break;
    //     case 'Led.Digits':
    //         json.components.push(five_LedDotDigits);
    //         break;
    //     case 'Led.Matrix':
    //         json.components.push(five_LedDotMatrix);
    //         break;
    //     case 'Led.RGB':
    //         json.components.push(five_LedDotRGB);
    //         break;
    //     case 'Leds':
    //         json.components.push(five_Leds);
    //         break;
    //     case 'Light':
    //         json.components.push(five_Light);
    //         break;
    //     case 'Motion':
    //         json.components.push(five_Motion);
    //         break;
    //     case 'Motor':
    //         json.components.push(five_Motor);
    //         break;
    //     case 'Motors':
    //         json.components.push(five_Motors);
    //         break;
    //     case 'Multi':
    //         json.components.push(five_Multi);
    //         break;
    //     case 'Piezo':
    //         json.components.push(five_Piezo);
    //         break;
    //     case 'Pin':
    //         json.components.push(five_Pin);
    //         break;
    //     case 'Proximity':
    //         json.components.push(five_Proximity);
    //         break;
    //     case 'Relay':
    //         json.components.push(five_Relay);
    //         break;
    //     case 'Relays':
    //         json.components.push(five_Relays);
    //         break;
    //     case 'Sensor':
    //         json.components.push(five_Sensor);
    //         break;
    //     case 'Servo':
    //         json.components.push(five_Servo);
    //         break;
    //     case 'Servos':
    //         json.components.push(five_Servos);
    //         break;
    //     case 'ShiftRegister':
    //         json.components.push(five_ShiftRegister);
    //         break;
    //     case 'Stepper':
    //         json.components.push(five_Stepper);
    //         break;
    //     case 'Switch':
    //         json.components.push(five_Switch);
    //         break;
    //     case 'Thermometer':
    //         json.components.push(five_Thermometer);
    //         break;
    //     default:
    //         break;
    // }
    // globalConfigJS.setValue(js_beautify(JSON.stringify(json), { indent_size: 2 }));
}
//# sourceMappingURL=global-service-dump.js.map

/***/ }),

/***/ 162:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["d"] = showSaveDialogFromDump;
/* harmony export (immutable) */ __webpack_exports__["b"] = saveFileFromDump;
/* harmony export (immutable) */ __webpack_exports__["c"] = showOpenDialogFromDump;
/* harmony export (immutable) */ __webpack_exports__["a"] = openFileFromDump;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__global_service_global_service_dump__ = __webpack_require__(152);

function showSaveDialogFromDump(_this) {
    var timestamp = new Date(Date.now());
    var string = "Quark-" + timestamp.getDate() + "-" + timestamp.getMonth() + "-" + timestamp.getFullYear();
    _this.dialog.showSaveDialog(_this.BrowserWindow.fromWebContents(_this.currentWebContents), {
        title: 'Save Dashboard',
        defaultPath: string + ".qrk",
        filters: [{
                extensions: ['qrk'],
                name: 'Quark'
            }]
    }, function (filePath) {
        saveFileFromDump(_this, filePath);
    });
}
function saveFileFromDump(_this, filePath, fileName, fileData) {
    var self = _this;
    makeDirectory();
    function makeDirectory() {
        if (filePath) {
            __WEBPACK_IMPORTED_MODULE_0__global_service_global_service_dump__["d" /* logger */].right("Saving file at : " + filePath, 40);
            var parse = self.Path.parse(filePath);
            var exists = self.fs.existsSync(parse.dir + "\\" + parse.name);
            console.log('Exists', exists);
            if (exists) {
                makeFile();
            }
            else {
                self.fs.mkdir(parse.dir + "\\" + parse.name, function (err) {
                    makeDirectoryErrorHandle(err);
                });
            }
        }
        else {
            __WEBPACK_IMPORTED_MODULE_0__global_service_global_service_dump__["d" /* logger */].warn('Operation canceled by user', 40);
        }
    }
    function makeDirectoryErrorHandle(err) {
        if (err) {
            self.showAlert('error', "" + err.name, "" + err.message, ['Close']);
            return;
        }
        else {
            makeFile();
        }
    }
    function makeFile() {
        var parse = self.Path.parse(filePath);
        if (fileName) {
            self.fs.writeFile(parse.dir + "\\" + parse.name + "\\" + fileName, fileData, function (err) {
                filwWriteErrorHandle(err, parse);
            });
        }
        else {
            self.fs.writeFile(parse.dir + "\\" + parse.name + "\\" + parse.name + ".qrk", JSON.stringify(self.gsp.getQuarkFile()), function (err) {
                filwWriteErrorHandle(err, parse);
            });
        }
    }
    function filwWriteErrorHandle(err, parse) {
        if (err) {
            self.showAlert('error', "Error : " + err.name, "" + err.message, ['Close']);
            return;
        }
        else {
            if (!fileName) {
                self.gsp.electronConfig.parsedPath = self.Path.parse(parse.dir + "\\" + parse.name + "\\" + parse.name + ".qrk");
                _this.events.publish('electron-service-dump : menu-bar && console : run-zone');
                setRecentDocumentsStorageFromDump(self, parse.dir + "\\" + parse.name + "\\" + parse.name + ".qrk");
                __WEBPACK_IMPORTED_MODULE_0__global_service_global_service_dump__["d" /* logger */].right("File saved at : " + self.gsp.electronConfig.parsedPath.dir, 40);
            }
            else {
                if (fileName == 'package.json') {
                    self.runNpmInstall();
                }
            }
        }
    }
}
function showOpenDialogFromDump(_this) {
    _this.dialog.showOpenDialog(_this.BrowserWindow.fromWebContents(_this.currentWebContents), {
        filters: [{
                extensions: ['qrk'],
                name: 'Quark'
            }],
        properties: ['openFile']
    }, function (filePath) {
        if (filePath) {
            openFileFromDump(filePath[0], _this);
        }
    });
}
function openFileFromDump(filePath, _this, isOpeningNewWindow) {
    var self = _this;
    readFile(filePath);
    function readFile(filePath) {
        if (filePath) {
            self.fs.readFile(filePath, 'utf8', function (err, data) {
                callbackHandle(err, data);
            });
        }
    }
    function callbackHandle(err, data) {
        if (err) {
            deleteRecentDocumentsStorageFromDump(self, filePath);
            if (isOpeningNewWindow) {
                self.showAlert('error', err.name, err.message, ['Close'])
                    .then(function () {
                    self.BrowserWindow.fromWebContents(self.currentWebContents).close();
                })
                    .catch(function () {
                    self.BrowserWindow.fromWebContents(self.currentWebContents).close();
                });
            }
            else {
                self.showAlert('error', err.name, err.message, ['Close']);
            }
        }
        else {
            self.gsp.parseQuarkFile(data)
                .then(function () {
                self.BrowserWindow.fromWebContents(_this.currentWebContents).show();
                _this.currentWebContents.openDevTools();
                _this.app.setBadgeCount(_this.BrowserWindow.getAllWindows().length);
                var parse = _this.Path.parse(filePath);
                self.gsp.electronConfig.parsedPath = self.Path.parse(parse.dir + "\\" + parse.name + ".qrk");
                setRecentDocumentsStorageFromDump(self, parse.dir + "\\" + parse.name + ".qrk");
                _this.events.publish('electron-service-dump : menu-bar && console : run-zone');
            })
                .catch(function () {
                if (isOpeningNewWindow) {
                    self.showAlert('error', err.name, err.message, ['Close'])
                        .then(function () {
                        self.BrowserWindow.fromWebContents(self.currentWebContents).close();
                    })
                        .catch(function () {
                        self.BrowserWindow.fromWebContents(self.currentWebContents).close();
                    });
                }
                else {
                    __WEBPACK_IMPORTED_MODULE_0__global_service_global_service_dump__["d" /* logger */].error('Failed parsing file. The file may be corrupt!', null, true);
                    self.showAlert('error', 'Operation Failed', 'Failed to parse file', ['Close']);
                }
            });
        }
    }
}
function setRecentDocumentsStorageFromDump(_this, filePath) {
    var recentDocuments = window.localStorage.getItem('recentDocuments');
    if (recentDocuments) {
        var parse = JSON.parse(recentDocuments);
        var filter = parse.filter(function (val) {
            if (val == filePath) {
                return val;
            }
        });
        if (filter.length == 0) {
            parse.push(filePath);
            window.localStorage.setItem('recentDocuments', JSON.stringify(parse));
        }
        _this.openRecentDocumentsArray = [];
        _this.openRecentDocumentsArray = parse.map(function (val) {
            var parse = _this.Path.parse(val);
            return { name: parse.name, path: val };
        });
        console.log('Recent docs exist', parse);
    }
    else {
        window.localStorage.setItem('recentDocuments', JSON.stringify([filePath]));
        console.log('Recent docs do not exist', [filePath]);
    }
}
function deleteRecentDocumentsStorageFromDump(_this, filePath) {
    var filterIndex = null;
    var docs = JSON.parse(window.localStorage.getItem('recentDocuments'));
    docs.filter(function (val, index) {
        if (val == filePath) {
            filterIndex = index;
        }
    });
    docs.splice(filterIndex, 1);
    window.localStorage.setItem('recentDocuments', JSON.stringify(docs));
    _this.openRecentDocumentsArray = [];
    _this.openRecentDocumentsArray = docs.map(function (val) {
        var parse = _this.Path.parse(val);
        return { name: parse.name, path: val };
    });
    console.log(_this.openRecentDocumentsArray);
}
//# sourceMappingURL=electron-service-assets-save&&open.js.map

/***/ }),

/***/ 203:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 203;

/***/ }),

/***/ 245:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/connect-mobile/connect-mobile.module": [
		805,
		3
	],
	"../pages/designer/designer.module": [
		808,
		0
	],
	"../pages/landing/landing.module": [
		806,
		2
	],
	"../pages/menu/menu.module": [
		807,
		1
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 245;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 246:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MtrToggleComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utilities_code_samples__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_codemirror__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_codemirror___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_codemirror__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_js_beautify__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_js_beautify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_js_beautify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_global_service_global_service__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var MtrToggleComponent = /** @class */ (function () {
    function MtrToggleComponent(events, gsp) {
        this.events = events;
        this.gsp = gsp;
        this.id = Date.now();
        this.component = this;
        this.data = {
            config: {
                id: this.id,
                component: 'MtrToggleComponent',
                css_class: "mtr-toggle-" + this.id,
                function: "Mtr_Toggle_" + this.id,
                variable: "mtr_toggle_" + this.id
            },
            code: {
                js: new __WEBPACK_IMPORTED_MODULE_3_codemirror___default.a.Doc('', 'javascript'),
                css: new __WEBPACK_IMPORTED_MODULE_3_codemirror___default.a.Doc(Object(__WEBPACK_IMPORTED_MODULE_4_js_beautify__["css_beautify"])(__WEBPACK_IMPORTED_MODULE_2__utilities_code_samples__["e" /* code_toggle */].css, { indent_size: 2 }), 'css'),
            }
        };
    }
    MtrToggleComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.initialize();
        this.events.publish('misc-components : global-service : add-component', this);
        this.events.subscribe('socket-service : misc-components : update-renderer', function (closure) {
        });
        this.events.subscribe('page-designer : misc-components : initialize', function () {
            _this.onInitialize();
        });
    };
    MtrToggleComponent.prototype.ngOnDestroy = function () {
        this.events.unsubscribe('socket-service : misc-components : update-renderer');
        this.events.unsubscribe('page-designer : misc-components : initialize');
    };
    MtrToggleComponent.prototype.change = function (event) {
        var state = event.value;
        this.events.publish('misc-components : socket-service : firmata', this.data.config.function, [state]);
    };
    MtrToggleComponent.prototype.onInitialize = function () {
        var _this = this;
        var config = JSON.parse(this.gsp.global_config.json.getValue());
        var my_rendered_view = config.rendered_views.filter(function (val) {
            return val.id == _this.data.config.id;
        });
    };
    MtrToggleComponent.prototype.initialize = function () {
        this.gsp.addCSS(this.data);
    };
    MtrToggleComponent.prototype.openTab = function (tab) {
        this.events.publish('misc-components : global-service : add-tab', tab);
    };
    MtrToggleComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'mtr-toggle',template:/*ion-inline-start:"G:\ionic\Project\quark\src\components\mtr-toggle\mtr-toggle.html"*/'<div [id]="id" [class]="data.config.css_class">\n\n  <div class="hover toggle-container">\n\n    <hover [component]="component" (clickEvent)="openTab($event)"></hover>\n\n    <ion-toggle (ionChange)="change($event)"></ion-toggle>\n\n    <!-- <p [innerHTML]="data.config.object"></p> -->\n\n  </div>\n\n</div>\n\n'/*ion-inline-end:"G:\ionic\Project\quark\src\components\mtr-toggle\mtr-toggle.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */], __WEBPACK_IMPORTED_MODULE_5__providers_global_service_global_service__["a" /* GlobalServiceProvider */]])
    ], MtrToggleComponent);
    return MtrToggleComponent;
}());

//# sourceMappingURL=mtr-toggle.js.map

/***/ }),

/***/ 25:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GlobalServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utilities_code_samples__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_codemirror__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_codemirror___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_codemirror__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_js_beautify__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_js_beautify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_js_beautify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__global_service_dump__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser__ = __webpack_require__(38);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};







var GlobalServiceProvider = /** @class */ (function () {
    function GlobalServiceProvider(events, document) {
        this.events = events;
        this.document = document;
        this.global_config = {
            json: new __WEBPACK_IMPORTED_MODULE_3_codemirror___default.a.Doc(Object(__WEBPACK_IMPORTED_MODULE_4_js_beautify__["js_beautify"])(JSON.stringify(__WEBPACK_IMPORTED_MODULE_1__utilities_code_samples__["f" /* firmata_config */].js), { indent_size: 2 }), 'application/ld+json'),
            css: new __WEBPACK_IMPORTED_MODULE_3_codemirror___default.a.Doc(Object(__WEBPACK_IMPORTED_MODULE_4_js_beautify__["css_beautify"])(__WEBPACK_IMPORTED_MODULE_1__utilities_code_samples__["f" /* firmata_config */].css, { indent_size: 2 }), 'css'),
            code: new __WEBPACK_IMPORTED_MODULE_3_codemirror___default.a.Doc(Object(__WEBPACK_IMPORTED_MODULE_4_js_beautify__["js_beautify"])(__WEBPACK_IMPORTED_MODULE_1__utilities_code_samples__["f" /* firmata_config */].code, { indent_size: 2 }), 'javascript'),
            defaultSettings: new __WEBPACK_IMPORTED_MODULE_3_codemirror___default.a.Doc(Object(__WEBPACK_IMPORTED_MODULE_4_js_beautify__["js_beautify"])(JSON.stringify(__WEBPACK_IMPORTED_MODULE_1__utilities_code_samples__["g" /* globalSettings */]), { indent_size: 2 }), 'application/ld+json'),
            projectSettings: new __WEBPACK_IMPORTED_MODULE_3_codemirror___default.a.Doc(Object(__WEBPACK_IMPORTED_MODULE_4_js_beautify__["js_beautify"])('{  }'), 'application/ld+json'),
            userSettings: new __WEBPACK_IMPORTED_MODULE_3_codemirror___default.a.Doc(Object(__WEBPACK_IMPORTED_MODULE_4_js_beautify__["js_beautify"])('{  }'), 'application/ld+json'),
        };
        this.tabsArray = [];
        this.currentTab = {
            other: "globalConfigJSON",
            mode: "JSON"
        };
        this.designerComponents = [];
        this.comPortList = [];
        this.consoleData = {
            top: -200,
            data: __WEBPACK_IMPORTED_MODULE_5__global_service_dump__["d" /* logger */].data
        };
        this.electronConfig = {
            parsedPath: null,
            quarkFile: this.getQuarkFile()
        };
        this.showLoading = false;
        this.appEvents();
        Object(__WEBPACK_IMPORTED_MODULE_5__global_service_dump__["c" /* addGlobalVariablesFromDump */])(this);
        __WEBPACK_IMPORTED_MODULE_5__global_service_dump__["d" /* logger */].log('Initializing Global Service');
    }
    GlobalServiceProvider.prototype.appEvents = function () {
        var _this = this;
        this.events.subscribe('misc-components : global-service : add-component', function (component) {
            var flag = _this.designerComponents.filter(function (val) { return val.data.config.id == component.data.config.id; });
            if (flag.length == 0) {
                _this.designerComponents.push(component);
                var data = component.data;
                var json = JSON.parse(_this.global_config.json.getValue());
                json.rendered_views.push({ component: data.config.component, id: data.config.id, variable: data.config.variable });
                _this.global_config.json.setValue(Object(__WEBPACK_IMPORTED_MODULE_4_js_beautify__["js_beautify"])(JSON.stringify(json), { indent_size: 2 }));
            }
        });
        this.events.subscribe('misc-components : global-service : add-tab', function (tab) {
            var data = tab.component.data;
            var newArray = _this.tabsArray.find(function (val) {
                if (val.component != undefined) {
                    return val.component.data.config.id == data.config.id && val.mode == tab.mode;
                }
            });
            if (newArray == undefined) {
                _this.tabsArray.push(tab);
                console.log(_this.tabsArray);
            }
        });
        this.events.subscribe('activity-bar : global-service : add-tab', function (tab) {
            var newArray = _this.tabsArray.find(function (val) {
                if (val.other != undefined) {
                    return val.other == tab.other && val.mode == tab.mode;
                }
            });
            if (newArray == undefined) {
                switch (tab.other) {
                    case "globalConfigJSON":
                        _this.tabsArray.push({ mode: "JSON", other: "globalConfigJSON" });
                        break;
                    case "globalConfigCSS":
                        _this.tabsArray.push({ mode: "CSS", other: "globalConfigCSS" });
                        break;
                    case "globalConfigSetup":
                        _this.tabsArray.push({ mode: "Javascript", other: "globalConfigSetup" });
                        break;
                    case "globalConfigDefaultSettings":
                        _this.tabsArray.push({ mode: "JSON", other: "globalConfigDefaultSettings" });
                        break;
                    default:
                        console.log("No tab");
                        break;
                }
            }
        });
        this.events.subscribe('page-menu : global-service : add-class', function (component) {
            Object(__WEBPACK_IMPORTED_MODULE_5__global_service_dump__["b" /* addClassFromDump */])(component, _this.global_config.json);
        });
        this.events.subscribe('page-designer : global-service : update-settings', function () {
            console.log(_this.global_config.projectSettings.getValue());
        });
    };
    GlobalServiceProvider.prototype.getQuarkFile = function () {
        var file = {
            globalConfig: {
                js: this.global_config.json.getValue(),
                css: this.global_config.css.getValue(),
                code: this.global_config.code.getValue(),
                styles: this.global_config.defaultSettings.getValue()
            },
            designerComponents: this.designerComponents.map(function (val) {
                var data = val.data;
                var dataSub = {};
                dataSub.config = Object.assign({}, data.config);
                dataSub.localData = Object.assign({}, data.localData);
                dataSub.code = {};
                dataSub.code.js = data.code.js.getValue();
                dataSub.code.css = data.code.css.getValue();
                return JSON.stringify(dataSub);
            })
        };
        return file;
    };
    GlobalServiceProvider.prototype.parseQuarkFile = function (file) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var newDesignerComponents = [];
            try {
                var parse = JSON.parse(file);
                _this.global_config.json = new __WEBPACK_IMPORTED_MODULE_3_codemirror___default.a.Doc(Object(__WEBPACK_IMPORTED_MODULE_4_js_beautify__["js_beautify"])(parse.globalConfig.js, { indent_size: 2 }), 'application/ld+json');
                _this.global_config.css = new __WEBPACK_IMPORTED_MODULE_3_codemirror___default.a.Doc(Object(__WEBPACK_IMPORTED_MODULE_4_js_beautify__["css_beautify"])(parse.globalConfig.css, { indent_size: 2 }), 'css');
                _this.global_config.code = new __WEBPACK_IMPORTED_MODULE_3_codemirror___default.a.Doc(Object(__WEBPACK_IMPORTED_MODULE_4_js_beautify__["js_beautify"])(parse.globalConfig.code, { indent_size: 2 }), 'javascript');
                _this.global_config.defaultSettings = new __WEBPACK_IMPORTED_MODULE_3_codemirror___default.a.Doc(Object(__WEBPACK_IMPORTED_MODULE_4_js_beautify__["js_beautify"])(parse.global_config.styles, { indent_size: 2 }), 'application/ld+json');
                if (parse.designerComponents.length > 0) {
                    parse.designerComponents.forEach(function (data, index) {
                        newDesignerComponents[index] = {};
                        newDesignerComponents[index].data = {};
                        newDesignerComponents[index].data = JSON.parse(data);
                        newDesignerComponents[index].data.code = {};
                        newDesignerComponents[index].data.code.js = new __WEBPACK_IMPORTED_MODULE_3_codemirror___default.a.Doc(Object(__WEBPACK_IMPORTED_MODULE_4_js_beautify__["js_beautify"])(JSON.parse(data).code.js, { indent_size: 2 }), 'javascript');
                        newDesignerComponents[index].data.code.css = new __WEBPACK_IMPORTED_MODULE_3_codemirror___default.a.Doc(Object(__WEBPACK_IMPORTED_MODULE_4_js_beautify__["css_beautify"])(JSON.parse(data).code.css, { indent_size: 2 }), 'css');
                    });
                }
                _this.designerComponents = [];
                _this.designerComponents = newDesignerComponents;
                _this.events.publish('global-service : page-designer && page-code-mirror : recreate-designer-components');
                resolve();
            }
            catch (err) {
                reject(err);
            }
        });
    };
    GlobalServiceProvider.prototype.addCSS = function (data) {
        Object(__WEBPACK_IMPORTED_MODULE_5__global_service_dump__["a" /* addCSSFromDump */])(data);
    };
    GlobalServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_6__angular_platform_browser__["b" /* DOCUMENT */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* Events */], Document])
    ], GlobalServiceProvider);
    return GlobalServiceProvider;
}());

//# sourceMappingURL=global-service.js.map

/***/ }),

/***/ 263:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createNewFileFromDump;
/* harmony export (immutable) */ __webpack_exports__["c"] = newWindowHandleFromDump;
/* harmony export (immutable) */ __webpack_exports__["e"] = showSnackBarFromDump;
/* harmony export (immutable) */ __webpack_exports__["b"] = createNewWindowFromDump;
/* harmony export (immutable) */ __webpack_exports__["d"] = showAlertFromDump;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_my_dashboards_my_dashboards__ = __webpack_require__(264);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_new_file_dialog_new_file_dialog__ = __webpack_require__(266);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__electron_service_assets_save_open__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utilities_code_samples__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_js_beautify__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_js_beautify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_js_beautify__);





function createNewFileFromDump(_this) {
    var timestamp = new Date(Date.now());
    var string = "Quark-" + timestamp.getDate() + "-" + timestamp.getMonth() + "-" + timestamp.getFullYear();
    _this.dialog.showSaveDialog(_this.BrowserWindow.fromWebContents(_this.currentWebContents), {
        title: 'Save Dashboard',
        defaultPath: string + ".qrk",
        filters: [{
                extensions: ['qrk'],
                name: 'Quark'
            }]
    }, function (filePath) {
        Object(__WEBPACK_IMPORTED_MODULE_2__electron_service_assets_save_open__["b" /* saveFileFromDump */])(_this, filePath);
        Object(__WEBPACK_IMPORTED_MODULE_2__electron_service_assets_save_open__["b" /* saveFileFromDump */])(_this, filePath, 'package.json', Object(__WEBPACK_IMPORTED_MODULE_4_js_beautify__["js_beautify"])(JSON.stringify(__WEBPACK_IMPORTED_MODULE_3__utilities_code_samples__["h" /* packageJSON */])));
    });
}
function newWindowHandleFromDump(_this) {
    if ("" + _this.mainProcess.env.PATH_TO_OPEN_IN_NEW_WINDOW.length == '0') {
        _this.BrowserWindow.fromWebContents(_this.currentWebContents).show();
        _this.currentWebContents.openDevTools();
    }
    else {
        var path = _this.mainProcess.env.PATH_TO_OPEN_IN_NEW_WINDOW;
        _this.mainProcess.env.PATH_TO_OPEN_IN_NEW_WINDOW = "";
        Object(__WEBPACK_IMPORTED_MODULE_2__electron_service_assets_save_open__["a" /* openFileFromDump */])(path, _this, true);
        console.log("Total Browser Windows", _this.BrowserWindow.length);
    }
}
;
function showSnackBarFromDump(_this, component) {
    var config = {
        horizontalPosition: 'right',
        panelClass: "mtr-" + component + "-component-snack-bar",
        announcementMessage: "Hello"
    };
    if (component == 'my-dashboards') {
        _this.snackBarRef = _this.snackBar.openFromComponent(__WEBPACK_IMPORTED_MODULE_0__components_my_dashboards_my_dashboards__["a" /* MyDashboardsComponent */], config);
    }
    else {
        _this.snackBarRef = _this.snackBar.openFromComponent(__WEBPACK_IMPORTED_MODULE_1__components_new_file_dialog_new_file_dialog__["a" /* NewFileDialogComponent */], config);
    }
}
function createNewWindowFromDump(_this, filePath) {
    _this.mainProcess.env.PATH_TO_OPEN_IN_NEW_WINDOW = "" + filePath;
    var newWindow = new _this.BrowserWindow({
        height: 600,
        width: 800,
        show: false,
        frame: false
    });
    newWindow.loadURL("http://localhost:8100");
}
function showAlertFromDump(_this, type, title, message, buttons, resolve) {
    _this.dialog.showMessageBox(_this.BrowserWindow.fromWebContents(_this.currentWebContents), {
        type: type,
        title: title,
        message: message,
        buttons: buttons
    }, function (response) {
        resolve(response);
    });
}
//# sourceMappingURL=electron-service-dump.js.map

/***/ }),

/***/ 264:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyDashboardsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_authentication_service_authentication_service__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(20);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var MyDashboardsComponent = /** @class */ (function () {
    function MyDashboardsComponent(asp, changeDetector, events) {
        var _this = this;
        this.asp = asp;
        this.changeDetector = changeDetector;
        this.events = events;
        this.dashboardsList = [];
        this.showLoading = true;
        this.dashboardsList = this.asp.userDashboards.getValue();
        this.asp.userDashboards.subscribe(function (dashboards) {
            _this.dashboardsList = dashboards;
            if (_this.dashboardsList != null) {
                _this.showLoading = false;
            }
            console.log(_this.showLoading);
            _this.changeDetector.markForCheck();
        });
        if (this.dashboardsList == null) {
            this.asp.getDashboards();
        }
        else {
            this.showLoading = false;
        }
    }
    MyDashboardsComponent.prototype.closeSnackBar = function () {
        this.events.publish('component-new-file-dialog && component-my-dashboards : electron-service : close-snackbar');
    };
    MyDashboardsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'my-dashboards',template:/*ion-inline-start:"G:\ionic\Project\quark\src\components\my-dashboards\my-dashboards.html"*/'<div class="page-template page-template-elementor_canvas page page-id-315 woocommerce-js elementor-default elementor-template-canvas elementor-page elementor-page-315"\n\n  data-elementor-device-mode="mobile">\n\n  <div class="elementor elementor-315">\n\n    <div class="elementor-inner">\n\n      <div class="elementor-section-wrap">\n\n        <section data-id="738514d" class="elementor-element elementor-element-738514d elementor-section-stretched elementor-section-full_width elementor-section-height-default elementor-section-height-default elementor-section-content-middle elementor-section elementor-top-section"\n\n          data-settings="{&quot;background_background&quot;:&quot;classic&quot;}" data-element_type="section" style="width: 100%; left: 0px;">\n\n          <div class="elementor-container elementor-column-gap-narrow">\n\n            <div class="elementor-row">\n\n              <div data-id="95b4c92" class="elementor-element elementor-element-95b4c92 mtr-my-dashboards-heading elementor-column elementor-col-50 elementor-top-column"\n\n                data-element_type="column">\n\n                <div class="elementor-column-wrap elementor-element-populated">\n\n                  <div class="elementor-widget-wrap">\n\n                    <div data-id="9a37315" class="elementor-element elementor-element-9a37315 elementor-headline--style-rotate elementor-widget elementor-widget-animated-headline"\n\n                      data-settings="{&quot;headline_style&quot;:&quot;rotate&quot;,&quot;animation_type&quot;:&quot;flip&quot;,&quot;rotating_text&quot;:&quot;Dashboards&quot;}"\n\n                      data-element_type="animated-headline.default">\n\n                      <div class="elementor-widget-container">\n\n                        <h1 class="elementor-headline elementor-headline-animation-type-flip">\n\n                          <span class="elementor-headline-plain-text elementor-headline-text-wrapper">Your</span>\n\n                          <span class="elementor-headline-dynamic-wrapper elementor-headline-text-wrapper" style="width: 102px;">\n\n                            <span class="elementor-headline-dynamic-text elementor-headline-text-active">Dashboards</span>\n\n                          </span>\n\n                        </h1>\n\n                      </div>\n\n                    </div>\n\n                  </div>\n\n                </div>\n\n              </div>\n\n              <div data-id="4044663" class="elementor-element elementor-element-4044663 mtr-my-dashboards-button elementor-column elementor-col-50 elementor-top-column"\n\n                data-element_type="column">\n\n                <div class="elementor-column-wrap elementor-element-populated">\n\n                  <div class="elementor-widget-wrap">\n\n                    <div data-id="2e06d36" class="elementor-element elementor-element-2e06d36 elementor-align-right elementor-widget elementor-widget-button"\n\n                      data-element_type="button.default">\n\n                      <div tappable (click)="closeSnackBar()" class="elementor-widget-container">\n\n                        <div class="elementor-button-wrapper">\n\n                          <a class="elementor-button elementor-size-xs" role="button">\n\n                            <span class="elementor-button-content-wrapper">\n\n                              <span class="elementor-button-text">Dismiss</span>\n\n                            </span>\n\n                          </a>\n\n                        </div>\n\n                      </div>\n\n                    </div>\n\n                  </div>\n\n                </div>\n\n              </div>\n\n            </div>\n\n          </div>\n\n        </section>\n\n        <ng-template [ngIf]="!showLoading">\n\n          <section *ngIf="!showLoading" data-id="1552e98" class="content-section elementor-element elementor-element-1552e98 elementor-section-stretched elementor-section-full_width elementor-section-height-default elementor-section-height-default elementor-section-content-middle elementor-section elementor-top-section"\n\n            data-element_type="section" style="width: 100%; left: 0px;">\n\n            <div *ngFor="let dashboard of dashboardsList" class="elementor-container elementor-column-gap-narrow">\n\n              <div class="elementor-row">\n\n                <div data-id="8abb3ca" class="elementor-element elementor-element-8abb3ca elementor-column elementor-col-50 elementor-top-column"\n\n                  data-element_type="column">\n\n                  <div class="elementor-column-wrap elementor-element-populated">\n\n                    <div class="elementor-widget-wrap">\n\n                      <div data-id="a61feb7" class="elementor-element elementor-element-a61feb7 elementor-widget elementor-widget-text-editor"\n\n                        data-element_type="text-editor.default">\n\n                        <div class="elementor-widget-container">\n\n                          <div class="elementor-text-editor elementor-clearfix">\n\n                            <p>Your dashboards</p>\n\n                          </div>\n\n                        </div>\n\n                      </div>\n\n                    </div>\n\n                  </div>\n\n                </div>\n\n                <div data-id="f9378f5" class="elementor-element elementor-element-f9378f5 elementor-column elementor-col-50 elementor-top-column"\n\n                  data-element_type="column">\n\n                  <div class="elementor-column-wrap elementor-element-populated">\n\n                    <div class="elementor-widget-wrap">\n\n                      <div data-id="18536c7" class="elementor-element elementor-element-18536c7 elementor-align-right elementor-widget elementor-widget-icon-list"\n\n                        data-element_type="icon-list.default">\n\n                        <div class="elementor-widget-container">\n\n                          <ul class="elementor-icon-list-items elementor-inline-items">\n\n                            <li class="elementor-icon-list-item">\n\n                              <span class="elementor-icon-list-icon">\n\n                                <i class="fa fa-folder-open" aria-hidden="true"></i>\n\n                              </span>\n\n                              <span class="elementor-icon-list-text"></span>\n\n                            </li>\n\n                            <li class="elementor-icon-list-item">\n\n                              <span class="elementor-icon-list-icon">\n\n                                <i class="fa fa-check" aria-hidden="true"></i>\n\n                              </span>\n\n                              <span class="elementor-icon-list-text"></span>\n\n                            </li>\n\n                            <li class="elementor-icon-list-item">\n\n                              <span class="elementor-icon-list-icon">\n\n                                <i class="fa fa-trash" aria-hidden="true"></i>\n\n                              </span>\n\n                              <span class="elementor-icon-list-text"></span>\n\n                            </li>\n\n                          </ul>\n\n                        </div>\n\n                      </div>\n\n                    </div>\n\n                  </div>\n\n                </div>\n\n              </div>\n\n            </div>\n\n          </section>\n\n        </ng-template>\n\n        <ng-template [ngIf]="showLoading">\n\n          <mat-spinner mode="Indeterminate"></mat-spinner>\n\n        </ng-template>\n\n      </div>\n\n    </div>\n\n  </div>\n\n</div>'/*ion-inline-end:"G:\ionic\Project\quark\src\components\my-dashboards\my-dashboards.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__providers_authentication_service_authentication_service__["a" /* AuthenticationServiceProvider */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* Events */]])
    ], MyDashboardsComponent);
    return MyDashboardsComponent;
}());

//# sourceMappingURL=my-dashboards.js.map

/***/ }),

/***/ 266:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewFileDialogComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_observable_of__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_observable_of__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var NewFileDialogComponent = /** @class */ (function () {
    function NewFileDialogComponent(events, zone) {
        this.events = events;
        this.zone = zone;
        this.autocompleteDeps = ['serialport', 'johnny-five', 'cylonjs', 'firmatajs'];
        this.autocompleteDevDeps = ['serialport', 'johnny-five', 'cylonjs', 'firmatajs'];
        this.dependencies = [];
        this.devDependencies = [];
        this.editDependencies = [];
        this.editDevDependencies = [];
        this.npmInstall = false;
    }
    NewFileDialogComponent.prototype.editTab = function () {
        var _this = this;
        this.zone.run(function () {
            _this.editDependencies = _this.findAndEdit(_this.dependencies, _this.editDependencies);
            _this.editDevDependencies = _this.findAndEdit(_this.devDependencies, _this.editDevDependencies);
        });
    };
    NewFileDialogComponent.prototype.findAndEdit = function (copyFrom, copyTo) {
        var temp = copyTo;
        copyTo = [];
        copyFrom.map(function (val) {
            var find = temp.find(function (dep) {
                return dep.name == val;
            });
            if (find) {
                copyTo.push(find);
            }
            else {
                copyTo.push({ name: val, version: null });
            }
        });
        return copyTo;
    };
    NewFileDialogComponent.prototype.closeDialog = function () {
        this.events.publish('component-new-file-dialog && component-my-dashboards : electron-service : close-snackbar');
    };
    NewFileDialogComponent.prototype.saveJSON = function () {
        var data = [];
        data[0] = this.editDependencies;
        data[1] = this.editDevDependencies;
        this.events.publish('component-new-file-dialog : electron-service : create-new-file', data);
        this.events.publish('component-new-file-dialog && component-my-dashboards : electron-service : close-snackbar');
    };
    NewFileDialogComponent.prototype.transform = function (value) {
        var item = { display: "@" + value, value: "@" + value };
        return Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_observable_of__["of"])(item);
    };
    NewFileDialogComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'new-file-dialog',template:/*ion-inline-start:"G:\ionic\Project\quark\src\components\new-file-dialog\new-file-dialog.html"*/'<div class="form-container">\n\n  <mat-tab-group mat-stretch-tabs>\n\n    <mat-tab label="Dependencies">\n\n      <div class="dependencies-container">\n\n        <div class="dependencies">\n\n          <p>Dependencies</p>\n\n          <!-- <tag-input [(ngModel)]="dependencies" [dragZone]="\'zone1\'" [modelAsStrings]="true" [theme]="\'dark\'" [addOnBlur]="true"\n\n                [separatorKeyCodes]="[32, 188]" (onAdd)="editTab()" (onRemove)="editTab()">\n\n                <tag-input-dropdown [focusFirstElement]="true" [autocompleteItems]="autocompleteDeps">\n\n                </tag-input-dropdown>\n\n              </tag-input> -->\n\n          <tag-input [(ngModel)]="dependencies" [secondaryPlaceholder]="\'Add your dependencies here\'" [placeholder]="\'Add dep\'" (onAdd)="editTab()" (onRemove)="editTab()">\n\n            <tag-input-dropdown class="tag-input-dropdown" [focusFirstElement]="true" [autocompleteItems]="autocompleteDeps">\n\n            </tag-input-dropdown>\n\n          </tag-input>\n\n        </div>\n\n        <div class="dev-dependencies">\n\n          <p>Dev Dependencies</p>\n\n          <tag-input [(ngModel)]="devDependencies" [secondaryPlaceholder]="\'Add your dev dependencies here\'" [placeholder]="\'Add dev\'" (onAdd)="editTab()" (onRemove)="editTab()">\n\n            <tag-input-dropdown class="tag-input-dropdown" [focusFirstElement]="true" [autocompleteItems]="autocompleteDevDeps">\n\n            </tag-input-dropdown>\n\n          </tag-input>\n\n        </div>\n\n      </div>\n\n    </mat-tab>\n\n    <mat-tab label="Edit">\n\n      <div class="edit-container">\n\n        <div class="dependencies">\n\n          <p>Dependencies</p>\n\n          <div class="item" *ngFor="let item of editDependencies;let i=index">\n\n            <span class="item-name">{{item.name}}</span>\n\n            <tag-input [(ngModel)]="editDependencies[i].version" [onAdding]="transform" [secondaryPlaceholder]="\'Add Version\'" [maxItems]="\'1\'"\n\n              (onAdd)="editTab()" (onRemove)="editTab()"></tag-input>\n\n          </div>\n\n        </div>\n\n        <div class="dev-dependencies">\n\n          <p>Dev Dependencies</p>\n\n          <div class="item" *ngFor="let item of editDevDependencies;let i=index">\n\n            <span class="item-name">{{item.name}}</span>\n\n            <tag-input [(ngModel)]="editDevDependencies[i].version" [onAdding]="transform" [secondaryPlaceholder]="\'Add Version\'" [maxItems]="\'1\'"\n\n              (onAdd)="editTab()" (onRemove)="editTab()"></tag-input>\n\n          </div>\n\n        </div>\n\n      </div>\n\n    </mat-tab>\n\n  </mat-tab-group>\n\n  <div class="button-container">\n\n    <mat-checkbox [(ngModel)]="npmInstall">Install Now (npm install)</mat-checkbox>\n\n    <button ion-button outline color="secondary" (click)="closeDialog()" class="button-cancel">Cancel</button>\n\n    <button ion-button color="secondary" (click)="saveJSON()" class="button-done">Done</button>\n\n  </div>\n\n</div>\n\n'/*ion-inline-end:"G:\ionic\Project\quark\src\components\new-file-dialog\new-file-dialog.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"]])
    ], NewFileDialogComponent);
    return NewFileDialogComponent;
}());

//# sourceMappingURL=new-file-dialog.js.map

/***/ }),

/***/ 267:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MtrButtonComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_codemirror__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_codemirror___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_codemirror__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_js_beautify__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_js_beautify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_js_beautify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utilities_code_samples__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_global_service_global_service__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(20);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var MtrButtonComponent = /** @class */ (function () {
    function MtrButtonComponent(events, gsp, zone) {
        this.events = events;
        this.gsp = gsp;
        this.zone = zone;
        this.id = Date.now();
        this.component = this;
        this.data = {
            config: {
                id: this.id,
                component: 'MtrButtonComponent',
                css_class: "mtr-button-" + this.id,
                function: "Mtr_Button_" + this.id,
                variable: "mtr_button_" + this.id
            },
            code: {
                js: new __WEBPACK_IMPORTED_MODULE_1_codemirror___default.a.Doc('', 'javascript'),
                css: new __WEBPACK_IMPORTED_MODULE_1_codemirror___default.a.Doc(Object(__WEBPACK_IMPORTED_MODULE_2_js_beautify__["css_beautify"])(__WEBPACK_IMPORTED_MODULE_3__utilities_code_samples__["c" /* code_button */].css, { indent_size: 2 }), 'css'),
            },
            localData: {}
        };
    }
    MtrButtonComponent.prototype.change = function () {
        var data = {
            functionName: this.data.config.function,
            args: this.data.localData
        };
        this.events.publish('misc-components : electron-service : child-process', data);
    };
    MtrButtonComponent.prototype.ngAfterContentInit = function () {
        var data = {
            content: this.data.config.variable,
            color: '#000000',
        };
        this.data.localData = data;
    };
    MtrButtonComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.gsp.addCSS(this.data);
        this.events.publish('misc-components : global-service : add-component', this);
        this.events.subscribe('electron-service-dump : misc-components : update-renderer', function (data) {
            _this.zone.run(function () {
                _this.data.localData = data[_this.data.config.variable];
            });
        });
    };
    MtrButtonComponent.prototype.ngOnDestroy = function () {
        this.events.unsubscribe('electron-service : misc-components : update-renderer');
    };
    MtrButtonComponent.prototype.openTab = function (tab) {
        this.events.publish('misc-components : global-service : add-tab', tab);
    };
    MtrButtonComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'mtr-button',template:/*ion-inline-start:"G:\ionic\Project\quark\src\components\mtr-button\mtr-button.html"*/'<div [id]="id" [class]="data.config.css_class">\n\n  <div class="hover button-container">\n\n    <hover [component]="component" (clickEvent)="openTab($event)"></hover>\n\n    <button ion-button (click)="change($event)" [innerText]="data.localData.content" [color]="data.localData.color" [disabled]="data.localData.disabled"\n\n      [block]="data.localData.block" [clear]="data.localData.clear" [default]="data.localData.default" [full]="data.localData.full"></button>\n\n  </div>\n\n</div>\n\n'/*ion-inline-end:"G:\ionic\Project\quark\src\components\mtr-button\mtr-button.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5_ionic_angular__["b" /* Events */], __WEBPACK_IMPORTED_MODULE_4__providers_global_service_global_service__["a" /* GlobalServiceProvider */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"]])
    ], MtrButtonComponent);
    return MtrButtonComponent;
}());

//# sourceMappingURL=mtr-button.js.map

/***/ }),

/***/ 268:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MtrRangeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_codemirror__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_codemirror___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_codemirror__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_js_beautify__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_js_beautify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_js_beautify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utilities_code_samples__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_global_service_global_service__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(20);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var MtrRangeComponent = /** @class */ (function () {
    function MtrRangeComponent(events, gsp) {
        this.events = events;
        this.gsp = gsp;
        this.id = Date.now();
        this.component = this;
        this.data = {
            config: {
                id: this.id,
                component: 'MtrRangeComponent',
                css_class: "mtr-range-" + this.id,
                function: "Mtr_Range_" + this.id,
                variable: "mtr_range_" + this.id
            },
            code: {
                js: new __WEBPACK_IMPORTED_MODULE_1_codemirror___default.a.Doc('', 'javascript'),
                css: new __WEBPACK_IMPORTED_MODULE_1_codemirror___default.a.Doc(Object(__WEBPACK_IMPORTED_MODULE_2_js_beautify__["css_beautify"])(__WEBPACK_IMPORTED_MODULE_3__utilities_code_samples__["d" /* code_range */].css, { indent_size: 2 }), 'css'),
            }
        };
    }
    MtrRangeComponent.prototype.ngAfterViewInit = function () {
        this.gsp.addCSS(this.data);
        this.events.publish('misc-components : global-service : add-component', this);
    };
    MtrRangeComponent.prototype.change = function (event) {
        var state = event.value;
        console.log(event, state);
        this.events.publish('misc-components : socket-service : firmata', this.data.config.function, state);
    };
    MtrRangeComponent.prototype.openTab = function (tab) {
        this.events.publish('misc-components : global-service : add-tab', tab);
    };
    MtrRangeComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'mtr-range',template:/*ion-inline-start:"G:\ionic\Project\quark\src\components\mtr-range\mtr-range.html"*/'<div [id]="id" [class]="data.config.css_class">\n\n  <div class="hover button-container">\n\n    <hover [component]="component" (clickEvent)="openTab($event)"></hover>\n\n    <ion-range (ionChange)="change($event)">\n\n      <!-- <ion-icon range-left small name="sunny"></ion-icon>\n\n      <ion-icon range-right name="sunny"></ion-icon> -->\n\n    </ion-range>\n\n  </div>\n\n</div>\n\n'/*ion-inline-end:"G:\ionic\Project\quark\src\components\mtr-range\mtr-range.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5_ionic_angular__["b" /* Events */], __WEBPACK_IMPORTED_MODULE_4__providers_global_service_global_service__["a" /* GlobalServiceProvider */]])
    ], MtrRangeComponent);
    return MtrRangeComponent;
}());

//# sourceMappingURL=mtr-range.js.map

/***/ }),

/***/ 269:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CodeEditorComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_codemirror__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_codemirror___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_codemirror__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_js_beautify__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_js_beautify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_js_beautify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_jsonlint_mod__ = __webpack_require__(481);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_jsonlint_mod___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_jsonlint_mod__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__node_modules_codemirror_mode_javascript_javascript_js__ = __webpack_require__(482);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__node_modules_codemirror_mode_javascript_javascript_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__node_modules_codemirror_mode_javascript_javascript_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__node_modules_codemirror_mode_clike_clike_js__ = __webpack_require__(483);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__node_modules_codemirror_mode_clike_clike_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__node_modules_codemirror_mode_clike_clike_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__node_modules_codemirror_mode_css_css_js__ = __webpack_require__(270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__node_modules_codemirror_mode_css_css_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__node_modules_codemirror_mode_css_css_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__node_modules_codemirror_addon_comment_comment_js__ = __webpack_require__(484);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__node_modules_codemirror_addon_comment_comment_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__node_modules_codemirror_addon_comment_comment_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__node_modules_codemirror_addon_comment_continuecomment_js__ = __webpack_require__(485);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__node_modules_codemirror_addon_comment_continuecomment_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__node_modules_codemirror_addon_comment_continuecomment_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__node_modules_codemirror_addon_dialog_dialog_js__ = __webpack_require__(271);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__node_modules_codemirror_addon_dialog_dialog_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__node_modules_codemirror_addon_dialog_dialog_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__node_modules_codemirror_addon_edit_closebrackets_js__ = __webpack_require__(486);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__node_modules_codemirror_addon_edit_closebrackets_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10__node_modules_codemirror_addon_edit_closebrackets_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__node_modules_codemirror_addon_edit_matchbrackets_js__ = __webpack_require__(487);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__node_modules_codemirror_addon_edit_matchbrackets_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11__node_modules_codemirror_addon_edit_matchbrackets_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__node_modules_codemirror_addon_fold_foldcode_js__ = __webpack_require__(272);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__node_modules_codemirror_addon_fold_foldcode_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12__node_modules_codemirror_addon_fold_foldcode_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__node_modules_codemirror_addon_fold_brace_fold_js__ = __webpack_require__(488);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__node_modules_codemirror_addon_fold_brace_fold_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13__node_modules_codemirror_addon_fold_brace_fold_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__node_modules_codemirror_addon_fold_comment_fold_js__ = __webpack_require__(489);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__node_modules_codemirror_addon_fold_comment_fold_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14__node_modules_codemirror_addon_fold_comment_fold_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__node_modules_codemirror_addon_fold_indent_fold_js__ = __webpack_require__(490);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__node_modules_codemirror_addon_fold_indent_fold_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15__node_modules_codemirror_addon_fold_indent_fold_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__node_modules_codemirror_addon_fold_foldgutter_js__ = __webpack_require__(491);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__node_modules_codemirror_addon_fold_foldgutter_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_16__node_modules_codemirror_addon_fold_foldgutter_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__node_modules_codemirror_addon_hint_show_hint_js__ = __webpack_require__(492);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__node_modules_codemirror_addon_hint_show_hint_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_17__node_modules_codemirror_addon_hint_show_hint_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__node_modules_codemirror_addon_hint_anyword_hint_js__ = __webpack_require__(493);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__node_modules_codemirror_addon_hint_anyword_hint_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_18__node_modules_codemirror_addon_hint_anyword_hint_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__node_modules_codemirror_addon_hint_javascript_hint_js__ = __webpack_require__(494);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__node_modules_codemirror_addon_hint_javascript_hint_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_19__node_modules_codemirror_addon_hint_javascript_hint_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__node_modules_codemirror_addon_hint_css_hint_js__ = __webpack_require__(495);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__node_modules_codemirror_addon_hint_css_hint_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_20__node_modules_codemirror_addon_hint_css_hint_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__node_modules_codemirror_addon_lint_lint_js__ = __webpack_require__(496);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__node_modules_codemirror_addon_lint_lint_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_21__node_modules_codemirror_addon_lint_lint_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__node_modules_codemirror_addon_lint_json_lint_js__ = __webpack_require__(497);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__node_modules_codemirror_addon_lint_json_lint_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_22__node_modules_codemirror_addon_lint_json_lint_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__node_modules_codemirror_addon_lint_css_lint_js__ = __webpack_require__(498);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__node_modules_codemirror_addon_lint_css_lint_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_23__node_modules_codemirror_addon_lint_css_lint_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__node_modules_rxjs_Subject__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__node_modules_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_24__node_modules_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__angular_material__ = __webpack_require__(67);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};




window["jsonlint"] = __WEBPACK_IMPORTED_MODULE_3_jsonlint_mod___default.a;











 //nothing happens





// import './../../../node_modules/codemirror/addon/lint/javascript-lint.js';




// import './../../../node_modules/codemirror/addon/tern/tern.js';


var CodeEditorComponent = /** @class */ (function () {
    function CodeEditorComponent(data, change) {
        this.data = data;
        this.change = change;
        this.inputDocument = new __WEBPACK_IMPORTED_MODULE_24__node_modules_rxjs_Subject__["Subject"]();
        this.showInterface = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        var self = this;
        window.onresize = function () {
            self.editor.refresh();
        };
    }
    CodeEditorComponent.prototype.ngAfterContentChecked = function () {
        if (this.data != undefined) {
            this.document = this.data.inputDoc;
            this.mode = this.data.mode;
        }
    };
    CodeEditorComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (this.mode == "Javascript" || this.mode == "JSON") {
            this.createJSEditor();
        }
        else if (this.mode == "CSS") {
            this.createCSSEditor();
        }
        else if (this.mode == "Interface") {
            this.createInterfaceEditor();
            this.editorValue(this.document);
        }
        this.inputDocument.subscribe(function (val) {
            _this.document = val;
            _this.editorValue(_this.document);
            _this.change.markForCheck();
        });
        document.getElementsByClassName('CodeMirror')[0].addEventListener('wheel', function (event) {
            event.preventDefault();
            _this.editor.scrollTo(null, _this.editor.getScrollInfo().top + event.deltaY / 5);
        });
    };
    CodeEditorComponent.prototype.ngOnDestroy = function () {
        var fakeDoc1 = new __WEBPACK_IMPORTED_MODULE_1_codemirror___default.a.Doc('', 'javascript');
        this.editor.swapDoc(fakeDoc1);
        this.editor.toTextArea();
    };
    CodeEditorComponent.prototype.scrolled = function (event) {
        console.log(event);
    };
    CodeEditorComponent.prototype.createJSEditor = function () {
        this.editor = __WEBPACK_IMPORTED_MODULE_1_codemirror___default.a.fromTextArea(this.codemirror.nativeElement, {
            lineNumbers: true,
            // mode: this.component == undefined ? 'application/ld+json' : 'javascript',
            // mode: this.component == undefined ? 'application/json' : 'javascript',
            mode: this.mode == "Javascript" ? 'javascript' : 'application/ld+json',
            // mode: "text/x-objectivec",
            theme: 'material',
            foldGutter: true,
            gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter", "CodeMirror-lint-markers"],
            extraKeys: { "Ctrl-Space": "autocomplete" },
            lint: true,
        });
        this.editor.setOption('autoCloseBrackets', true);
        this.editor.setOption('matchBrackets', true);
        this.editor.setOption('continueComments', true);
        // let server = new CodeMirror["TernServer"]({ defs: [code] });
        // this.editor.setOption("extraKeys", {
        //   "Ctrl-Space": function (cm) { server.complete(cm); },
        //   "Ctrl-I": function (cm) { server.showType(cm); },
        //   "Ctrl-O": function (cm) { server.showDocs(cm); },
        //   "Alt-.": function (cm) { server.jumpToDef(cm); },
        //   "Alt-,": function (cm) { server.jumpBack(cm); },
        //   "Ctrl-Q": function (cm) { server.rename(cm); },
        //   "Ctrl-.": function (cm) { server.selectName(cm); }
        // });
        // this.editor.on("cursorActivity", (cm) => {
        //   server.updateArgHints(cm);
        // });
        // this.editor.on("change", (cm, obj) => {
        //   if (obj.text[0] == '.') {
        //     server.complete(cm);
        //   }
        // });
        // this.editor.on('blur', (cm) => {
        //   server.updateArgHints(cm);
        // });
    };
    CodeEditorComponent.prototype.createCSSEditor = function () {
        this.editor = __WEBPACK_IMPORTED_MODULE_1_codemirror___default.a.fromTextArea(this.codemirror.nativeElement, {
            lineNumbers: true,
            mode: "css",
            theme: 'material',
            foldGutter: true,
            gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter", "CodeMirror-lint-markers"],
            extraKeys: { "Ctrl-Space": "autocomplete" },
            lint: true
        });
        this.editor.setOption('autoCloseBrackets', true);
        this.editor.setOption('matchBrackets', true);
        this.editor.setOption('continueComments', true);
    };
    CodeEditorComponent.prototype.createInterfaceEditor = function () {
        this.editor = __WEBPACK_IMPORTED_MODULE_1_codemirror___default.a.fromTextArea(this.codemirror.nativeElement, {
            mode: "text/x-java",
            theme: 'material',
            readOnly: true,
            showCursorWhenSelecting: false,
            cursorBlinkRate: 100000,
        });
    };
    CodeEditorComponent.prototype.edit = function (event) {
        switch (event) {
            case 'Javascript':
                var codeJavascript = this.editor.getDoc();
                this.document.setValue(Object(__WEBPACK_IMPORTED_MODULE_2_js_beautify__["js_beautify"])(codeJavascript.getValue(), { indent_size: 2 }));
                break;
            case 'JSON':
                var codeJSON = this.editor.getDoc();
                this.document.setValue(Object(__WEBPACK_IMPORTED_MODULE_2_js_beautify__["js_beautify"])(codeJSON.getValue(), { indent_size: 2 }));
                break;
            case 'CSS':
                var codeCSS = this.editor.getDoc();
                this.document.setValue(Object(__WEBPACK_IMPORTED_MODULE_2_js_beautify__["css_beautify"])(codeCSS.getValue(), { indent_size: 2 }));
                break;
            case 'showInterface':
                this.showInterface.emit('');
                break;
            default:
                break;
        }
    };
    CodeEditorComponent.prototype.editorValue = function (doc) {
        this.editor.swapDoc(doc);
    };
    CodeEditorComponent.prototype.showContextMenu = function (event) {
        event.preventDefault();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_24__node_modules_rxjs_Subject__["Subject"])
    ], CodeEditorComponent.prototype, "inputDocument", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], CodeEditorComponent.prototype, "mode", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], CodeEditorComponent.prototype, "showInterface", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('codemirror'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], CodeEditorComponent.prototype, "codemirror", void 0);
    CodeEditorComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'code-editor',template:/*ion-inline-start:"G:\ionic\Project\quark\src\components\code-editor\code-editor.html"*/'<ng-template [ngIf]="mode !=\'Interface\'">\n\n  <codebar (code)="edit($event)" [mode]="mode"></codebar>\n\n</ng-template>\n\n\n\n<div class="editor-container" (contextmenu)="showContextMenu($event)" (scroll)="scrolled($event)">\n\n  <textarea #codemirror id="codemirror"></textarea>\n\n</div>\n\n'/*ion-inline-end:"G:\ionic\Project\quark\src\components\code-editor\code-editor.html"*/
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"])()), __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_25__angular_material__["a" /* MAT_SNACK_BAR_DATA */])),
        __metadata("design:paramtypes", [Object, __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"]])
    ], CodeEditorComponent);
    return CodeEditorComponent;
}());

//# sourceMappingURL=code-editor.js.map

/***/ }),

/***/ 273:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserPopOverComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_authentication_service_authentication_service__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_electron_service_electron_service__ = __webpack_require__(66);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var UserPopOverComponent = /** @class */ (function () {
    function UserPopOverComponent(asp, platform, esp) {
        var _this = this;
        this.asp = asp;
        this.platform = platform;
        this.esp = esp;
        this.hide = true;
        this.showProgressBar = false;
        this.email = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["l" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["l" /* Validators */].email]);
        this.password = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["l" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["l" /* Validators */].minLength(8)]);
        this.userData = this.asp.user.getValue();
        this.asp.user.subscribe(function (user) {
            _this.userData = user;
        });
    }
    UserPopOverComponent.prototype.logForm = function () {
        var _this = this;
        this.showProgressBar = true;
        this.asp.loginWithEmailAndPassword(this.email.value, this.password.value)
            .then(function () {
            _this.showProgressBar = false;
        })
            .catch(function () {
            _this.showProgressBar = false;
        });
    };
    UserPopOverComponent.prototype.registerUser = function () {
        if (this.platform.is('electron')) {
            this.esp.openExternalLink('https://link.diymechatronics.com');
        }
        else {
            window.open('https://link.diymechatronics.com');
        }
    };
    UserPopOverComponent.prototype.getErrorMessage = function () {
        return this.email.hasError('required') ? 'You must enter a value' :
            this.email.hasError('email') ? 'Not a valid email' :
                '';
    };
    UserPopOverComponent.prototype.getErrorMessagePassword = function () {
        return this.email.hasError('required') ? 'You must enter a value' :
            this.email.hasError('minlength') ? 'Minimum length must be 8 characters' :
                '';
    };
    UserPopOverComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'user-pop-over',template:/*ion-inline-start:"G:\ionic\Project\quark\src\components\user-pop-over\user-pop-over.html"*/'<div class="content">\n\n  <mat-progress-bar mode="indeterminate" *ngIf="showProgressBar"></mat-progress-bar>\n\n  <ion-grid *ngIf="userData!=null">\n\n    <ion-row>\n\n      <ion-col col-3 class="user-image-column">\n\n        <img [src]="userData?.photoURL" class="user-image">\n\n      </ion-col>\n\n      <ion-col col-9 class="user-metadata">\n\n        <div class="display-name">\n\n          {{userData?.displayName}}\n\n        </div>\n\n        <div class="email">\n\n          {{userData?.email}}\n\n        </div>\n\n      </ion-col>\n\n    </ion-row>\n\n    <ion-row>\n\n      <button ion-button (click)="this.asp.logoutUser()" block>Logout</button>\n\n    </ion-row>\n\n  </ion-grid>\n\n  <ng-template [ngIf]="userData == null">\n\n    <form (ngSubmit)="logForm()">\n\n      <mat-form-field appearance="outline">\n\n        <input matInput type="email" placeholder="Enter your email" [formControl]="email" autocomplete="email">\n\n        <mat-error *ngIf="email.invalid">{{getErrorMessage()}}</mat-error>\n\n      </mat-form-field>\n\n      <mat-form-field appearance="outline">\n\n        <input matInput [type]="hide ? \'password\' : \'text\'" placeholder="Enter your password" [formControl]="password" autocomplete="current-password">\n\n        <ion-icon matSuffix [name]="hide ? \'eye\' : \'eye-off\'" tappable (click)="hide = !hide"></ion-icon>\n\n        <mat-error *ngIf="password.invalid">{{getErrorMessagePassword()}}</mat-error>\n\n      </mat-form-field>\n\n      <button ion-button type="submit" [disabled]="email.invalid || password.invalid">Submit</button>\n\n    </form>\n\n    <button ion-button (click)="registerUser()">Register</button>\n\n  </ng-template>\n\n</div>\n\n'/*ion-inline-end:"G:\ionic\Project\quark\src\components\user-pop-over\user-pop-over.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__providers_authentication_service_authentication_service__["a" /* AuthenticationServiceProvider */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_4__providers_electron_service_electron_service__["a" /* ElectronServiceProvider */]])
    ], UserPopOverComponent);
    return UserPopOverComponent;
}());

//# sourceMappingURL=user-pop-over.js.map

/***/ }),

/***/ 398:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SocketServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__global_service_global_service__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SocketServiceProvider = /** @class */ (function () {
    function SocketServiceProvider(events, gsp) {
        this.events = events;
        this.gsp = gsp;
        this.appEvents();
    }
    SocketServiceProvider.prototype.connectToSocketServer = function (url) {
        console.log('Connecting');
        // this.socket = socketIo(`${url}:4300`);
        // this.socket.connect();
        // this.eventListeners();
    };
    SocketServiceProvider.prototype.eventListeners = function () {
        var _this = this;
        this.socket.on('connected', function () {
            console.log("Connected at " + _this.socket.id);
            _this.events.publish('socket-service : connect-mobile : connected');
        });
        this.socket.on('com-port-list', function (list) {
            _this.gsp.comPortList = list;
            console.log(list);
        });
        this.socket.on('com-port-error', function (err) {
            console.log(err);
        });
        this.socket.on('update-renderer', function (closure) {
            console.log(closure);
            _this.events.publish('socket-service : misc-components : update-renderer', closure);
        });
    };
    SocketServiceProvider.prototype.appEvents = function () {
        var _this = this;
        this.events.subscribe('page-designer : socket-service : initialize', function () {
            var code = _this.gsp.designerComponents.map(function (val) {
                var data = val.data;
                return { functionName: data.config.function, code: data.code.js.getValue() };
            });
            console.log(code);
            _this.socket.emit('initialize', _this.gsp.global_config.json.getValue(), code);
        });
        this.events.subscribe('page-designer : socket-service : connect-to-board', function () {
            _this.socket.emit('connect-to-board');
        });
        this.events.subscribe('misc-components : socket-service : firmata', function (functionName, args) {
            _this.gsp.currentTab.mode == 'CSS' ? null :
                _this.socket.emit('firmata', functionName, args);
        });
    };
    SocketServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */], __WEBPACK_IMPORTED_MODULE_2__global_service_global_service__["a" /* GlobalServiceProvider */]])
    ], SocketServiceProvider);
    return SocketServiceProvider;
}());

//# sourceMappingURL=socket-service.js.map

/***/ }),

/***/ 399:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComponentsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mtr_toggle_mtr_toggle__ = __webpack_require__(246);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__hover_hover__ = __webpack_require__(427);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__codebar_codebar__ = __webpack_require__(428);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__status_bar_status_bar__ = __webpack_require__(464);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__tabs_bar_tabs_bar__ = __webpack_require__(465);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__activity_bar_activity_bar__ = __webpack_require__(466);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__widgets_widgets__ = __webpack_require__(480);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__mtr_button_mtr_button__ = __webpack_require__(267);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__mtr_range_mtr_range__ = __webpack_require__(268);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__code_editor_code_editor__ = __webpack_require__(269);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__css_inspector_css_inspector__ = __webpack_require__(499);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__console_console__ = __webpack_require__(500);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__menu_bar_menu_bar__ = __webpack_require__(501);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__angular_material__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__user_pop_over_user_pop_over__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__my_dashboards_my_dashboards__ = __webpack_require__(264);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__new_file_dialog_new_file_dialog__ = __webpack_require__(266);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__terminal_terminal__ = __webpack_require__(502);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20_ngx_chips__ = __webpack_require__(507);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_code_mirror_code_mirror__ = __webpack_require__(516);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__settings_settings__ = __webpack_require__(517);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__monaco_editor_monaco_editor__ = __webpack_require__(776);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24_ngx_monaco_editor__ = __webpack_require__(353);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

























__WEBPACK_IMPORTED_MODULE_20_ngx_chips__["a" /* TagInputModule */].withDefaults({
    tagInput: {
        placeholder: 'Add a new tag',
        dragZone: 'zone1',
        theme: 'dark',
        addOnBlur: true,
        separatorKeyCodes: [32, 188],
        modelAsStrings: true
    }
});
var ComponentsModule = /** @class */ (function () {
    function ComponentsModule() {
    }
    ComponentsModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_1__mtr_toggle_mtr_toggle__["a" /* MtrToggleComponent */],
                __WEBPACK_IMPORTED_MODULE_3__hover_hover__["a" /* HoverComponent */],
                __WEBPACK_IMPORTED_MODULE_4__codebar_codebar__["a" /* CodebarComponent */],
                __WEBPACK_IMPORTED_MODULE_5__status_bar_status_bar__["a" /* StatusBarComponent */],
                __WEBPACK_IMPORTED_MODULE_6__tabs_bar_tabs_bar__["a" /* TabsBarComponent */],
                __WEBPACK_IMPORTED_MODULE_7__activity_bar_activity_bar__["a" /* ActivityBarComponent */],
                __WEBPACK_IMPORTED_MODULE_8__widgets_widgets__["a" /* WidgetsComponent */],
                __WEBPACK_IMPORTED_MODULE_9__mtr_button_mtr_button__["a" /* MtrButtonComponent */],
                __WEBPACK_IMPORTED_MODULE_10__mtr_range_mtr_range__["a" /* MtrRangeComponent */],
                __WEBPACK_IMPORTED_MODULE_11__code_editor_code_editor__["a" /* CodeEditorComponent */],
                __WEBPACK_IMPORTED_MODULE_12__css_inspector_css_inspector__["a" /* CssInspectorComponent */],
                __WEBPACK_IMPORTED_MODULE_13__console_console__["a" /* ConsoleComponent */],
                __WEBPACK_IMPORTED_MODULE_14__menu_bar_menu_bar__["a" /* MenuBarComponent */],
                __WEBPACK_IMPORTED_MODULE_16__user_pop_over_user_pop_over__["a" /* UserPopOverComponent */],
                __WEBPACK_IMPORTED_MODULE_17__my_dashboards_my_dashboards__["a" /* MyDashboardsComponent */],
                __WEBPACK_IMPORTED_MODULE_18__new_file_dialog_new_file_dialog__["a" /* NewFileDialogComponent */],
                __WEBPACK_IMPORTED_MODULE_19__terminal_terminal__["a" /* TerminalComponent */],
                __WEBPACK_IMPORTED_MODULE_21__pages_code_mirror_code_mirror__["a" /* CodeMirrorPage */],
                __WEBPACK_IMPORTED_MODULE_22__settings_settings__["a" /* SettingsComponent */],
                __WEBPACK_IMPORTED_MODULE_23__monaco_editor_monaco_editor__["a" /* MonacoEditorComponent */]
            ],
            imports: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */],
                __WEBPACK_IMPORTED_MODULE_15__angular_material__["o" /* MatTooltipModule */],
                __WEBPACK_IMPORTED_MODULE_15__angular_material__["h" /* MatMenuModule */],
                __WEBPACK_IMPORTED_MODULE_15__angular_material__["n" /* MatTabsModule */],
                __WEBPACK_IMPORTED_MODULE_15__angular_material__["l" /* MatSnackBarModule */],
                __WEBPACK_IMPORTED_MODULE_15__angular_material__["f" /* MatFormFieldModule */],
                __WEBPACK_IMPORTED_MODULE_15__angular_material__["g" /* MatInputModule */],
                __WEBPACK_IMPORTED_MODULE_15__angular_material__["i" /* MatProgressBarModule */],
                __WEBPACK_IMPORTED_MODULE_15__angular_material__["b" /* MatButtonModule */],
                __WEBPACK_IMPORTED_MODULE_15__angular_material__["e" /* MatDividerModule */],
                __WEBPACK_IMPORTED_MODULE_15__angular_material__["j" /* MatProgressSpinnerModule */],
                __WEBPACK_IMPORTED_MODULE_15__angular_material__["m" /* MatStepperModule */],
                __WEBPACK_IMPORTED_MODULE_15__angular_material__["d" /* MatDialogModule */],
                __WEBPACK_IMPORTED_MODULE_15__angular_material__["c" /* MatCheckboxModule */],
                __WEBPACK_IMPORTED_MODULE_20_ngx_chips__["a" /* TagInputModule */],
                __WEBPACK_IMPORTED_MODULE_24_ngx_monaco_editor__["a" /* MonacoEditorModule */].forRoot()
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_1__mtr_toggle_mtr_toggle__["a" /* MtrToggleComponent */],
                __WEBPACK_IMPORTED_MODULE_3__hover_hover__["a" /* HoverComponent */],
                __WEBPACK_IMPORTED_MODULE_4__codebar_codebar__["a" /* CodebarComponent */],
                __WEBPACK_IMPORTED_MODULE_5__status_bar_status_bar__["a" /* StatusBarComponent */],
                __WEBPACK_IMPORTED_MODULE_6__tabs_bar_tabs_bar__["a" /* TabsBarComponent */],
                __WEBPACK_IMPORTED_MODULE_7__activity_bar_activity_bar__["a" /* ActivityBarComponent */],
                __WEBPACK_IMPORTED_MODULE_8__widgets_widgets__["a" /* WidgetsComponent */],
                __WEBPACK_IMPORTED_MODULE_9__mtr_button_mtr_button__["a" /* MtrButtonComponent */],
                __WEBPACK_IMPORTED_MODULE_10__mtr_range_mtr_range__["a" /* MtrRangeComponent */],
                __WEBPACK_IMPORTED_MODULE_11__code_editor_code_editor__["a" /* CodeEditorComponent */],
                __WEBPACK_IMPORTED_MODULE_12__css_inspector_css_inspector__["a" /* CssInspectorComponent */],
                __WEBPACK_IMPORTED_MODULE_13__console_console__["a" /* ConsoleComponent */],
                __WEBPACK_IMPORTED_MODULE_14__menu_bar_menu_bar__["a" /* MenuBarComponent */],
                __WEBPACK_IMPORTED_MODULE_16__user_pop_over_user_pop_over__["a" /* UserPopOverComponent */],
                __WEBPACK_IMPORTED_MODULE_17__my_dashboards_my_dashboards__["a" /* MyDashboardsComponent */],
                __WEBPACK_IMPORTED_MODULE_18__new_file_dialog_new_file_dialog__["a" /* NewFileDialogComponent */],
                __WEBPACK_IMPORTED_MODULE_19__terminal_terminal__["a" /* TerminalComponent */],
                __WEBPACK_IMPORTED_MODULE_21__pages_code_mirror_code_mirror__["a" /* CodeMirrorPage */],
                __WEBPACK_IMPORTED_MODULE_22__settings_settings__["a" /* SettingsComponent */],
                __WEBPACK_IMPORTED_MODULE_23__monaco_editor_monaco_editor__["a" /* MonacoEditorComponent */]
            ],
            entryComponents: [__WEBPACK_IMPORTED_MODULE_1__mtr_toggle_mtr_toggle__["a" /* MtrToggleComponent */], __WEBPACK_IMPORTED_MODULE_9__mtr_button_mtr_button__["a" /* MtrButtonComponent */], __WEBPACK_IMPORTED_MODULE_10__mtr_range_mtr_range__["a" /* MtrRangeComponent */], __WEBPACK_IMPORTED_MODULE_11__code_editor_code_editor__["a" /* CodeEditorComponent */], __WEBPACK_IMPORTED_MODULE_16__user_pop_over_user_pop_over__["a" /* UserPopOverComponent */], __WEBPACK_IMPORTED_MODULE_17__my_dashboards_my_dashboards__["a" /* MyDashboardsComponent */], __WEBPACK_IMPORTED_MODULE_18__new_file_dialog_new_file_dialog__["a" /* NewFileDialogComponent */], __WEBPACK_IMPORTED_MODULE_19__terminal_terminal__["a" /* TerminalComponent */]]
        })
    ], ComponentsModule);
    return ComponentsModule;
}());

//# sourceMappingURL=components.module.js.map

/***/ }),

/***/ 400:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = addComponentFromDump;
/* harmony export (immutable) */ __webpack_exports__["c"] = recreateComponenFromDump;
/* harmony export (immutable) */ __webpack_exports__["b"] = addGlobalCSSFromDump;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_mtr_toggle_mtr_toggle__ = __webpack_require__(246);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_mtr_button_mtr_button__ = __webpack_require__(267);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_mtr_range_mtr_range__ = __webpack_require__(268);



function addComponentFromDump(_component, _container, _resolver) {
    var component;
    switch (_component.component) {
        case 'MtrToggleComponent':
            component = _resolver.resolveComponentFactory(__WEBPACK_IMPORTED_MODULE_0__components_mtr_toggle_mtr_toggle__["a" /* MtrToggleComponent */]);
            _container.createComponent(component);
            break;
        case 'MtrButtonComponent':
            component = _resolver.resolveComponentFactory(__WEBPACK_IMPORTED_MODULE_1__components_mtr_button_mtr_button__["a" /* MtrButtonComponent */]);
            _container.createComponent(component);
            break;
        case 'MtrRangeComponent':
            component = _resolver.resolveComponentFactory(__WEBPACK_IMPORTED_MODULE_2__components_mtr_range_mtr_range__["a" /* MtrRangeComponent */]);
            _container.createComponent(component);
            break;
        default:
            component = _resolver.resolveComponentFactory(__WEBPACK_IMPORTED_MODULE_0__components_mtr_toggle_mtr_toggle__["a" /* MtrToggleComponent */]);
            _container.createComponent(component);
            break;
    }
}
function recreateComponenFromDump(_component, _container, _resolver) {
    var component;
    var data = _component.data;
    switch (data.config.component) {
        case 'MtrToggleComponent':
            component = _resolver.resolveComponentFactory(__WEBPACK_IMPORTED_MODULE_0__components_mtr_toggle_mtr_toggle__["a" /* MtrToggleComponent */]);
            _container.createComponent(component).instance.data = _component.data;
            break;
        case 'MtrButtonComponent':
            component = _resolver.resolveComponentFactory(__WEBPACK_IMPORTED_MODULE_1__components_mtr_button_mtr_button__["a" /* MtrButtonComponent */]);
            _container.createComponent(component).instance.data = _component.data;
            break;
        case 'MtrRangeComponent':
            component = _resolver.resolveComponentFactory(__WEBPACK_IMPORTED_MODULE_2__components_mtr_range_mtr_range__["a" /* MtrRangeComponent */]);
            _container.createComponent(component).instance.data = _component.data;
            break;
        default:
            component = _resolver.resolveComponentFactory(__WEBPACK_IMPORTED_MODULE_0__components_mtr_toggle_mtr_toggle__["a" /* MtrToggleComponent */]);
            _container.createComponent(component);
            break;
    }
}
function addGlobalCSSFromDump(css) {
    try {
        var prevStyle = document.getElementById('style-page-designer');
        prevStyle.parentNode.removeChild(prevStyle);
    }
    catch (err) {
        null;
    }
    var edit = String().concat("}", css);
    edit = edit.replace(/}/g, "}.style-page-designer ");
    edit = edit.slice(1, edit.length - 21);
    var style = document.createElement('style');
    style.setAttribute('id', 'style-page-designer');
    style.innerHTML = edit;
    document.body.appendChild(style);
}
//# sourceMappingURL=render-components-dump.js.map

/***/ }),

/***/ 401:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(402);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(406);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 406:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(394);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(397);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(800);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_socket_service_socket_service__ = __webpack_require__(398);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_components_module__ = __webpack_require__(399);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_forms__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_global_service_global_service__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_electron_service_electron_service__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_platform_browser_animations__ = __webpack_require__(802);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_authentication_service_authentication_service__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_firebase_app__ = __webpack_require__(265);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_firebase_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__environments_environment__ = __webpack_require__(804);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_ngx_monaco_editor__ = __webpack_require__(353);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};















// import { TagInputModule } from "ngx-chips";
__WEBPACK_IMPORTED_MODULE_13_firebase_app___default.a.initializeApp(__WEBPACK_IMPORTED_MODULE_14__environments_environment__["a" /* fireconfig */]);

var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {
                    tabspageTransition: 'ios-transition',
                    menuType: 'push',
                    alertEnter: "alert-pop-in",
                    backButtonText: "Back",
                    pageTransition: "ios-transition",
                    toastEnter: "toast-slide-in",
                }, {
                    links: [
                        { loadChildren: '../pages/connect-mobile/connect-mobile.module#ConnectMobilePageModule', name: 'ConnectMobilePage', segment: 'connect-mobile', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/landing/landing.module#LandingPageModule', name: 'LandingPage', segment: 'landing', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/menu/menu.module#MenuPageModule', name: 'MenuPage', segment: 'menu', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/designer/designer.module#DesignerPageModule', name: 'DesignerPage', segment: 'designer', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_7__components_components_module__["a" /* ComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_8__angular_forms__["f" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_11__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_15_ngx_monaco_editor__["a" /* MonacoEditorModule */].forRoot()
                // TagInputModule
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_10__providers_electron_service_electron_service__["a" /* ElectronServiceProvider */],
                __WEBPACK_IMPORTED_MODULE_9__providers_global_service_global_service__["a" /* GlobalServiceProvider */],
                __WEBPACK_IMPORTED_MODULE_6__providers_socket_service_socket_service__["a" /* SocketServiceProvider */],
                __WEBPACK_IMPORTED_MODULE_12__providers_authentication_service_authentication_service__["a" /* AuthenticationServiceProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 427:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HoverComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HoverComponent = /** @class */ (function () {
    function HoverComponent(alertCtrl, navCtrl) {
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.clickEvent = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    HoverComponent.prototype.ngAfterViewInit = function () {
        this.data = this.component.data;
    };
    HoverComponent.prototype.code = function () {
        this.clickEvent.emit({
            component: this.component,
            mode: 'Javascript'
        });
    };
    HoverComponent.prototype.style = function () {
        this.clickEvent.emit({
            component: this.component,
            mode: 'CSS'
        });
    };
    HoverComponent.prototype.edit = function () {
        var _this = this;
        var alertOption = {
            title: 'Configure',
            message: 'If you ever get lost. Refer to the documentation.',
            inputs: [
                {
                    type: 'text',
                    name: 'variable',
                    value: this.data.config.variable,
                    placeholder: 'variable',
                    label: 'Variable'
                },
            ],
            buttons: [
                {
                    text: 'Save',
                    handler: function (data) {
                        var previousVariable = _this.data.config.variable;
                        _this.data.config.variable = data.variable;
                        // this.component.data = this.data;
                        // this.events.publish('hover : socket-service : update-component', this.component, previousVariable);
                    }
                },
                {
                    text: 'Cancel',
                    role: 'Cancel'
                }
            ]
        };
        this.alertCtrl.create(alertOption).present();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], HoverComponent.prototype, "component", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], HoverComponent.prototype, "clickEvent", void 0);
    HoverComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'hover',template:/*ion-inline-start:"G:\ionic\Project\quark\src\components\hover\hover.html"*/'<section class="page-template page-template-elementor_canvas page page-id-56 elementor-default elementor-template-canvas elementor-page elementor-page-56"\n\n  data-elementor-device-mode="mobile">\n\n  <div class="elementor elementor-56">\n\n    <div class="elementor-inner">\n\n      <div class="elementor-section-wrap">\n\n        <article data-id="88a4079" class="elementor-element elementor-element-88a4079 elementor-section-stretched elementor-section-full_width elementor-section-height-default elementor-section-height-default elementor-section-content-top elementor-section elementor-top-section"\n\n          data-element_type="section" style="width: 532px; left: 0px;">\n\n          <div class="elementor-container elementor-column-gap-no">\n\n            <div class="elementor-row">\n\n              <div data-id="4966539" class="elementor-element elementor-element-4966539 elementor-column elementor-col-100 elementor-top-column"\n\n                data-element_type="column">\n\n                <div class="elementor-column-wrap elementor-element-populated">\n\n                  <div class="elementor-widget-wrap">\n\n                    <div data-id="8b09b63" class="elementor-element elementor-element-8b09b63 elementor-align-left elementor-widget elementor-widget-icon-list"\n\n                      data-element_type="icon-list.default">\n\n                      <div class="elementor-widget-container">\n\n                        <ul class="elementor-icon-list-items elementor-inline-items">\n\n                          <li tappable class="elementor-icon-list-item" (click)="code()">\n\n                            <span class="elementor-icon-list-icon">\n\n                              <i class="fa fa-code" aria-hidden="true"></i>\n\n                            </span>\n\n                            <span class="elementor-icon-list-text">Code</span>\n\n                          </li>\n\n                          <li tappable class="elementor-icon-list-item" (click)="edit()">\n\n                            <span class="elementor-icon-list-icon">\n\n                              <i class="fa fa-edit" aria-hidden="true"></i>\n\n                            </span>\n\n                            <span class="elementor-icon-list-text">Edit</span>\n\n                          </li>\n\n                          <li tappable class="elementor-icon-list-item" (click)="style()">\n\n                            <span class="elementor-icon-list-icon">\n\n                              <i class="fa fa-arrows" aria-hidden="true"></i>\n\n                            </span>\n\n                            <span class="elementor-icon-list-text">Style</span>\n\n                          </li>\n\n                        </ul>\n\n                      </div>\n\n                    </div>\n\n                  </div>\n\n                </div>\n\n              </div>\n\n            </div>\n\n          </div>\n\n        </article>\n\n      </div>\n\n    </div>\n\n  </div>\n\n</section>\n\n'/*ion-inline-end:"G:\ionic\Project\quark\src\components\hover\hover.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */]])
    ], HoverComponent);
    return HoverComponent;
}());

//# sourceMappingURL=hover.js.map

/***/ }),

/***/ 428:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CodebarComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_angular_material__ = __webpack_require__(67);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CodebarComponent = /** @class */ (function () {
    function CodebarComponent(toastCtrl, snackbar) {
        this.toastCtrl = toastCtrl;
        this.snackbar = snackbar;
        this.code = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    CodebarComponent.prototype.save_js = function () {
        this.code.emit('saveJS');
        var toast = this.toastCtrl.create({
            message: 'Saved',
            duration: 1200,
            position: 'bottom',
            cssClass: 'toast'
        });
        toast.present();
    };
    CodebarComponent.prototype.save_css = function () {
        this.code.emit('saveCSS');
        var toast = this.toastCtrl.create({
            message: 'Saved',
            duration: 1200,
            position: 'bottom',
            cssClass: 'toast'
        });
        toast.present();
    };
    CodebarComponent.prototype.indent = function () {
        this.code.emit(this.mode);
        // const toast = this.toastCtrl.create({
        //   message: 'Saved',
        //   duration: 1200,
        //   position: 'bottom',
        //   cssClass: 'toast'
        // });
        // toast.present();
        var config = {
            duration: 1200,
            horizontalPosition: 'right',
            announcementMessage: ''
        };
        this.snackbar.open('Ok :)', '', config);
    };
    CodebarComponent.prototype.showInterface = function () {
        this.code.emit('showInterface');
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], CodebarComponent.prototype, "code", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], CodebarComponent.prototype, "mode", void 0);
    CodebarComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'codebar',template:/*ion-inline-start:"G:\ionic\Project\quark\src\components\codebar\codebar.html"*/'<div class="mode">\n\n  <ion-icon [name]=" mode==\'Javascript\' || mode==\'JSON\'?\'logo-javascript\' : \'logo-css3\'"></ion-icon>\n\n  <span>{{mode}}</span>\n\n</div>\n\n<div class="utilities">\n\n  <div class="interface button" *ngIf="mode == \'Javascript\' || mode == \'JSON\'" tappable (click)="showInterface()">\n\n    <ion-icon name="md-reorder"></ion-icon>\n\n    <span>Interface</span>\n\n  </div>\n\n  <div class="indent button">\n\n    <ion-icon name="md-reorder"></ion-icon>\n\n    <span>Indent</span>\n\n  </div>\n\n</div>\n\n'/*ion-inline-end:"G:\ionic\Project\quark\src\components\codebar\codebar.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2__node_modules_angular_material__["k" /* MatSnackBar */]])
    ], CodebarComponent);
    return CodebarComponent;
}());

//# sourceMappingURL=codebar.js.map

/***/ }),

/***/ 464:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StatusBarComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var StatusBarComponent = /** @class */ (function () {
    function StatusBarComponent() {
        this.value = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    StatusBarComponent.prototype.changeMode = function () {
        this.value.emit('changeMode');
    };
    StatusBarComponent.prototype.connectToBoard = function () {
        this.value.emit('connect');
    };
    StatusBarComponent.prototype.initialize = function () {
        this.value.emit('initialize');
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], StatusBarComponent.prototype, "value", void 0);
    StatusBarComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'status-bar',template:/*ion-inline-start:"G:\ionic\Project\quark\src\components\status-bar\status-bar.html"*/'<div class="page-template page-template-elementor_canvas page page-id-116 elementor-default elementor-template-canvas elementor-page elementor-page-116"\n  data-elementor-device-mode="mobile">\n  <div class="elementor elementor-116">\n    <div class="elementor-inner">\n      <div class="elementor-section-wrap">\n        <section data-id="f8fcd04" class="elementor-element elementor-element-f8fcd04 elementor-section-stretched elementor-section-full_width elementor-section-height-default elementor-section-height-default elementor-section-content-bottom elementor-section elementor-top-section"\n          data-settings="{&quot;background_background&quot;:&quot;classic&quot;}" data-element_type="section" style="width: 100%; left: 0px;">\n          <div class="elementor-container elementor-column-gap-no">\n            <div class="elementor-row">\n              <div data-id="2b0db63" class="elementor-element elementor-element-2b0db63 elementor-column elementor-col-50 elementor-top-column"\n                data-element_type="column">\n                <div class="elementor-column-wrap elementor-element-populated">\n                  <div class="elementor-widget-wrap">\n                    <div data-id="53ffb31" class="elementor-element elementor-element-53ffb31 elementor-widget elementor-widget-icon-list" data-element_type="icon-list.default">\n                      <div class="elementor-widget-container">\n                        <ul class="elementor-icon-list-items elementor-inline-items">\n                          <li class="elementor-icon-list-item">\n                            <span mat-button [matMenuTriggerFor]="menu" tappable (click)="changeMode()" class="elementor-icon-list-text mtr-hover">Mode : Editing</span>\n                            <mat-menu #menu="matMenu">\n                              <button mat-menu-item>Item 1</button>\n                              <button mat-menu-item>Item 2</button>\n                            </mat-menu>\n                          </li>\n                          <li class="elementor-icon-list-item">\n                            <span tappable (click)="connectToBoard()" class="elementor-icon-list-text mtr-hover">Connect</span>\n                          </li>\n                        </ul>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n              </div>\n              <div data-id="395eaf9" class="elementor-element elementor-element-395eaf9 elementor-column elementor-col-50 elementor-top-column"\n                data-element_type="column">\n                <div class="elementor-column-wrap elementor-element-populated">\n                  <div class="elementor-widget-wrap">\n                    <div data-id="7ea855d" class="elementor-element elementor-element-7ea855d elementor-align-right elementor-widget elementor-widget-icon-list"\n                      data-element_type="icon-list.default">\n                      <div class="elementor-widget-container">\n                        <ul class="elementor-icon-list-items elementor-inline-items">\n                          <li class="elementor-icon-list-item">\n                            <span tappable (click)="connectToBoard()" class="elementor-icon-list-text mtr-hover">Connect</span>\n                          </li>\n                          <li class="elementor-icon-list-item">\n                            <span tappable (click)="initialize()" class="elementor-icon-list-text mtr-hover">Initialize</span>\n                          </li>\n                        </ul>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n        </section>\n      </div>\n    </div>\n  </div>\n</div>\n'/*ion-inline-end:"G:\ionic\Project\quark\src\components\status-bar\status-bar.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], StatusBarComponent);
    return StatusBarComponent;
}());

//# sourceMappingURL=status-bar.js.map

/***/ }),

/***/ 465:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsBarComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_global_service_global_service__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TabsBarComponent = /** @class */ (function () {
    function TabsBarComponent(gsp) {
        this.gsp = gsp;
        this.tabsArray = [];
        this.closeTab = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.openTab = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    TabsBarComponent.prototype.clicked = function (tab) {
        this.openTab.emit(tab);
    };
    TabsBarComponent.prototype.CloseTab = function (tab) {
        this.closeTab.emit(tab);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Array)
    ], TabsBarComponent.prototype, "tabsArray", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], TabsBarComponent.prototype, "closeTab", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], TabsBarComponent.prototype, "openTab", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], TabsBarComponent.prototype, "selectedTab", void 0);
    TabsBarComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'tabs-bar',template:/*ion-inline-start:"G:\ionic\Project\quark\src\components\tabs-bar\tabs-bar.html"*/'<div *ngIf="tabsArray.length > 0"  class="page-template page-template-elementor_canvas page page-id-123 elementor-default elementor-template-canvas elementor-page elementor-page-123"\n\n  data-elementor-device-mode="tablet">\n\n  <div class="elementor elementor-123">\n\n    <div class="elementor-inner">\n\n      <div class="elementor-section-wrap">\n\n        <section data-id="ec22762" class="elementor-element elementor-element-ec22762 elementor-section-stretched elementor-section-full_width elementor-section-height-default elementor-section-height-default elementor-section-content-top elementor-section elementor-top-section"\n\n          data-settings="{&quot;background_background&quot;:&quot;classic&quot;}" data-element_type="section" style="width: 100%; left: 0px;">\n\n          <div class="elementor-container elementor-column-gap-no">\n\n            <div class="elementor-row">\n\n              <div *ngFor="let tab of tabsArray" data-id="94857d4" class="mtr-tabs elementor-element elementor-element-94857d4 mtr-tabs-bar-designer elementor-column elementor-col-50 elementor-top-column"\n\n                data-element_type="column">\n\n                <div tappable class="elementor-column-wrap elementor-element-populated">\n\n                  <div class="elementor-widget-wrap">\n\n                    <div data-id="f723328" class="elementor-element elementor-element-f723328 elementor-align-left elementor-widget elementor-widget-button"\n\n                      data-element_type="button.default">\n\n                      <div class="elementor-widget-container">\n\n                        <div class="elementor-button-wrapper">\n\n                          <a [ngClass]="{\'isSelected\':selectedTab == tab}" class="elementor-button elementor-size-xs" (click)="clicked(tab)" role="button">\n\n                            <span class="elementor-button-content-wrapper">\n\n                              <span class=" elementor-button-icon elementor-align-icon-left mtr-left-icon" tappable>\n\n                                <!-- <i [ngClass]="{\'fa\' : true, \'fa-css3\' : tab.mode==\'CSS\', \'fa-code\' : tab.mode==\'Javascript\' || tab.mode==\'JSON\' }" aria-hidden="true"></i> -->\n\n                                <ion-icon [name]="tab.mode == \'CSS\'? \'logo-css3\' : \'logo-javascript\'"></ion-icon>\n\n                              </span>\n\n                              <span class="elementor-button-icon elementor-align-icon-right" tappable (click)="CloseTab(tab)">\n\n                                <i class="fa fa-close" aria-hidden="true"></i>\n\n                              </span>\n\n                              <span class="elementor-button-text">{{tab.component == undefined? tab.other : tab.component.data.config.variable}}</span>\n\n                            </span>\n\n                          </a>\n\n                        </div>\n\n                      </div>\n\n                    </div>\n\n                  </div>\n\n                </div>\n\n              </div>\n\n            </div>\n\n          </div>\n\n        </section>\n\n      </div>\n\n    </div>\n\n  </div>\n\n</div>\n\n'/*ion-inline-end:"G:\ionic\Project\quark\src\components\tabs-bar\tabs-bar.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__providers_global_service_global_service__["a" /* GlobalServiceProvider */]])
    ], TabsBarComponent);
    return TabsBarComponent;
}());

//# sourceMappingURL=tabs-bar.js.map

/***/ }),

/***/ 466:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export myCustomTooltipDefaults */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActivityBarComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_electron_service_electron_service__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_global_service_global_service__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_authentication_service_authentication_service__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_electron_service_electron_service_dump__ = __webpack_require__(263);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var myCustomTooltipDefaults = {
    showDelay: 0,
    hideDelay: 5000,
    touchendHideDelay: 1000,
};
var ActivityBarComponent = /** @class */ (function () {
    function ActivityBarComponent(events, navCtrl, esp, gsp, asp) {
        this.events = events;
        this.navCtrl = navCtrl;
        this.esp = esp;
        this.gsp = gsp;
        this.asp = asp;
    }
    ActivityBarComponent.prototype.menuFile = function (event) {
        switch (event) {
            case 'new':
                this.esp.showNewFileDialog();
                break;
            case 'save':
                this.gsp.electronConfig.parsedPath == null ?
                    this.esp.showSaveDialog() : this.esp.saveFile();
                break;
            case 'save-as':
                this.esp.showSaveDialog();
                break;
            case 'open':
                this.esp.showOpenDialog();
                break;
            case 'open-in-new-window':
                this.esp.openInNewWindow();
                break;
            default:
                break;
        }
    };
    ActivityBarComponent.prototype.openRecentDocument = function (filePath) {
        Object(__WEBPACK_IMPORTED_MODULE_5__providers_electron_service_electron_service_dump__["b" /* createNewWindowFromDump */])(this.esp, filePath);
    };
    ActivityBarComponent.prototype.menuCloud = function (event) {
        switch (event) {
            case 'upload':
                this.asp.uploadDashboard();
                break;
            case 'your-dashboards':
                Object(__WEBPACK_IMPORTED_MODULE_5__providers_electron_service_electron_service_dump__["e" /* showSnackBarFromDump */])(this.esp, 'my-dashboards');
                break;
            case 'usage':
                break;
            default:
                break;
        }
    };
    ActivityBarComponent.prototype.activity = function (activity) {
        switch (activity) {
            case 'connect':
                this.events.publish('page-designer : socket-service : connect-to-board');
                break;
            case 'initialize':
                this.events.publish('page-designer : socket-service : initialize');
                break;
            case 'globalConfigJSON':
                this.events.publish('activity-bar : global-service : add-tab', { other: "globalConfigJSON", mode: "JSON" });
                break;
            case 'globalConfigCSS':
                this.events.publish('activity-bar : global-service : add-tab', { other: "globalConfigCSS", mode: "CSS" });
                break;
            case 'globalConfigSetup':
                this.events.publish('activity-bar : global-service : add-tab', { other: "globalConfigSetup", mode: "Javascript" });
                break;
            case 'globalConfigDefaultSettings':
                this.events.publish('activity-bar : global-service : add-tab', { other: "globalConfigDefaultSettings", mode: "JSON" });
                break;
            case 'goToDesignerPage':
                this.events.publish('component-activity-bar : page-designer : show-designer');
                break;
            default:
                break;
        }
    };
    ActivityBarComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'activity-bar',template:/*ion-inline-start:"G:\ionic\Project\quark\src\components\activity-bar\activity-bar.html"*/'<div class="icon-container">\n\n  <div class="upper-container">\n\n    <ion-icon tappable id="menu" name="menu" [matMenuTriggerFor]="menu"></ion-icon>\n\n    <ion-icon tappable id="eye" name="eye"></ion-icon>\n\n    <ion-icon tappable id="brush" name="brush" matTooltip="Designer" matTooltipPosition="after" (click)="activity(\'goToDesignerPage\')"></ion-icon>\n\n  </div>\n\n  <div class="lower-container">\n\n    <ion-icon tappable id="code" name="code" matTooltip="Code" matTooltipPosition="after" (click)="activity(\'globalConfigSetup\')"></ion-icon>\n\n    <ion-icon tappable id="logo-nodejs" name="logo-nodejs" matTooltip="Global Config" matTooltipPosition="after" (click)="activity(\'globalConfigJSON\')"></ion-icon>\n\n    <ion-icon tappable id="logo-css3" name="logo-css3" matTooltip="Global Style" matTooltipPosition="after" (click)="activity(\'globalConfigCSS\')"></ion-icon>\n\n    <ion-icon tappable id="ios-construct" name="ios-construct" matTooltip="Settings" matTooltipPosition="after" (click)="activity(\'globalConfigDefaultSettings\')"></ion-icon>\n\n  </div>\n\n</div>\n\n\n\n<mat-menu #menu="matMenu" class="menu-buttons">\n\n  <button mat-menu-item [matMenuTriggerFor]="file">\n\n    <span>File</span>\n\n    <ion-icon name="folder"></ion-icon>\n\n  </button>\n\n  <button mat-menu-item [matMenuTriggerFor]="cloud" [disabled]="!this.asp.user.getValue()">\n\n    <span>Cloud</span>\n\n    <ion-icon name="cloud"></ion-icon>\n\n  </button>\n\n  <button mat-menu-item [matMenuTriggerFor]="share">\n\n    <span>Share</span>\n\n    <ion-icon name="share-alt"></ion-icon>\n\n  </button>\n\n  <button mat-menu-item [matMenuTriggerFor]="help">\n\n    <span>Help</span>\n\n    <ion-icon name="help"></ion-icon>\n\n  </button>\n\n</mat-menu>\n\n\n\n<mat-menu #file="matMenu" class="menu-buttons sub-menu-buttons">\n\n  <button mat-menu-item (click)="menuFile(\'new\')">\n\n    <ion-icon name="ios-create"></ion-icon>\n\n    <span>New</span>\n\n  </button>\n\n  <mat-divider></mat-divider>\n\n  <button mat-menu-item (click)="menuFile(\'save\')">\n\n    <ion-icon name="ios-download"></ion-icon>\n\n    <span>Save</span>\n\n  </button>\n\n  <button mat-menu-item (click)="menuFile(\'save-as\')" class="no-icon-button">\n\n    <span>Save As...</span>\n\n  </button>\n\n  <mat-divider></mat-divider>\n\n  <button mat-menu-item (click)="menuFile(\'open\')">\n\n    <ion-icon name="ios-open"></ion-icon>\n\n    <span>Open</span>\n\n  </button>\n\n  <button mat-menu-item class="no-icon-button" (click)="menuFile(\'open-in-new-window\')">\n\n    <span>Open in new window</span>\n\n  </button>\n\n  <mat-divider></mat-divider>\n\n  <button mat-menu-item [matMenuTriggerFor]="openRecent" [disabled]="this.esp.openRecentDocumentsArray.length == 0">\n\n    <ion-icon name="ios-clock"></ion-icon>\n\n    <span>Recent</span>\n\n  </button>\n\n</mat-menu>\n\n\n\n<mat-menu #openRecent="matMenu" class="menu-buttons sub-menu-buttons recent-docs">\n\n  <button mat-menu-item (click)="openRecentDocument(doc.path)" *ngFor="let doc of this.esp.openRecentDocumentsArray">\n\n    <span>{{doc.name}}</span>\n\n    <span class="document-path">{{doc.path}}</span>\n\n  </button>\n\n</mat-menu>\n\n\n\n\n\n<mat-menu #cloud="matMenu" class="menu-buttons sub-menu-buttons">\n\n  <button mat-menu-item (click)="menuCloud(\'upload\')">\n\n    <ion-icon name="ios-cloud-upload"></ion-icon>\n\n    <span>Upload</span>\n\n  </button>\n\n  <button mat-menu-item (click)="menuCloud(\'your-dashboards\')">\n\n    <ion-icon name="ios-paper"></ion-icon>\n\n    <span>Your Dashboards</span>\n\n  </button>\n\n  <button mat-menu-item (click)="menuCloud(\'usage\')">\n\n    <ion-icon name="analytics"></ion-icon>\n\n    <span>Usage</span>\n\n  </button>\n\n</mat-menu>\n\n\n\n<mat-menu #share="matMenu" class="menu-buttons sub-menu-buttons">\n\n  <button mat-menu-item>\n\n    <span>Facebook</span>\n\n    <ion-icon name="logo-facebook"></ion-icon>\n\n  </button>\n\n  <button mat-menu-item>\n\n    <span>Instagram</span>\n\n    <ion-icon name="logo-instagram"></ion-icon>\n\n  </button>\n\n  <button mat-menu-item>\n\n    <span>Google +</span>\n\n    <ion-icon name="logo-googleplus"></ion-icon>\n\n  </button>\n\n  <button mat-menu-item>\n\n    <span>Twitter</span>\n\n    <ion-icon name="logo-twitter"></ion-icon>\n\n  </button>\n\n</mat-menu>\n\n\n\n\n\n\n\n\n\n<mat-menu #help="matMenu" class="menu-buttons sub-menu-buttons">\n\n  <button mat-menu-item>Documentation</button>\n\n  <button mat-menu-item>Tutorials</button>\n\n  <button mat-menu-item>Release Notes</button>\n\n  <button mat-menu-item [matMenuTriggerFor]="social">\n\n    <span>Social</span>\n\n    <ion-icon name="people"></ion-icon>\n\n  </button>\n\n  <button mat-menu-item>Provide Feedback</button>\n\n  <button mat-menu-item>Report Issue</button>\n\n  <button mat-menu-item>View License</button>\n\n  <button mat-menu-item>Privacy Statement</button>\n\n  <button mat-menu-item>Check For Updates...</button>\n\n  <button mat-menu-item>About Quark</button>\n\n</mat-menu>\n\n\n\n<mat-menu #social="matMenu">\n\n  <button mat-menu-item>Facebook</button>\n\n  <button mat-menu-item>Google</button>\n\n  <button mat-menu-item>Twitter</button>\n\n</mat-menu>\n\n'/*ion-inline-end:"G:\ionic\Project\quark\src\components\activity-bar\activity-bar.html"*/,
            // providers: [
            //   { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: myCustomTooltipDefaults }
            // ],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_electron_service_electron_service__["a" /* ElectronServiceProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_global_service_global_service__["a" /* GlobalServiceProvider */], __WEBPACK_IMPORTED_MODULE_4__providers_authentication_service_authentication_service__["a" /* AuthenticationServiceProvider */]])
    ], ActivityBarComponent);
    return ActivityBarComponent;
}());

//# sourceMappingURL=activity-bar.js.map

/***/ }),

/***/ 477:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = runChildProcessFromDump;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__electron_service_assets_save_open__ = __webpack_require__(162);

function runChildProcessFromDump(_this) {
    if (!_this.gsp.electronConfig.fileName) {
        _this.showAlert('info', 'File not saved', 'You must save the file first', ['Save', 'Cancel'])
            .then(function (response) {
            console.log(response);
            if (response == 0) {
                Object(__WEBPACK_IMPORTED_MODULE_0__electron_service_assets_save_open__["d" /* showSaveDialogFromDump */])(_this);
            }
        })
            .catch(function (err) {
            console.log('Error runnung child process');
        });
        return;
    }
    var self = _this;
    var file = '';
    var imports = JSON.parse(self.gsp.global_config.js.getValue()).imports;
    var code = self.gsp.global_config.code.getValue();
    var designerComponents = _this.gsp.designerComponents;
    for (var i = 0; i < imports.length; i++) {
        file = String().concat(file, "let " + imports[i].name + " = require('" + imports[i].module + "');");
    }
    file = String().concat(file, 'let functionsObjectForInternalUse={};');
    file = String().concat(file, 'let closureObjectForInternalUse={};');
    file = String().concat(file, 'let aliasForProcess=process;');
    file = String().concat(file, "let frameRateForInternalUse=" + JSON.parse(self.gsp.global_config.js.getValue()).frameRate + ";");
    designerComponents.map(function (val) {
        var data = val.data;
        file = String().concat(file, "let " + data.config.variable + " = JSON.parse('" + JSON.stringify(data.localData) + "');");
        file = String().concat(file, "functionsObjectForInternalUse['" + data.config.function + "'] = function(args){" + data.code.js.getValue() + "}");
        file = String().concat(file, "closureObjectForInternalUse['" + data.config.variable + "'] = " + data.config.variable + ";");
    });
    file = String().concat(file, "(function(){" + code + ";");
    file = String().concat(file, "\n      aliasForProcess.send('process-started');\n      setInterval(()=>{\n        aliasForProcess.send(closureObjectForInternalUse);\n      },(1000/frameRateForInternalUse));\n      \n      aliasForProcess.on('message', (data)=> {\n        try{\n            functionsObjectForInternalUse[data.functionName](data.args);\n            //process.send(data);\n        }catch(err){\n          aliasForProcess.send({errMsg : err});\n        }\n    });");
    file = String().concat(file, '})();');
    _this.fs.writeFile(_this.gsp.electronConfig.folderPath + "/try.js", js_beautify(file), function (err) {
        console.log(err);
        if (err == null) {
            startChildProcess();
        }
    });
    function startChildProcess() {
        self.childProcess = self.fork(self.gsp.electronConfig.folderPath + "/try.js");
        self.childProcess.on('error', function (err) {
            console.log(err);
        });
        self.childProcess.on('close', function (close) {
            console.log("Close", close);
            self.childProcessIsRunning = false;
        });
        self.childProcess.on('message', function (msg) {
            if (msg == "process-started") {
                self.childProcessIsRunning = true;
            }
            else if (msg.errMsg != undefined) {
                console.log('Error in process', msg);
            }
            else {
                self.events.publish('electron-service-dump : misc-components : update-renderer', msg);
            }
        });
        self.childProcess.on('exit', function (code, signal) {
            console.log("child process exited with code " + code + " and signal " + signal);
            self.childProcessIsRunning = false;
        });
    }
}
//# sourceMappingURL=electron-service-assets-child-process.js.map

/***/ }),

/***/ 478:
/***/ (function(module, exports) {

module.exports = require('electron');

/***/ }),

/***/ 479:
/***/ (function(module, exports) {

module.exports = require('child_process');

/***/ }),

/***/ 480:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WidgetsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var WidgetsComponent = /** @class */ (function () {
    function WidgetsComponent() {
        this.selectedComponent = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    WidgetsComponent.prototype.clicked = function (component) {
        this.selectedComponent.emit(component);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Array)
    ], WidgetsComponent.prototype, "componentsList", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], WidgetsComponent.prototype, "selectedComponent", void 0);
    WidgetsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'widgets',template:/*ion-inline-start:"G:\ionic\Project\quark\src\components\widgets\widgets.html"*/'<div class="page-template page-template-elementor_canvas page page-id-42 woocommerce-js elementor-default elementor-template-canvas elementor-page elementor-page-42"\n\n  data-elementor-device-mode="mobile">\n\n  <div class="elementor elementor-42">\n\n    <div class="elementor-inner">\n\n      <div class="elementor-section-wrap">\n\n        <section data-id="1d24351" class="elementor-element elementor-element-1d24351 elementor-section-stretched elementor-section-full_width elementor-section-height-default elementor-section-height-default elementor-section-content-top elementor-section elementor-top-section"\n\n          data-settings="{&quot;background_background&quot;:&quot;classic&quot;}" data-element_type="section" style="width: 100%; left: 0px;">\n\n          <div class="elementor-container elementor-column-gap-no">\n\n            <div *ngFor="let component of componentsList" class="elementor-row">\n\n              <div data-id="aaaa87c" class="elementor-element elementor-element-aaaa87c elementor-column elementor-col-50 elementor-top-column"\n\n                data-element_type="column">\n\n                <div class="elementor-column-wrap elementor-element-populated">\n\n                  <div class="elementor-widget-wrap">\n\n                    <div data-id="f265596" class="elementor-element elementor-element-f265596 elementor-widget elementor-widget-button" data-element_type="button.default">\n\n                      <div class="elementor-widget-container">\n\n                        <div class="elementor-button-wrapper">\n\n                          <a class="elementor-button elementor-size-sm" role="button">\n\n                            <span class="elementor-button-content-wrapper">\n\n                              <span class="elementor-button-text">{{component.component? component.component : component.class}}</span>\n\n                            </span>\n\n                          </a>\n\n                        </div>\n\n                      </div>\n\n                    </div>\n\n                  </div>\n\n                </div>\n\n              </div>\n\n              <div data-id="5a2c022" class="elementor-element elementor-element-5a2c022 elementor-column elementor-col-50 elementor-top-column"\n\n                data-element_type="column">\n\n                <div class="elementor-column-wrap elementor-element-populated">\n\n                  <div class="elementor-widget-wrap">\n\n                    <div data-id="ede70f8" class="elementor-element elementor-element-ede70f8 elementor-align-right elementor-widget elementor-widget-button"\n\n                      data-element_type="button.default">\n\n                      <div class="elementor-widget-container">\n\n                        <div class="elementor-button-wrapper">\n\n                          <a tappable (click)="clicked(component)" class="elementor-button elementor-size-sm" role="button">\n\n                            <span class="elementor-button-content-wrapper">\n\n                              <span class="elementor-button-text">Add</span>\n\n                            </span>\n\n                          </a>\n\n                        </div>\n\n                      </div>\n\n                    </div>\n\n                  </div>\n\n                </div>\n\n              </div>\n\n            </div>\n\n          </div>\n\n        </section>\n\n      </div>\n\n    </div>\n\n  </div>\n\n</div>\n\n'/*ion-inline-end:"G:\ionic\Project\quark\src\components\widgets\widgets.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], WidgetsComponent);
    return WidgetsComponent;
}());

//# sourceMappingURL=widgets.js.map

/***/ }),

/***/ 499:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CssInspectorComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_rxjs_Subject__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__node_modules_rxjs_Subject__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CssInspectorComponent = /** @class */ (function () {
    function CssInspectorComponent() {
        this.currentElement = {
            element: document.createElement('a'),
            class: '/* Hover over the element to show class */',
            styleList: ['Nothing to show here'],
            stayFixed: false,
            elementPath: []
        };
    }
    CssInspectorComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.dragster();
        this.mouseMoveEvent.subscribe(function (event) {
            _this.mouseMove(event);
        });
        this.mouseLeaveEvent.subscribe(function () {
            _this.mouseLeave();
        });
        this.stayFixed.subscribe(function (value) {
            _this.currentElement.stayFixed = value;
        });
        this.currentComponentClass.subscribe(function (className) {
            _this.currentComponentClassName = className;
        });
        this.dummyElement = document.createElement('element-dummy');
        document.body.appendChild(this.dummyElement);
    };
    CssInspectorComponent.prototype.ngOnDestroy = function () {
        clearInterval(this.dragsterInterval);
        this.dummyElement.parentNode.removeChild(this.dummyElement);
    };
    CssInspectorComponent.prototype.mouseMove = function (event) {
        if (this.currentElement.stayFixed == false) {
            clearInterval(this.dragsterInterval);
            if (event.srcElement != this.currentElement.element && event.srcElement.classList[0] != "mtr-component-container") {
                this.currentElement.style != undefined ?
                    this.currentElement.element.removeAttribute('style') : null;
                this.currentElement.element = event.srcElement;
                // this.currentElement.elementPath = event["path"];
                this.currentElement.element.setAttribute('style', "background-color : #000000;");
                this.getComputedStyles();
                this.getElementClassesFromPath(event["path"]);
            }
        }
    };
    CssInspectorComponent.prototype.mouseLeave = function () {
        var _this = this;
        if (this.currentElement.style != undefined) {
            this.currentElement.element.removeAttribute('style');
            this.currentElement.stayFixed = false;
            this.dragsterInterval = setInterval(function () {
                _this.getComputedStyles();
            }, 1000);
        }
    };
    CssInspectorComponent.prototype.getElementClassesFromPath = function (path) {
        var classPath = [];
        for (var i = 0; i < path.length; i++) {
            if (path[i].classList != undefined) {
                if (this.currentComponentClassName == path[i].classList[0])
                    break;
                classPath.push(path[i].classList[0]);
            }
        }
        this.currentElement.elementPath = classPath;
        console.log(classPath);
    };
    CssInspectorComponent.prototype.getComputedStyles = function () {
        this.currentElement.style = window.getComputedStyle(this.currentElement.element);
        this.currentElement.class = this.currentElement.element.classList[0];
        this.currentElement.styleList = [];
        var style = this.currentElement.style;
        var defaultStyles = getComputedStyle(this.dummyElement);
        var diff = {};
        if (style[0] == undefined) {
            this.currentElement.class = '/* Hover over the element to show class */';
            this.currentElement.styleList = ['Nothing to show here'];
            clearInterval(this.dragsterInterval);
        }
        else {
            for (var key in style) {
                if (style.hasOwnProperty(key)
                    && defaultStyles[key] !== style[key]) {
                    diff[key] = style[key];
                }
            }
            for (var key in diff) {
                this.currentElement.styleList.push(key + " : " + diff[key]);
            }
        }
    };
    CssInspectorComponent.prototype.dragster = function () {
        dragElement(document.getElementById("mydiv"));
        function dragElement(elmnt) {
            var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
            if (document.getElementById(elmnt.id + "header")) {
                /* if present, the header is where you move the DIV from:*/
                document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
            }
            else {
                /* otherwise, move the DIV from anywhere inside the DIV:*/
                elmnt.onmousedown = dragMouseDown;
            }
            function dragMouseDown(e) {
                e = e || window.event;
                e.preventDefault();
                // get the mouse cursor position at startup:
                pos3 = e.clientX;
                pos4 = e.clientY;
                document.onmouseup = closeDragElement;
                // call a function whenever the cursor moves:
                document.onmousemove = elementDrag;
            }
            function elementDrag(e) {
                e = e || window.event;
                e.preventDefault();
                // calculate the new cursor position:
                pos1 = pos3 - e.clientX;
                pos2 = pos4 - e.clientY;
                pos3 = e.clientX;
                pos4 = e.clientY;
                // set the element's new position:
                // if ((elmnt.offsetTop - pos2) > 67 && (elmnt.offsetTop - pos2) < window.innerHeight - 100) {
                if ((elmnt.offsetTop - pos2) > 67 && (elmnt.offsetTop - pos2) < window.innerHeight - 180) {
                    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
                }
                // if ((elmnt.offsetLeft - pos1) > 57 && (elmnt.offsetLeft - pos1) < (window.innerWidth-50)) {
                if ((elmnt.offsetLeft - pos1) > 50 && (elmnt.offsetLeft - pos1) < (window.innerWidth - 400)) {
                    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
                }
                // console.log(elmnt.style.top, elmnt.style.left, window.innerHeight, window.innerWidth);
            }
            function closeDragElement() {
                /* stop moving when mouse button is released:*/
                document.onmouseup = null;
                document.onmousemove = null;
            }
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__node_modules_rxjs_Subject__["Subject"])
    ], CssInspectorComponent.prototype, "mouseMoveEvent", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__node_modules_rxjs_Subject__["Subject"])
    ], CssInspectorComponent.prototype, "mouseLeaveEvent", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__node_modules_rxjs_Subject__["Subject"])
    ], CssInspectorComponent.prototype, "stayFixed", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__node_modules_rxjs_Subject__["Subject"])
    ], CssInspectorComponent.prototype, "currentComponentClass", void 0);
    CssInspectorComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'css-inspector',template:/*ion-inline-start:"G:\ionic\Project\quark\src\components\css-inspector\css-inspector.html"*/'<div id="mydiv" class="page-template page-template-elementor_canvas page page-id-219 woocommerce-js elementor-default elementor-template-canvas elementor-page elementor-page-219"\n\n  data-elementor-device-mode="tablet">\n\n  <div class="elementor elementor-219">\n\n    <div class="elementor-inner">\n\n      <div class="elementor-section-wrap">\n\n        <section data-id="40d4d35" class="elementor-element elementor-element-40d4d35 elementor-section-stretched elementor-section-boxed elementor-section-height-default elementor-section-height-default elementor-section-content-top elementor-section elementor-top-section"\n\n          data-element_type="section" style="width: 100%; left: 0px;">\n\n          <div class="elementor-container elementor-column-gap-no">\n\n            <div class="elementor-row">\n\n              <div data-id="e9bfeee" class="elementor-element elementor-element-e9bfeee elementor-column elementor-col-100 elementor-top-column"\n\n                data-element_type="column">\n\n                <div class="elementor-column-wrap elementor-element-populated">\n\n                  <div class="elementor-widget-wrap">\n\n                    <div id="mydivheader" data-id="5cf9a34" class="elementor-element elementor-element-5cf9a34 elementor-align-left elementor-widget elementor-widget-button"\n\n                      data-element_type="button.default">\n\n                      <div class="elementor-widget-container">\n\n                        <div class="elementor-button-wrapper">\n\n                          <a class="elementor-button elementor-size-xs" role="button">\n\n                            <span class="elementor-button-content-wrapper">\n\n                              <span class="elementor-button-text">{{currentElement.class}}</span>\n\n                            </span>\n\n                          </a>\n\n                        </div>\n\n                      </div>\n\n                    </div>\n\n                    <div data-id="5f7b768" class="path-container elementor-element elementor-element-5f7b768 elementor-align-left elementor-widget elementor-widget-icon-list"\n\n                      data-element_type="icon-list.default">\n\n                      <div class="elementor-widget-container">\n\n                        <ul class="elementor-icon-list-items elementor-inline-items">\n\n                          <li *ngFor="let path of currentElement.elementPath" class="elementor-icon-list-item">\n\n                            <span *ngIf="path !=currentElement.elementPath[0]" class="elementor-icon-list-icon">\n\n                              <i class="fa fa-angle-double-left" aria-hidden="true"></i>\n\n                            </span>\n\n                            <span class="elementor-icon-list-text">{{path}}</span>\n\n                          </li>\n\n                        </ul>\n\n                      </div>\n\n                    </div>\n\n                    <div data-id="a582d4d" class=" myDivContent elementor-element elementor-element-a582d4d elementor-align-left animated elementor-widget elementor-widget-icon-list fadeIn"\n\n                      data-settings="{&quot;_animation&quot;:&quot;fadeIn&quot;}" data-element_type="icon-list.default">\n\n                      <div class="elementor-widget-container">\n\n                        <ul class="elementor-icon-list-items">\n\n                          <li *ngFor="let style of currentElement.styleList" class="elementor-icon-list-item">\n\n                            <span class="elementor-icon-list-icon">\n\n                              <!-- <i class="fa fa-circle" aria-hidden="true"></i> -->\n\n                              <ion-icon name="arrow-dropright"></ion-icon> \n\n                            </span>\n\n                            <span class="elementor-icon-list-text">{{style}}</span>\n\n                          </li>\n\n                        </ul>\n\n                      </div>\n\n                    </div>\n\n                  </div>\n\n                </div>\n\n              </div>\n\n            </div>\n\n          </div>\n\n        </section>\n\n      </div>\n\n    </div>\n\n  </div>\n\n</div>\n\n'/*ion-inline-end:"G:\ionic\Project\quark\src\components\css-inspector\css-inspector.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], CssInspectorComponent);
    return CssInspectorComponent;
}());

//# sourceMappingURL=css-inspector.js.map

/***/ }),

/***/ 500:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConsoleComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_global_service_global_service__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ConsoleComponent = /** @class */ (function () {
    function ConsoleComponent(gsp, events, zone) {
        var _this = this;
        this.gsp = gsp;
        this.events = events;
        this.zone = zone;
        this.data = [];
        this.maps = {
            log: {
                color: '#000000',
                icon: 'return-right'
            },
            warn: {
                color: '#ffff9a',
                icon: 'warning'
            },
            error: {
                color: '#f53d3d',
                icon: 'close'
            },
            right: {
                color: '#25d55f',
                icon: 'checkmark'
            },
            indent: {
                color: '#000000',
                icon: 'arrow-dropright'
            }
        };
        this.flag = 'console';
        this.resizeEvent = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["Subject"]();
        this.data = this.gsp.consoleData.data;
        this.events.subscribe('electron-service-dump : menu-bar && console : run-zone', function () {
            _this.zone.run(function () {
                console.log('Updating zone');
            });
        });
        this.events.subscribe('electron-service : component-console && component-terminal : run-npm-install', function () {
            _this.zone.run(function () {
                _this.flag = 'terminal';
                _this.maximiseConsole(480);
            });
        });
    }
    ConsoleComponent.prototype.ngAfterViewInit = function () {
        this.myDiv = this.myDivRef.nativeElement;
        this.myDivHeader = this.myDivHeaderRef.nativeElement;
        this.myContent = this.myContentRef.nativeElement;
        this.dragster();
        this.myDiv.style.top = this.gsp.consoleData.top + 'px';
        this.myDiv.style.height = -this.gsp.consoleData.top + 'px';
        this.myContent.scrollTop = this.myContent.scrollHeight;
        // this.resizeTerminal();
        this.minimizeConsole();
    };
    ConsoleComponent.prototype.showFlag = function (flag) {
        this.flag = flag;
        this.resizeTerminal();
    };
    ConsoleComponent.prototype.resizeTerminal = function () {
        var _this = this;
        setTimeout(function () {
            _this.resizeEvent.next('');
        }, 100);
    };
    ConsoleComponent.prototype.minimizeConsole = function () {
        this.myDiv.style.height = '30px';
        this.myDiv.style.top = '-30px';
        this.gsp.consoleData.top = -30;
        this.events.publish('component-console : page-designer : update-container-height');
    };
    ConsoleComponent.prototype.maximiseConsole = function (height) {
        if (height) {
            this.myDiv.style.height = height + "px";
            this.myDiv.style.top = "-" + height + "px";
            this.gsp.consoleData.top = -height;
        }
        else {
            this.myDiv.style.height = '200px';
            this.myDiv.style.top = '-200px';
            this.gsp.consoleData.top = -200;
        }
        this.myDiv.scrollTop = this.myDiv.scrollHeight;
        this.myContent.scrollTop = this.myContent.scrollHeight;
        this.resizeTerminal();
        this.events.publish('component-console : page-designer : update-container-height');
    };
    ConsoleComponent.prototype.clearConsole = function () {
        this.gsp.consoleData.data = [];
        this.data = [];
    };
    ConsoleComponent.prototype.contextMenu = function (event) {
        event.preventDefault();
    };
    ConsoleComponent.prototype.dragster = function () {
        var self = this;
        dragElement(this.myDiv);
        function dragElement(elmnt) {
            var pos2 = 0, pos4 = 0;
            self.myDivHeader.onmousedown = dragMouseDown;
            function dragMouseDown(e) {
                e = e || window.event;
                e.preventDefault();
                // get the mouse cursor position at startup:
                pos4 = e.clientY;
                document.onmouseup = closeDragElement;
                // call a function whenever the cursor moves:
                document.onmousemove = elementDrag;
            }
            function elementDrag(e) {
                self.events.publish('component-console : page-designer : update-container-height');
                e = e || window.event;
                e.preventDefault();
                // calculate the new cursor position:
                pos2 = pos4 - e.clientY;
                pos4 = e.clientY;
                // set the element's new position:
                if (pos2 > -36) {
                    elmnt.style.height = -(elmnt.offsetTop - pos2) + "px";
                }
                if ((elmnt.offsetTop - pos2) < -30 && (elmnt.offsetTop - pos2) > -500) {
                    var pos = (elmnt.offsetTop - pos2);
                    self.resizeEvent.next('');
                    if (pos > -100) {
                        self.minimizeConsole();
                    }
                    else {
                        self.gsp.consoleData.top = (elmnt.offsetTop - pos2);
                        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
                    }
                }
            }
            function closeDragElement() {
                /* stop moving when mouse button is released:*/
                document.onmouseup = null;
                document.onmousemove = null;
                self.events.publish('component-console : page-designer : update-container-height');
            }
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('myDiv'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], ConsoleComponent.prototype, "myDivRef", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('myDivHeader'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], ConsoleComponent.prototype, "myDivHeaderRef", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('myContent'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], ConsoleComponent.prototype, "myContentRef", void 0);
    ConsoleComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'console',template:/*ion-inline-start:"G:\ionic\Project\quark\src\components\console\console.html"*/'<div id="myDiv" #myDiv (contextmenu)="contextMenu($event)" class="page-template page-template-elementor_canvas page page-id-232 woocommerce-js elementor-default elementor-template-canvas elementor-page elementor-page-232"\n\n  data-elementor-device-mode="mobile">\n\n  <div class="elementor elementor-232">\n\n    <div class="elementor-inner">\n\n      <div class="elementor-section-wrap">\n\n        <section id="myDivHeader" #myDivHeader data-id="bdc1c16" class="elementor-element elementor-element-bdc1c16 elementor-section-stretched elementor-section-full_width elementor-section-height-default elementor-section-height-default elementor-section-content-top elementor-section elementor-top-section"\n\n          data-settings="{&quot;background_background&quot;:&quot;classic&quot;}" data-element_type="section" style="width: 100%; left: 0px;">\n\n          <div class="elementor-container elementor-column-gap-no">\n\n            <div class="elementor-row">\n\n              <div data-id="b53f1a7" class="elementor-element elementor-element-b53f1a7 elementor-column elementor-col-100 elementor-top-column"\n\n                data-element_type="column">\n\n                <div class="elementor-column-wrap elementor-element-populated">\n\n                  <div class="elementor-widget-wrap">\n\n                    <div data-id="598c3a9" class="elementor-element elementor-element-598c3a9 elementor-widget elementor-widget-divider" data-element_type="divider.default">\n\n                      <div class="elementor-widget-container">\n\n                        <div class="elementor-divider">\n\n                          <span class="elementor-divider-separator"></span>\n\n                        </div>\n\n                      </div>\n\n                    </div>\n\n                  </div>\n\n                </div>\n\n              </div>\n\n            </div>\n\n          </div>\n\n        </section>\n\n        <section data-id="f0ba44c" class="elementor-element elementor-element-f0ba44c elementor-section-stretched elementor-section-full_width elementor-section-height-default elementor-section-height-default elementor-section-content-middle elementor-section elementor-top-section"\n\n          data-settings="{&quot;background_background&quot;:&quot;classic&quot;}" data-element_type="section" style="width: 100%; left: 0px;">\n\n          <div class="elementor-container elementor-column-gap-no">\n\n            <div class="elementor-row">\n\n              <div data-id="14b6a0e" class="elementor-element elementor-element-14b6a0e elementor-column elementor-col-50 elementor-top-column"\n\n                data-element_type="column">\n\n                <div class="elementor-column-wrap elementor-element-populated">\n\n                  <div class="elementor-widget-wrap">\n\n                    <div data-id="4fd05bf" class="elementor-element elementor-element-4fd05bf elementor-align-left elementor-widget elementor-widget-button"\n\n                      data-element_type="button.default">\n\n                      <div class="elementor-widget-container">\n\n                        <div class="elementor-button-wrapper">\n\n                          <a tappable (click)="showFlag(\'console\')" class="elementor-button elementor-size-xs" role="button">\n\n                            <span class="elementor-button-content-wrapper">\n\n                              <span class="elementor-button-text">Console</span>\n\n                            </span>\n\n                          </a>\n\n                          <a tappable (click)="showFlag(\'terminal\')" class="elementor-button elementor-size-xs" role="button">\n\n                            <span class="elementor-button-content-wrapper">\n\n                              <span class="elementor-button-text">Terminal</span>\n\n                            </span>\n\n                          </a>\n\n                        </div>\n\n                      </div>\n\n                    </div>\n\n                  </div>\n\n                </div>\n\n              </div>\n\n              <div data-id="97c6b26" class="elementor-element elementor-element-97c6b26 elementor-column elementor-col-50 elementor-top-column"\n\n                data-element_type="column">\n\n                <div class="elementor-column-wrap elementor-element-populated">\n\n                  <div class="elementor-widget-wrap">\n\n                    <div data-id="a5d524f" class="elementor-element elementor-element-a5d524f elementor-align-right elementor-mobile-align-right elementor-widget elementor-widget-icon-list"\n\n                      data-element_type="icon-list.default">\n\n                      <div class="elementor-widget-container">\n\n                        <ul class="elementor-icon-list-items elementor-inline-items">\n\n                          <li class="elementor-icon-list-item" tappable (click)="clearConsole()">\n\n                            <span class="elementor-icon-list-icon">\n\n                              <ion-icon name="trash"></ion-icon>\n\n                            </span>\n\n                            <span class="elementor-icon-list-text"></span>\n\n                          </li>\n\n                          <li class="elementor-icon-list-item" tappable (click)="maximiseConsole()">\n\n                            <span class="elementor-icon-list-icon">\n\n                              <ion-icon name="arrow-up"></ion-icon>\n\n                            </span>\n\n                            <span class="elementor-icon-list-text"></span>\n\n                          </li>\n\n                          <li class="elementor-icon-list-item" tappable (click)="minimizeConsole()">\n\n                            <span class="elementor-icon-list-icon">\n\n                              <ion-icon name="close"></ion-icon>\n\n                            </span>\n\n                            <span class="elementor-icon-list-text"></span>\n\n                          </li>\n\n                        </ul>\n\n                      </div>\n\n                    </div>\n\n                  </div>\n\n                </div>\n\n              </div>\n\n            </div>\n\n          </div>\n\n        </section>\n\n        <div #myContent class="my-content">\n\n          <!-- *ngIf="flag == \'console\'" -->\n\n          <section *ngIf="flag == \'console\'" data-id="c346110" class="section3 elementor-element elementor-element-c346110 elementor-section-stretched elementor-section-full_width elementor-section-height-default elementor-section-height-default elementor-section-content-top elementor-section elementor-top-section"\n\n            data-settings="{&quot;background_background&quot;:&quot;classic&quot;}" data-element_type="section" style="width: 100%; left: 0px;">\n\n            <div class="elementor-container elementor-column-gap-no" *ngFor="let datapoint of data; index as i" [ngStyle]="{\'margin-left\' : datapoint.indent != undefined? datapoint.indent+\'px\' : \'0px\'}">\n\n              <div class="elementor-row">\n\n                <div data-id="4d695f3" class="elementor-element elementor-element-4d695f3 elementor-column elementor-col-33 elementor-top-column"\n\n                  data-element_type="column">\n\n                  <div class="elementor-column-wrap elementor-element-populated">\n\n                    <div class="elementor-widget-wrap">\n\n                      <div data-id="3c7074d" class="elementor-element elementor-element-3c7074d elementor-align-center elementor-mobile-align-left elementor-widget elementor-widget-button"\n\n                        data-element_type="button.default">\n\n                        <div class="elementor-widget-container">\n\n                          <div class="elementor-button-wrapper">\n\n                            <a class="elementor-button elementor-size-xs" role="button">\n\n                              <span class="elementor-button-content-wrapper">\n\n                                <span class="elementor-button-icon elementor-align-icon-left" [ngStyle]="{\'color\' : datapoint.type!=\'indent\'?maps[datapoint.type].color : maps[data[i-1].type].color}">\n\n                                  <!-- <i class="fa" [ngClass]="maps[datapoint.type].icon" aria-hidden="true"></i> -->\n\n                                  <ion-icon [name]="maps[datapoint.type].icon"></ion-icon>\n\n                                </span>\n\n                                <span class="elementor-button-text"></span>\n\n                              </span>\n\n                            </a>\n\n                          </div>\n\n                        </div>\n\n                      </div>\n\n                    </div>\n\n                  </div>\n\n                </div>\n\n                <div data-id="4f728fa" class="elementor-element elementor-element-4f728fa elementor-column elementor-col-33 elementor-top-column"\n\n                  data-element_type="column">\n\n                  <div class="elementor-column-wrap elementor-element-populated">\n\n                    <div class="elementor-widget-wrap">\n\n                      <div data-id="2ba8b2c" class="elementor-element elementor-element-2ba8b2c elementor-widget elementor-widget-text-editor"\n\n                        data-element_type="text-editor.default">\n\n                        <div class="elementor-widget-container">\n\n                          <div class="elementor-text-editor elementor-clearfix">\n\n                            <!-- <p>{{datapoint.message}}</p> -->\n\n                            <p [innerHTML]="datapoint.message" [ngStyle]="{\'color\' : datapoint.fullColor? maps[datapoint.type].color : \'#f8f8f8\'}"></p>\n\n                          </div>\n\n                        </div>\n\n                      </div>\n\n                    </div>\n\n                  </div>\n\n                </div>\n\n                <div data-id="2684700" class="elementor-element elementor-element-2684700 elementor-column elementor-col-33 elementor-top-column"\n\n                  data-element_type="column">\n\n                  <div class="elementor-column-wrap elementor-element-populated">\n\n                    <div class="elementor-widget-wrap">\n\n                      <div data-id="19231e8" class="elementor-element elementor-element-19231e8 elementor-widget elementor-widget-text-editor"\n\n                        data-element_type="text-editor.default">\n\n                        <div class="elementor-widget-container">\n\n                          <div class="elementor-text-editor elementor-clearfix">\n\n                            <p *ngIf="datapoint.indent==undefined" [ngStyle]="{\'color\' : datapoint.fullColor? maps[datapoint.type].color : \'#f8f8f8\'}">\n\n                              [ {{datapoint.timestamp | date:\'hh : mm : ss\'}} ]\n\n                            </p>\n\n                          </div>\n\n                        </div>\n\n                      </div>\n\n                    </div>\n\n                  </div>\n\n                </div>\n\n              </div>\n\n            </div>\n\n          </section>\n\n          <!-- <ng-template [ngIf]="flag == \'terminal\'">\n\n            <terminal [resize]="resizeEvent"></terminal>\n\n          </ng-template> -->\n\n          <terminal [ngStyle]="{\'height\' :flag != \'terminal\'? \'0px\' : \'100%\'}" [resize]="resizeEvent"></terminal>\n\n        </div>\n\n      </div>\n\n    </div>\n\n  </div>\n\n</div>\n\n'/*ion-inline-end:"G:\ionic\Project\quark\src\components\console\console.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__providers_global_service_global_service__["a" /* GlobalServiceProvider */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* Events */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"]])
    ], ConsoleComponent);
    return ConsoleComponent;
}());

//# sourceMappingURL=console.js.map

/***/ }),

/***/ 501:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MenuBarComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__user_pop_over_user_pop_over__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_authentication_service_authentication_service__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_electron_service_electron_service__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_global_service_global_service__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var MenuBarComponent = /** @class */ (function () {
    function MenuBarComponent(popoverCtrl, asp, esp, gsp, events, zone) {
        var _this = this;
        this.popoverCtrl = popoverCtrl;
        this.asp = asp;
        this.esp = esp;
        this.gsp = gsp;
        this.events = events;
        this.zone = zone;
        this.isOpen = false;
        this.popOver = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_1__user_pop_over_user_pop_over__["a" /* UserPopOverComponent */], {}, {
            cssClass: 'mtr-user-popover'
        });
        this.userName = '';
        this.runningIsAllowed = true;
        this.popOver.onDidDismiss(function () {
            _this.isOpen = false;
        });
        this.asp.user.subscribe(function (val) {
            _this.zone.run(function () {
                if (val != null) {
                    _this.userName = val.displayName;
                }
                else
                    _this.userName = '';
            });
        });
        this.events.subscribe('electron-service-dump : menu-bar && console : run-zone', function () {
            _this.zone.run(function () {
                console.log('Updating zone');
            });
        });
    }
    MenuBarComponent.prototype.clicked = function (event) {
        var _this = this;
        switch (event) {
            case 'minus':
                this.esp.minimize();
                break;
            case 'maximize':
                this.esp.maximise();
                break;
            case 'close':
                this.esp.closeWindow();
                break;
            case 'run-setup':
                if (this.runningIsAllowed) {
                    this.runningIsAllowed = false;
                    this.events.publish('component-menu-bar : electron-service : run-setup');
                    setTimeout(function () {
                        _this.runningIsAllowed = true;
                    }, 1000);
                }
                break;
            case 'stop':
                this.events.publish('component-menu-bar : electron-service : stop');
                break;
        }
    };
    MenuBarComponent.prototype.toggleUserPopOver = function (event) {
        if (this.isOpen) {
            this.popOver.dismiss();
            this.isOpen = false;
        }
        else {
            this.popOver.present({
                ev: event,
            });
            this.isOpen = true;
        }
    };
    MenuBarComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'menu-bar',template:/*ion-inline-start:"G:\ionic\Project\quark\src\components\menu-bar\menu-bar.html"*/'<!-- <div class="page-template page-template-elementor_canvas page page-id-269 woocommerce-js elementor-default elementor-template-canvas elementor-page elementor-page-269"\n\n  data-elementor-device-mode="mobile">\n\n  <div class="elementor elementor-269">\n\n    <div class="elementor-inner">\n\n      <div class="elementor-section-wrap">\n\n        <section data-id="4b7c88c" class="elementor-element elementor-element-4b7c88c elementor-section-stretched elementor-section-full_width elementor-section-height-default elementor-section-height-default elementor-section-content-middle elementor-section elementor-top-section"\n\n          data-settings="{&quot;background_background&quot;:&quot;classic&quot;}" data-element_type="section" style="width: 100%; left: 0px;">\n\n          <div class="elementor-container elementor-column-gap-no">\n\n            <div class="elementor-row">\n\n              <div data-id="a9d672e" class="elementor-element elementor-element-a9d672e mtr-title elementor-column elementor-col-14 elementor-top-column"\n\n                data-element_type="column">\n\n                <div class="elementor-column-wrap elementor-element-populated">\n\n                  <div class="elementor-widget-wrap">\n\n                    <div data-id="beb4cce" class="elementor-element elementor-element-beb4cce elementor-widget elementor-widget-heading" data-element_type="heading.default">\n\n                      <div class="elementor-widget-container">\n\n                        <h2 class="elementor-heading-title elementor-size-medium">{{this.gsp.electronConfig.parsedPath?this.gsp.electronConfig.parsedPath.name : \'Quark\' }}</h2>\n\n                      </div>\n\n                    </div>\n\n                  </div>\n\n                </div>\n\n              </div>\n\n              <div (click)="clicked(\'run-setup\')" tappable data-id="4debfca" class="elementor-element elementor-element-4debfca mtr-menu-bar elementor-column elementor-col-14 elementor-top-column"\n\n                data-element_type="column">\n\n                <div class="elementor-column-wrap elementor-element-populated">\n\n                  <div class="elementor-widget-wrap">\n\n                    <div data-id="d57c3a2" class="elementor-element elementor-element-d57c3a2 elementor-align-center elementor-widget elementor-widget-button"\n\n                      data-element_type="button.default">\n\n                      <div class="elementor-widget-container">\n\n                        <div class="elementor-button-wrapper">\n\n                          <a class="elementor-button elementor-size-lg" role="button">\n\n                            <span class="elementor-button-content-wrapper">\n\n                              <span class="elementor-button-icon elementor-align-icon-left">\n\n                                <ion-icon name="play"></ion-icon>\n\n                              </span>\n\n                              <span class="elementor-button-text"></span>\n\n                            </span>\n\n                          </a>\n\n                        </div>\n\n                      </div>\n\n                    </div>\n\n                  </div>\n\n                </div>\n\n              </div>\n\n              <div (click)="clicked(\'stop\')" tappable data-id="ed36998" class="elementor-element elementor-element-ed36998 mtr-menu-bar elementor-column elementor-col-14 elementor-top-column"\n\n                data-element_type="column">\n\n                <div class="elementor-column-wrap elementor-element-populated">\n\n                  <div class="elementor-widget-wrap">\n\n                    <div data-id="5fa193b" class="elementor-element elementor-element-5fa193b elementor-align-center elementor-widget elementor-widget-button"\n\n                      data-element_type="button.default">\n\n                      <div class="elementor-widget-container">\n\n                        <div class="elementor-button-wrapper">\n\n                          <a class="elementor-button elementor-size-lg" role="button">\n\n                            <span class="elementor-button-content-wrapper">\n\n                              <span class="elementor-button-icon elementor-align-icon-left">\n\n                                <ion-icon name="square"></ion-icon>\n\n                              </span>\n\n                              <span class="elementor-button-text"></span>\n\n                            </span>\n\n                          </a>\n\n                        </div>\n\n                      </div>\n\n                    </div>\n\n                  </div>\n\n                </div>\n\n              </div>\n\n              <div (click)="toggleUserPopOver($event)" data-id="b8b4b37" class="mtr-user-name elementor-element elementor-element-b8b4b37 mtr-menu-user-name elementor-column elementor-col-14 elementor-top-column"\n\n                data-element_type="column">\n\n                <div class="elementor-column-wrap elementor-element-populated">\n\n                  <div class="elementor-widget-wrap">\n\n                    <div data-id="dfd8db3" class="elementor-element elementor-element-dfd8db3 elementor-widget elementor-widget-text-editor"\n\n                      data-element_type="text-editor.default">\n\n                      <div class="elementor-widget-container">\n\n                        <div class="elementor-text-editor elementor-clearfix">\n\n                          <p>{{userName.length ==0? \'User\' : userName}}dsfdsfdsfdsfdsfdsfdsfdsfdfdsffdsfdsfdsfds</p>\n\n                        </div>\n\n                      </div>\n\n                    </div>\n\n                  </div>\n\n                </div>\n\n              </div>\n\n              <div (click)="clicked(\'minus\')" data-id="ef9577e" class="elementor-element elementor-element-ef9577e mtr-menu-bar elementor-column elementor-col-14 elementor-top-column"\n\n                data-element_type="column">\n\n                <div class="elementor-column-wrap elementor-element-populated">\n\n                  <div class="elementor-widget-wrap">\n\n                    <div data-id="273e741" class="elementor-element elementor-element-273e741 elementor-align-center elementor-widget elementor-widget-button"\n\n                      data-element_type="button.default">\n\n                      <div class="elementor-widget-container">\n\n                        <div class="elementor-button-wrapper">\n\n                          <a class="elementor-button elementor-size-lg" role="button">\n\n                            <span class="elementor-button-content-wrapper">\n\n                              <span class="elementor-button-icon elementor-align-icon-left">\n\n                                <ion-icon name="remove"></ion-icon>\n\n                              </span>\n\n                              <span class="elementor-button-text"></span>\n\n                            </span>\n\n                          </a>\n\n                        </div>\n\n                      </div>\n\n                    </div>\n\n                  </div>\n\n                </div>\n\n              </div>\n\n              <div (click)="clicked(\'maximize\')" data-id="96fc0c0" class="elementor-element elementor-element-96fc0c0 mtr-menu-bar elementor-column elementor-col-14 elementor-top-column"\n\n                data-element_type="column">\n\n                <div class="elementor-column-wrap elementor-element-populated">\n\n                  <div class="elementor-widget-wrap">\n\n                    <div data-id="dd7cf60" class="elementor-element elementor-element-dd7cf60 elementor-align-center elementor-widget elementor-widget-button"\n\n                      data-element_type="button.default">\n\n                      <div class="elementor-widget-container">\n\n                        <div class="elementor-button-wrapper">\n\n                          <a class="elementor-button elementor-size-lg" role="button">\n\n                            <span class="elementor-button-content-wrapper">\n\n                              <span class="elementor-button-icon elementor-align-icon-left">\n\n                                <ion-icon name="expand"></ion-icon>\n\n                              </span>\n\n                              <span class="elementor-button-text"></span>\n\n                            </span>\n\n                          </a>\n\n                        </div>\n\n                      </div>\n\n                    </div>\n\n                  </div>\n\n                </div>\n\n              </div>\n\n              <div (click)="clicked(\'close\')" data-id="b4145b7" class="elementor-element elementor-element-b4145b7 mtr-menu-bar elementor-column elementor-col-14 elementor-top-column"\n\n                data-element_type="column">\n\n                <div class="elementor-column-wrap elementor-element-populated">\n\n                  <div class="elementor-widget-wrap">\n\n                    <div data-id="b9e53da" class="elementor-element elementor-element-b9e53da elementor-align-center elementor-widget elementor-widget-button"\n\n                      data-element_type="button.default">\n\n                      <div class="elementor-widget-container">\n\n                        <div class="elementor-button-wrapper">\n\n                          <a class="elementor-button elementor-size-lg" role="button">\n\n                            <span class="elementor-button-content-wrapper">\n\n                              <span class="elementor-button-icon elementor-align-icon-left">\n\n                                <ion-icon name="close"></ion-icon>\n\n                              </span>\n\n                              <span class="elementor-button-text"></span>\n\n                            </span>\n\n                          </a>\n\n                        </div>\n\n                      </div>\n\n                    </div>\n\n                  </div>\n\n                </div>\n\n              </div>\n\n            </div>\n\n          </div>\n\n        </section>\n\n      </div>\n\n    </div>\n\n  </div>\n\n</div>\n\n<mat-progress-bar mode="indeterminate" *ngIf="this.gsp.showLoading" [ngStyle]="{\'max-height\' : \'1px\'}"></mat-progress-bar> -->\n\n<div class="menu-bar">\n\n  <div class="heading-container">\n\n    <span>{{this.gsp.electronConfig.parsedPath?this.gsp.electronConfig.parsedPath.name : \'Quark\' }}</span>\n\n  </div>\n\n  <div class="right-container">\n\n    <div class="action-container">\n\n      <ion-icon (click)="clicked(\'run-setup\')" tappable name="play"></ion-icon>\n\n      <ion-icon (click)="clicked(\'stop\')" tappable name="square"></ion-icon>\n\n    </div>\n\n    <div class="utility-container">\n\n      <span (click)="toggleUserPopOver($event)" tappable>{{userName.length ==0? \'User\' : userName}}</span>\n\n      <ion-icon (click)="clicked(\'minus\')" name="remove"></ion-icon>\n\n      <ion-icon (click)="clicked(\'maximize\')" name="expand"></ion-icon>\n\n      <ion-icon class="close-button" (click)="clicked(\'close\')" name="close"></ion-icon>\n\n    </div>\n\n  </div>\n\n</div>\n\n'/*ion-inline-end:"G:\ionic\Project\quark\src\components\menu-bar\menu-bar.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* PopoverController */], __WEBPACK_IMPORTED_MODULE_3__providers_authentication_service_authentication_service__["a" /* AuthenticationServiceProvider */], __WEBPACK_IMPORTED_MODULE_4__providers_electron_service_electron_service__["a" /* ElectronServiceProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_global_service_global_service__["a" /* GlobalServiceProvider */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* Events */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"]])
    ], MenuBarComponent);
    return MenuBarComponent;
}());

//# sourceMappingURL=menu-bar.js.map

/***/ }),

/***/ 502:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TerminalComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_electron_service_electron_service__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_global_service_global_service__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var TerminalComponent = /** @class */ (function () {
    function TerminalComponent(platform, injector, gsp, events) {
        var _this = this;
        this.platform = platform;
        this.injector = injector;
        this.gsp = gsp;
        this.events = events;
        this.resize = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["Subject"]();
        this.fontSize = 12;
        this.isFirstWrite = true;
        this.npmString = '';
        this.esp = this.injector.get(__WEBPACK_IMPORTED_MODULE_3__providers_electron_service_electron_service__["a" /* ElectronServiceProvider */]);
        this.events.subscribe('electron-service : component-console && component-terminal : run-npm-install', function (npmString) {
            _this.npmString = npmString;
            _this.changeDirectory();
        });
    }
    TerminalComponent.prototype.testResize = function (e) {
        console.log(e);
    };
    TerminalComponent.prototype.changeDirectory = function () {
        this.xterm.dispose();
        this.ptyProcess.kill();
        this.injectTerminal();
    };
    TerminalComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.injectTerminal();
        this.resize.subscribe(function () {
            _this.resizeEvent();
        });
        this.resizeEvent();
    };
    TerminalComponent.prototype.ngOnDestroy = function () {
        this.xterm.dispose();
        this.ptyProcess.kill();
    };
    TerminalComponent.prototype.resizeEvent = function () {
        if (this.platform.is('electron')) {
            var num = Math.floor(this.xtermContainerElement.nativeElement.clientHeight / (this.fontSize + 2)) * (this.fontSize + 2);
            this.xtermElement.nativeElement.style.height = num + "px";
            this.fit(this.xterm);
        }
    };
    TerminalComponent.prototype.injectTerminal = function () {
        var self = this;
        if (this.platform.is('electron')) {
            this.isFirstWrite = true;
            var os = __webpack_require__(503);
            var pty = __webpack_require__(504);
            var shell = process.env[os.platform() === 'win32' ? 'cmd.exe' : 'SHELL'];
            this.ptyProcess = pty.spawn(shell, [], {
                name: 'xterm-color',
                cols: 120,
                rows: 24,
                cwd: this.gsp.electronConfig.parsedPath ? this.gsp.electronConfig.parsedPath.dir : this.esp.mainProcess.cwd(),
                env: this.esp.mainProcess.env
            });
            var Terminal_1 = __webpack_require__(505).Terminal;
            this.fit = __webpack_require__(506).fit;
            this.xterm = new Terminal_1();
            this.xterm.open(this.xtermElement.nativeElement);
            this.xtermOptions();
            this.fit(this.xterm);
            this.xterm.on('data', function (data) {
                self.ptyProcess.write(data);
            });
            this.ptyProcess.on('data', function (data) {
                self.xterm.write(data);
                if (self.isFirstWrite) {
                    self.isFirstWrite = false;
                    self.ptyProcess.write(self.npmString);
                }
            });
        }
    };
    TerminalComponent.prototype.xtermOptions = function () {
        this.xterm.setOption('fontSize', this.fontSize);
        this.theme = {
            background: '#488aff',
            foreground: '#9381ff',
            cursor: '#9381ff'
        };
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('xterm'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], TerminalComponent.prototype, "xtermElement", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('xtermContainer'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], TerminalComponent.prototype, "xtermContainerElement", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('resize'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["Subject"])
    ], TerminalComponent.prototype, "resize", void 0);
    TerminalComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'terminal',template:/*ion-inline-start:"G:\ionic\Project\quark\src\components\terminal\terminal.html"*/'<div #xtermContainer class="xterm-container">\n\n  <div #xterm class="xterm-element"></div>\n\n</div>\n\n'/*ion-inline-end:"G:\ionic\Project\quark\src\components\terminal\terminal.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injector"], __WEBPACK_IMPORTED_MODULE_4__providers_global_service_global_service__["a" /* GlobalServiceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */]])
    ], TerminalComponent);
    return TerminalComponent;
}());

//# sourceMappingURL=terminal.js.map
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(90)))

/***/ }),

/***/ 503:
/***/ (function(module, exports) {

module.exports = require('os');

/***/ }),

/***/ 504:
/***/ (function(module, exports) {

module.exports = require('node-pty');

/***/ }),

/***/ 505:
/***/ (function(module, exports) {

module.exports = require('xterm');

/***/ }),

/***/ 516:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CodeMirrorPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_global_service_global_service__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_material__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utilities_code_samples__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_codemirror__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_codemirror___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_codemirror__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_js_beautify__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_js_beautify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_js_beautify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_code_editor_code_editor__ = __webpack_require__(269);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__render_components_dump__ = __webpack_require__(400);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_global_service_global_service_dump__ = __webpack_require__(152);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var CodeMirrorPage = /** @class */ (function () {
    function CodeMirrorPage(navCtrl, snackBar, gsp, events, resolver) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.snackBar = snackBar;
        this.gsp = gsp;
        this.events = events;
        this.resolver = resolver;
        this.document = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["Subject"]();
        this.tab = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["Subject"]();
        this.mouseMoveEvent = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["Subject"]();
        this.mouseLeaveEvent = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["Subject"]();
        this.stayFixed = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["Subject"]();
        this.currentComponentClassName = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["Subject"]();
        this.interface = '';
        this.isSnackbarOpen = false;
        this.events.subscribe('page-menu : page-designer && page-code-mirror : add-component', function (component) {
            Object(__WEBPACK_IMPORTED_MODULE_9__render_components_dump__["a" /* addComponentFromDump */])(component, _this.fakeContainer, _this.resolver);
            __WEBPACK_IMPORTED_MODULE_10__providers_global_service_global_service_dump__["d" /* logger */].log(component.component ? "Adding component " + component.component : "Adding class " + component.class);
        });
        this.events.subscribe('page-designer : page-code-mirror : open-tab', function () {
            _this.updateDocuments(_this.gsp.currentTab);
        });
    }
    CodeMirrorPage.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.updateDocuments(this.gsp.currentTab);
        this.tab.subscribe(function (tab) {
            _this.closeTab(tab);
        });
        setTimeout(function () {
            _this.updateDocuments(_this.gsp.currentTab);
        }, 100);
    };
    CodeMirrorPage.prototype.ngOnDestroy = function () {
        clearInterval(this.styleInterval);
        this.snackBar.dismiss();
        this.events.unsubscribe('page-menu : page-code-mirror : add-component');
    };
    CodeMirrorPage.prototype.showSnackBar = function () {
        var _this = this;
        if (this.isSnackbarOpen) {
            this.snackBar.dismiss();
            this.isSnackbarOpen = false;
        }
        else {
            var config = {
                data: { inputDoc: new __WEBPACK_IMPORTED_MODULE_6_codemirror___default.a.Doc(this.interface, "text/x-java"), mode: 'Interface' },
                horizontalPosition: 'right',
                panelClass: 'mtr-code-editor-component-snack-bar',
                announcementMessage: "Hello"
            };
            var ref = this.snackBar.openFromComponent(__WEBPACK_IMPORTED_MODULE_8__components_code_editor_code_editor__["a" /* CodeEditorComponent */], config);
            var obs = ref.afterOpened();
            obs.subscribe(function (val) {
                _this.isSnackbarOpen = true;
            });
        }
    };
    CodeMirrorPage.prototype.lockContent = function (event) {
        event.preventDefault();
        this.stayFixed.next(true);
        var config = {
            duration: 1000,
            horizontalPosition: 'right'
        };
        this.snackBar.open('Content Locked', '', config);
    };
    CodeMirrorPage.prototype.preventRightClick = function (event) {
        event.preventDefault();
    };
    CodeMirrorPage.prototype.closeTab = function (tab) {
        var _this = this;
        this.gsp.tabsArray.forEach(function (val, index, array) {
            if (val == tab) {
                _this.gsp.tabsArray.splice(index, 1);
                if (array.length > 0) {
                    if (array.length == index) {
                        _this.gsp.currentTab = array[index - 1];
                    }
                    else {
                        _this.gsp.currentTab = array[index];
                    }
                }
                _this.updateDocuments(_this.gsp.currentTab);
                //Bug
                setTimeout(function () {
                    _this.updateDocuments(_this.gsp.currentTab);
                }, 50);
            }
        });
    };
    CodeMirrorPage.prototype.mouseMove = function (event) {
        this.mouseMoveEvent.next(event);
    };
    CodeMirrorPage.prototype.mouseLeave = function () {
        this.mouseLeaveEvent.next('');
    };
    CodeMirrorPage.prototype.updateDocuments = function (currentTab) {
        var _this = this;
        clearInterval(this.styleInterval);
        if (currentTab.other == undefined) {
            this.gsp.designerComponents.map(function (val) {
                if (val.data.config.id == currentTab.component.data.config.id) {
                    if (currentTab.mode != "CSS") {
                        _this.document.next(_this.gsp.currentTab.component.data.code.js);
                        _this.addInterface(_this.gsp.currentTab.component.data.config.component);
                    }
                    else {
                        _this.document.next(_this.gsp.currentTab.component.data.code.css);
                        _this.currentComponentClassName.next(_this.gsp.currentTab.component.data.config.css_class);
                        _this.container.clear();
                        Object(__WEBPACK_IMPORTED_MODULE_9__render_components_dump__["c" /* recreateComponenFromDump */])(_this.gsp.currentTab.component, _this.container, _this.resolver);
                        _this.styleInterval = setInterval(function () {
                            _this.gsp.addCSS(_this.gsp.currentTab.component.data);
                        }, 1000);
                        Object(__WEBPACK_IMPORTED_MODULE_9__render_components_dump__["b" /* addGlobalCSSFromDump */])(_this.gsp.global_config.css.getValue());
                    }
                }
            });
        }
        else if (currentTab.other == "globalConfigJSON") {
            this.document.next(this.gsp.global_config.json);
            this.interface = Object(__WEBPACK_IMPORTED_MODULE_7_js_beautify__["js_beautify"])(__WEBPACK_IMPORTED_MODULE_5__utilities_code_samples__["a" /* GlobalConfigInterfaceSample */]);
        }
        else if (currentTab.other == "globalConfigCSS") {
            this.document.next(this.gsp.global_config.css);
        }
        else if (currentTab.other == "globalConfigSetup") {
            this.document.next(this.gsp.global_config.code);
        }
        else if (currentTab.other == "globalConfigDefaultSettings") {
            this.document.next(this.gsp.global_config.defaultSettings);
        }
    };
    CodeMirrorPage.prototype.addInterface = function (component) {
        console.log(component);
        switch (component) {
            case 'MtrButtonComponent':
                this.interface = Object(__WEBPACK_IMPORTED_MODULE_7_js_beautify__["js_beautify"])(__WEBPACK_IMPORTED_MODULE_5__utilities_code_samples__["b" /* MTRButtonComponentInterfaceSample */]);
                break;
            default:
                this.interface = Object(__WEBPACK_IMPORTED_MODULE_7_js_beautify__["js_beautify"])(__WEBPACK_IMPORTED_MODULE_5__utilities_code_samples__["b" /* MTRButtonComponentInterfaceSample */]);
                break;
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('tab'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["Subject"])
    ], CodeMirrorPage.prototype, "tab", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('container', { read: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"] }),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"])
    ], CodeMirrorPage.prototype, "container", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('fakeContainer', { read: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"] }),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"])
    ], CodeMirrorPage.prototype, "fakeContainer", void 0);
    CodeMirrorPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-code-mirror',template:/*ion-inline-start:"G:\ionic\Project\quark\src\pages\code-mirror\code-mirror.html"*/'<div [ngClass]="{\'mtr-editor-container\' : true, \'mtr-split-screen\' : this.gsp.currentTab.mode == \'CSS\' && this.gsp.currentTab.component != undefined, \'mtr-split-screen\' : this.gsp.currentTab.other == \'globalConfigDefaultSettings\'}">\n\n  <!-- <code-editor [inputDocument]="document" [mode]="this.gsp.currentTab.mode" (showInterface)="showSnackBar()"></code-editor> -->\n\n  <!-- <code-editor [mode]="this.gsp.currentTab.mode" (showInterface)="showSnackBar()"></code-editor> -->\n\n  <monaco-editor [document]="document" (showInterface)="showSnackBar()"></monaco-editor>\n\n</div>\n\n<div [ngClass]="{\'rendered-component\' : true, \'display-rendered-component\' :this.gsp.currentTab.mode == \'CSS\' && this.gsp.currentTab.component != undefined}">\n\n  <div (mousemove)="mouseMove($event)" (mouseleave)="mouseLeave()" (contextmenu)="lockContent($event)" (click)="lockContent($event)"\n\n    class="mtr-component-container mtr-inner-container">\n\n    <div #container></div>\n\n  </div>\n\n  <css-inspector [mouseMoveEvent]="mouseMoveEvent" [mouseLeaveEvent]="mouseLeaveEvent" [stayFixed]="stayFixed" [currentComponentClass]="currentComponentClassName"></css-inspector>\n\n</div>\n\n<settings *ngIf="this.gsp.currentTab.other == \'globalConfigDefaultSettings\'"></settings>\n\n<div style="display: none">\n\n  <ng-template #fakeContainer></ng-template>\n\n</div>\n\n'/*ion-inline-end:"G:\ionic\Project\quark\src\pages\code-mirror\code-mirror.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_4__angular_material__["k" /* MatSnackBar */],
            __WEBPACK_IMPORTED_MODULE_2__providers_global_service_global_service__["a" /* GlobalServiceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ComponentFactoryResolver"]])
    ], CodeMirrorPage);
    return CodeMirrorPage;
}());

//# sourceMappingURL=code-mirror.js.map

/***/ }),

/***/ 517:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_global_service_global_service__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_codemirror__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_codemirror___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_codemirror__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common__ = __webpack_require__(7);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};





var SettingsComponent = /** @class */ (function () {
    function SettingsComponent(gsp, document) {
        this.gsp = gsp;
        this.document = document;
        this.doc = new __WEBPACK_IMPORTED_MODULE_2_rxjs__["BehaviorSubject"](this.gsp.global_config.userSettings);
    }
    SettingsComponent.prototype.prepareJSON = function (object, key) {
        var str = '';
        for (var obj in object) {
            if (typeof object[obj] == 'string') {
                str = String().concat(str, "\n          '" + (key != undefined ? key + '.' : '') + obj + "':'" + object[obj] + "',");
            }
            else {
                str = String().concat(str, this.prepareJSON(object[obj], "" + (key != undefined ? key + '.' : '') + obj));
            }
        }
        return str;
    };
    SettingsComponent.prototype.changeSettings = function (settings) {
        if (settings == 'project') {
            // this.doc.next(this.gsp.global_config.projectSettings);
            console.log(JSON.parse(this.gsp.global_config.defaultSettings.getValue()));
            var json = this.prepareJSON(JSON.parse(this.gsp.global_config.defaultSettings.getValue()));
            this.doc.next(new __WEBPACK_IMPORTED_MODULE_3_codemirror___default.a.Doc(json));
        }
        else {
            this.doc.next(this.gsp.global_config.userSettings);
        }
    };
    SettingsComponent.prototype.updateTheme = function () {
        try {
            var settings = JSON.parse(this.doc.getValue().getValue());
            for (var _i = 0, _a = Object.keys(settings); _i < _a.length; _i++) {
                var value = _a[_i];
                var object = value.split('.', 7);
                if (object[0] == 'styles') {
                    if (object[1] == 'theme') {
                        this.document.documentElement.style.setProperty("--" + object[2] + "-color-" + object[3], "" + settings[value]);
                        console.log("--" + object[2] + "-color-" + object[3], "" + settings[value]);
                    }
                }
            }
        }
        catch (err) {
            null;
        }
    };
    SettingsComponent.prototype.ngAfterViewInit = function () {
        // this.doc.next(this.gsp.global_config.userSettings);
        // this.interval = setInterval(() => {
        //   this.updateTheme();
        // }, 1000);
    };
    SettingsComponent.prototype.ngOnDestroy = function () {
        clearInterval(this.interval);
    };
    SettingsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'settings',template:/*ion-inline-start:"G:\ionic\Project\quark\src\components\settings\settings.html"*/'<div class="buttons-container">\n  <button ion-button (click)="changeSettings(\'project\')"> Project Settings</button>\n  <button ion-button (click)="changeSettings(\'user\')"> User Settings</button>\n</div>\n<!-- <code-editor [inputDocument]="doc" [mode]="this.gsp.currentTab.mode"></code-editor> -->\n<monaco-editor [document]="doc"></monaco-editor>\n'/*ion-inline-end:"G:\ionic\Project\quark\src\components\settings\settings.html"*/
        }),
        __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_4__angular_common__["c" /* DOCUMENT */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__providers_global_service_global_service__["a" /* GlobalServiceProvider */], Document])
    ], SettingsComponent);
    return SettingsComponent;
}());

//# sourceMappingURL=settings.js.map

/***/ }),

/***/ 66:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ElectronServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__global_service_global_service__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_material__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__electron_service_dump__ = __webpack_require__(263);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__electron_service_assets_child_process__ = __webpack_require__(477);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__electron_service_assets_save_open__ = __webpack_require__(162);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ElectronServiceProvider = /** @class */ (function () {
    function ElectronServiceProvider(platform, gsp, snackBar, events, zone) {
        var _this = this;
        this.platform = platform;
        this.gsp = gsp;
        this.snackBar = snackBar;
        this.events = events;
        this.zone = zone;
        this.openRecentDocumentsArray = [];
        this.childProcessIsRunning = false;
        this.isDevMode = true;
        this.dependencies = [];
        this.platform.is('electron') ? this.injectElectron() : console.log('Cannot Inject Electron');
        this.events.subscribe('component-menu-bar : electron-service : run-setup', function () {
            _this.killChildProcess();
            Object(__WEBPACK_IMPORTED_MODULE_5__electron_service_assets_child_process__["a" /* runChildProcessFromDump */])(_this);
        });
        this.events.subscribe('component-menu-bar : electron-service : stop', function () {
            _this.killChildProcess();
        });
        this.events.subscribe('misc-components : electron-service : child-process', function (data) {
            if (_this.childProcessIsRunning) {
                _this.childProcess.send(data);
            }
        });
        this.events.subscribe('component-new-file-dialog && component-my-dashboards : electron-service : close-snackbar', function () {
            _this.snackBarRef.dismiss();
        });
        this.events.subscribe('component-new-file-dialog : electron-service : create-new-file', function (data) {
            Object(__WEBPACK_IMPORTED_MODULE_4__electron_service_dump__["a" /* createNewFileFromDump */])(_this);
            _this.dependencies = data;
        });
    }
    ElectronServiceProvider.prototype.injectElectron = function () {
        var _a = __webpack_require__(478).remote, Menu = _a.Menu, MenuItem = _a.MenuItem, app = _a.app, dialog = _a.dialog, BrowserWindow = _a.BrowserWindow, getCurrentWebContents = _a.getCurrentWebContents, shell = _a.shell, getGlobal = _a.getGlobal;
        var _b = __webpack_require__(479), fork = _b.fork, exec = _b.exec;
        this.MenuItem = MenuItem;
        this.Menu = Menu;
        this.app = app;
        this.dialog = dialog;
        this.BrowserWindow = BrowserWindow;
        this.currentWebContents = getCurrentWebContents();
        this.shell = shell;
        this.fs = getGlobal('fileSystem');
        this.Path = getGlobal('path');
        this.mainProcess = getGlobal('process');
        this.fork = fork;
        this.exec = exec;
        console.log(process.argv, this.mainProcess.argv);
        if ("" + this.mainProcess.env.PATH_TO_OPEN_IN_NEW_WINDOW.length == '0') {
            if (this.mainProcess.argv[1] && !this.isDevMode) {
                this.mainProcess.env.PATH_TO_OPEN_IN_NEW_WINDOW = this.mainProcess.argv[1];
            }
        }
        Object(__WEBPACK_IMPORTED_MODULE_4__electron_service_dump__["c" /* newWindowHandleFromDump */])(this);
    };
    ElectronServiceProvider.prototype.runNpmInstall = function () {
        if (this.dependencies.length > 0) {
            var npmString_1 = '';
            if (this.dependencies[0].length > 0) {
                npmString_1 = String().concat(npmString_1, 'npm install --save');
                this.dependencies[0].map(function (dep) {
                    npmString_1 = String().concat(npmString_1, " " + dep.name + (dep.version ? dep.version : '') + " ");
                });
            }
            if (this.dependencies[1].length > 0) {
                npmString_1 = String().concat(npmString_1, this.dependencies[0].length > 0 ? ' && npm install --save-dev ' : 'npm install --save-dev');
                this.dependencies[1].map(function (dep) {
                    npmString_1 = String().concat(npmString_1, " " + dep.name + (dep.version ? dep.version : '') + " ");
                });
            }
            npmString_1 = String().concat(npmString_1, '\r');
            this.events.publish('electron-service : component-console && component-terminal : run-npm-install', npmString_1);
        }
    };
    ElectronServiceProvider.prototype.openInNewWindow = function () {
        var _this = this;
        this.dialog.showOpenDialog(this.BrowserWindow.fromWebContents(this.currentWebContents), {
            filters: [{
                    extensions: ['qrk'],
                    name: 'Quark'
                }],
            properties: ['openFile']
        }, function (filePath) {
            if (filePath) {
                Object(__WEBPACK_IMPORTED_MODULE_4__electron_service_dump__["b" /* createNewWindowFromDump */])(_this, filePath[0]);
            }
        });
    };
    ElectronServiceProvider.prototype.showNewFileDialog = function () {
        var _this = this;
        this.showAlert('info', 'Note', 'Do you want to create a package.json file and add external dependencies to your project?', ['Yes', 'No'])
            .then(function (val) {
            _this.zone.run(function () {
                if (val == 0) {
                    Object(__WEBPACK_IMPORTED_MODULE_4__electron_service_dump__["e" /* showSnackBarFromDump */])(_this, 'new-file-dialog');
                }
                else {
                    Object(__WEBPACK_IMPORTED_MODULE_6__electron_service_assets_save_open__["d" /* showSaveDialogFromDump */])(_this);
                }
            });
        })
            .catch(function (err) {
            console.log(err);
        });
    };
    ElectronServiceProvider.prototype.openExternalLink = function (url) {
        if (this.platform.is('electron')) {
            this.shell.openExternal(url);
        }
    };
    ElectronServiceProvider.prototype.showAlert = function (type, title, message, buttons) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.platform.is('electron')) {
                Object(__WEBPACK_IMPORTED_MODULE_4__electron_service_dump__["d" /* showAlertFromDump */])(_this, type, title, message, buttons, resolve);
            }
            else {
                reject();
            }
        });
    };
    ElectronServiceProvider.prototype.showSaveDialog = function () {
        if (this.platform.is('electron')) {
            Object(__WEBPACK_IMPORTED_MODULE_6__electron_service_assets_save_open__["d" /* showSaveDialogFromDump */])(this);
        }
    };
    ElectronServiceProvider.prototype.saveFile = function () {
        Object(__WEBPACK_IMPORTED_MODULE_6__electron_service_assets_save_open__["b" /* saveFileFromDump */])(this, this.gsp.electronConfig.parsedPath.dir);
    };
    ElectronServiceProvider.prototype.showOpenDialog = function () {
        if (this.platform.is('electron')) {
            Object(__WEBPACK_IMPORTED_MODULE_6__electron_service_assets_save_open__["c" /* showOpenDialogFromDump */])(this);
        }
    };
    ElectronServiceProvider.prototype.killChildProcess = function () {
        if (this.childProcessIsRunning) {
            this.childProcess.kill();
            // this.fs.unlink('./try.js', (err) => {
            //   console.log('Unlinking File', err);
            // });
        }
    };
    ElectronServiceProvider.prototype.minimize = function () {
        this.platform.is('electron') ?
            this.BrowserWindow.getFocusedWindow().minimize() : null;
    };
    ElectronServiceProvider.prototype.maximise = function () {
        if (this.platform.is('electron')) {
            if (this.BrowserWindow.getFocusedWindow().isMaximized()) {
                this.BrowserWindow.getFocusedWindow().unmaximize();
            }
            else {
                this.BrowserWindow.getFocusedWindow().maximize();
            }
        }
    };
    ElectronServiceProvider.prototype.closeWindow = function () {
        if (this.platform.is('electron')) {
            this.BrowserWindow.fromWebContents(this.currentWebContents).close();
            this.app.setBadgeCount(this.BrowserWindow.getAllWindows().length);
        }
    };
    ElectronServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__global_service_global_service__["a" /* GlobalServiceProvider */], __WEBPACK_IMPORTED_MODULE_3__angular_material__["k" /* MatSnackBar */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"]])
    ], ElectronServiceProvider);
    return ElectronServiceProvider;
}());

//# sourceMappingURL=electron-service.js.map
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(90)))

/***/ }),

/***/ 69:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return globalSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return packageJSON; });
/* unused harmony export suffix */
/* unused harmony export frameRatee */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return code_toggle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return code_button; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return code_range; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return firmata_config; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return MTRButtonComponentInterfaceSample; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GlobalConfigInterfaceSample; });
var staticStyles = {
    'theme': {
        'primary': {
            'code': '#3880ff',
            'shade': '#3171e0',
            'tint': '#4c8dff'
        },
        'secondary': {
            'code': '#0cd1e8',
            'shade': '#0bb8cc',
            'tint': '#24d6ea'
        },
        'tertiary': {
            'code': '#7044ff',
            'shade': '#633ce0',
            'tint': '#7e57ff'
        },
        'success': {
            'code': '#10dc60',
            'shade': '#0ec254',
            'tint': '#28e070'
        },
        'warning': {
            'code': '#ffce00',
            'shade': '#e0b500',
            'tint': '#ffd31a'
        },
        'danger': {
            'code': '#f04141',
            'shade': '#d33939',
            'tint': '#f25454'
        },
        'dark': {
            'code': '#222428',
            'shade': '#1e2023',
            'tint': '#383a3e'
        }, 'medium': {
            'code': '#989aa2',
            'shade': '#86888f',
            'tint': '#a2a4ab'
        },
        'light': {
            'code': '#f4f5f8',
            'shade': '#d7d8da',
            'tint': '#f5f6f9'
        },
    }
};
var theme = {
    'foreground': '#FF00FF',
    'background': '#000000',
    'cursor': '#c85ca5',
    'cursorAccent': '#25d55f',
    'selection': '#afc1cd',
    'black': '#001526',
    'red': '#ff4c48',
    'green': '#25d55f',
    'yellow': '#ffff9a',
    'blue': '#1384a6',
    'magenta': '#c85ca5',
    'cyan': '#79ddff',
    'white': '#f8f8f8',
    'brightBlack': '#001526',
    'brightRed': '#ff4c48',
    'brightGreen': '#25d55f',
    'brightYellow': '#ffff9a',
    'brightBlue': '#1384a6',
    'brightMagenta': '#c85ca5',
    'brightCyan': '#79ddff',
    'brightWhite': '#f8f8f8'
};
var terminal = {
    'fontSize': 14,
    'fontFamily': 'Georgia, serif',
    'fontWeight': 'normal',
    'fontWeightBold': 'bold',
    'bellStyle': 'none',
    'bellSound': null,
    'cursorStyle': 'block',
    'colors': null,
    'cols': 80,
    'rows': 24,
    'letterSpacing': null,
    'lineHeight': null,
    'tabStopWidth': null,
    'scrollback': null,
    'theme': theme,
    'shell.linux': '',
    'shell.osx': '',
    'shell.windows': '',
    'shellArgs.linux': [],
    'shellArgs.osx': [],
    'shellArgs.windows': [],
    'env.linux': {},
    'env.osx': {},
    'env.windows': {},
    'cwd': null
};
var globalSettings = {
    styles: staticStyles,
    terminal: terminal
};
var packageJSON = {
    name: "Quark App",
    version: "1.0.0",
    description: "A Quark app",
    main: "index.js",
    'private': true,
    scripts: {
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    dependencies: {},
    devDependencies: {},
    author: "Quark",
    homepage: "https://diymechatronics.com",
    license: 'ISC'
};
var suffix = "\n\nprocess.on('message', (msg)=> {\n  if(typeof msg == \"object\") {\n    closureObjectForInternalUse12213131[msg.functionName](msg.args);\n  }else{\n    process.exit(0);\n  }\n});\n\nlet argument = arguments;\nsetInterval(function (argument) {\n  process.send(argument);\n}, 1000 / frameRate);\n";
var frameRatee = "\nsetI\n\n";
var code_toggle = {
    js: "",
    css: ".toggle-container {\n      border: solid;\n  border-width: 2px;\n  border-color: #000;\n    }\n  "
};
var code_button = {
    js: "",
    css: ".button-container {\n      border: solid;\n  border-width: 2px;\n  border-color: #000;\n    }\n  "
};
var code_range = {
    js: "",
    css: ".button-container {\n      border: solid;\n  border-width: 2px;\n  border-color: #000;\n    }\n  "
};
var firmata_config = {
    js: {
        imports: [],
        rendered_views: [],
        frameRate: 30,
    },
    css: "\n    .mtr-outer-container{\n      /* background-color : #000;\n      min-height : 300px; */\n      width : 100%;\n    }\n    .mtr-inner-container{\n      display : flex;\n      flex-wrap : wrap;\n      justify-content : flex-start;\n    }\n  ",
    code: "\n  // var board = new five.Board({\n  //   port : \"COM3\",\n  //   repl : false     \n  // });\n  // board.on(\"ready\", function() {\n  //   var led = new five.Led(13);\n  //   led.blink(500);\n  // });\n  console.log(arguments);\n  "
};
"\n//display: flex;\n//flex-wrap: wrap;\n//justify-content: flex-start;\n// background-color : #1e1e1e;\n// height: 100%;\n";
var MTRButtonComponentInterfaceSample = "interface MTRButtonComponent {\n  content?: string | number;\n  color?: string;\n  disabled?: boolean;\n  block?: boolean;\n  clear?: boolean;\n  default?: boolean;\n  full?: boolean;\n  large?: boolean;\n  outline?: boolean;\n  round?: boolean;\n  small?: boolean;\n  strong?: boolean;\n}";
var GlobalConfigInterfaceSample = "interface GlobalConfigInterface {\n  global_variables?: Array<globalVariableInterface | string>;\n  components?: Array<johnnyFiveClassInterface>;\n  rendered_views?: Array<renderedViewInterface>;\n  analogRead?: Array<analogReadInterface>;\n  setup?: Function | string;\n  renderer_update_interval: number;\n  }\n\n  interface globalVariableInterface {\n    variable: string;\n    initialize?: any;\n}\n\ninterface johnnyFiveClassInterface {\n  class:\n  \"Accelerometer\" | \"Altimeter\" | \"Animation\" | \"Barometer\"\n  | \"Board\" | \"Boards\" | \"Button\" | \"Compass\" | \"ESC\" | \"ESCs\"\n  | \"Expander\" | \"Fn\" | \"GPS\" | \"Gyro\" | \"Hygrometer\" | \"IMU\"\n  | \"IR.Reflect.Array\" | \"Joystick\" | \"Keypad\" | \"LCD\" | \"Led\"\n  | \"Led.Digits\" | \"Led.Matrix\" | \"Led.RGB\" | \"Leds\"\n  | \"Light\" | \"Motion\" | \"Motor\" | \"Motors\" | \"Multi\" | \"Piezo\"\n  | \"Pin\" | \"Proximity\" | \"Relay\" | \"Relays\" | \"Sensor\" | \"Servo\"\n  | \"Servos\" | \"ShiftRegister\" | \"Stepper\" | \"Switch\" | \"Thermometer\"\n  variable: string;\n  arguments?: any;\n  setup?: Function;\n}\n\n  interface renderedViewInterface {\n    component: 'MtrToggleComponent' | 'MtrRangeComponent' | 'MtrButtonComponent';\n    id: number;\n    variable: string;\n    name?: string;  //For users convenience\n    description?: string  //For users convenience;\n}\n\ninterface renderedViewInterface {\n  component: 'MtrToggleComponent' | 'MtrRangeComponent' | 'MtrButtonComponent';\n  id: number;\n  variable: string;\n  name?: string;  //For users convenience\n  description?: string  //For users convenience;\n}\n\ninterface analogReadInterface {\n  variable: string;\n  pin: number;\n  interval: number;\n}";
//# sourceMappingURL=code-samples.js.map

/***/ }),

/***/ 776:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MonacoEditorComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_global_service_global_service__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var MonacoEditorComponent = /** @class */ (function () {
    function MonacoEditorComponent(gsp) {
        this.gsp = gsp;
        this.model = null;
        this.previousDocument = null;
        this.code = '';
        this.mode = this.gsp.currentTab.mode;
        this.editorOptions = { theme: 'vs-dark', language: 'json' };
    }
    MonacoEditorComponent.prototype.onInit = function (event) {
        console.log(event);
    };
    MonacoEditorComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.document.subscribe(function (doc) {
            _this.saveDocument();
            _this.code = doc.getValue();
            _this.previousDocument = doc;
            _this.changeTab();
            _this.changeTab();
        });
    };
    MonacoEditorComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.document.subscribe(function (doc) {
            _this.saveDocument();
            _this.mode = _this.gsp.currentTab.mode;
            _this.code = doc.getValue();
            _this.previousDocument = doc;
            _this.changeTab();
        });
    };
    MonacoEditorComponent.prototype.changeTab = function () {
        if (this.gsp.currentTab.mode == 'Javascript') {
            this.model = {
                value: this.code,
                language: 'javascript'
            };
        }
        else if (this.gsp.currentTab.mode == 'CSS') {
            this.model = {
                value: this.code,
                language: 'css'
            };
        }
        else if (this.gsp.currentTab.mode == 'JSON') {
            this.model = {
                value: this.code,
                language: 'json'
            };
        }
        else if (this.gsp.currentTab.mode == 'Interface') {
            this.model = {
                value: this.code,
                language: 'javascript'
            };
        }
    };
    MonacoEditorComponent.prototype.saveDocument = function () {
        this.previousDocument ? this.previousDocument.setValue(this.code) : null;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('document'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_rxjs__["Subject"])
    ], MonacoEditorComponent.prototype, "document", void 0);
    MonacoEditorComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'monaco-editor',template:/*ion-inline-start:"G:\ionic\Project\quark\src\components\monaco-editor\monaco-editor.html"*/'<div class="editor-container">\n  <ngx-monaco-editor [options]="editorOptions" [(ngModel)]="code" [model]="model" (onInit)="onInit($event)"></ngx-monaco-editor>\n</div>\n'/*ion-inline-end:"G:\ionic\Project\quark\src\components\monaco-editor\monaco-editor.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_global_service_global_service__["a" /* GlobalServiceProvider */]])
    ], MonacoEditorComponent);
    return MonacoEditorComponent;
}());

//# sourceMappingURL=monaco-editor.js.map

/***/ }),

/***/ 800:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(397);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(394);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_electron_service_electron_service__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_global_service_global_service__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_mousetrap__ = __webpack_require__(801);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_mousetrap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_mousetrap__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, gsp, esp) {
        this.platform = platform;
        this.gsp = gsp;
        this.esp = esp;
        this.rootPage = 'MenuPage';
        platform.ready().then(function () {
            statusBar.styleDefault();
            splashScreen.hide();
        });
        // this.platform.is('mobileweb') ? null : this.ssp.connectToSocketServer('http://192.168.1.7');
        this.registerAccelerators();
    }
    MyApp.prototype.registerAccelerators = function () {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_6_mousetrap___default.a.bind(['command+n', 'ctrl+n'], function () {
            _this.esp.showNewFileDialog();
        });
        __WEBPACK_IMPORTED_MODULE_6_mousetrap___default.a.bind(['command+s', 'ctrl+s'], function () {
            _this.gsp.electronConfig.parsedPath == null ?
                _this.esp.showSaveDialog() : _this.esp.saveFile();
        });
        __WEBPACK_IMPORTED_MODULE_6_mousetrap___default.a.bind(['command+o', 'ctrl+o'], function () {
            _this.esp.openInNewWindow();
        });
    };
    MyApp.prototype.clickedOnMenuBar = function (event) {
        switch (event) {
            case 'minus':
                this.esp.minimize();
                break;
            case 'maximize':
                this.esp.maximise();
                break;
            case 'close':
                this.esp.closeWindow();
                break;
        }
    };
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"G:\ionic\Project\quark\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"G:\ionic\Project\quark\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_5__providers_global_service_global_service__["a" /* GlobalServiceProvider */], __WEBPACK_IMPORTED_MODULE_4__providers_electron_service_electron_service__["a" /* ElectronServiceProvider */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 804:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return fireconfig; });
var fireconfig = {
    apiKey: "AIzaSyBDBbwdU7XHAXwJa91R77jOWNFy6rW4Y_o",
    authDomain: "diy-mechatronics.firebaseapp.com",
    databaseURL: "https://diy-mechatronics.firebaseio.com",
    projectId: "diy-mechatronics",
    storageBucket: "diy-mechatronics.appspot.com",
    messagingSenderId: "795809219937"
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 91:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthenticationServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_firebase_app__ = __webpack_require__(265);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_firebase_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase_auth__ = __webpack_require__(471);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase_firestore__ = __webpack_require__(473);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_BehaviorSubject__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_BehaviorSubject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__global_service_global_service__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_material__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__electron_service_electron_service__ = __webpack_require__(66);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var AuthenticationServiceProvider = /** @class */ (function () {
    function AuthenticationServiceProvider(alertCtrl, gsp, injector, snackbar) {
        var _this = this;
        this.alertCtrl = alertCtrl;
        this.gsp = gsp;
        this.injector = injector;
        this.snackbar = snackbar;
        this.auth = __WEBPACK_IMPORTED_MODULE_1_firebase_app___default.a.auth;
        this.firestore = __WEBPACK_IMPORTED_MODULE_1_firebase_app___default.a.firestore;
        this.isLoggedIn = false;
        this.user = new __WEBPACK_IMPORTED_MODULE_4_rxjs_BehaviorSubject__["BehaviorSubject"](null);
        this.userDashboards = new __WEBPACK_IMPORTED_MODULE_4_rxjs_BehaviorSubject__["BehaviorSubject"](null);
        this.esp = this.injector.get(__WEBPACK_IMPORTED_MODULE_8__electron_service_electron_service__["a" /* ElectronServiceProvider */]);
        this.auth().onAuthStateChanged(function (user) {
            _this.user.next(user);
            console.log(user);
        });
        this.firestore().settings({
            timestampsInSnapshots: true
        });
    }
    AuthenticationServiceProvider.prototype.loginWithEmailAndPassword = function (email, password) {
        var _this = this;
        /**
         * Log user with email and password. Returns a promise.
         * Initiated from : user-pop-over component.
         */
        var self = this;
        return new Promise(function (resolve, reject) {
            _this.auth().signInWithEmailAndPassword(email, password)
                .then(function (result) {
                console.log(result, 'User successfully logged');
                _this.user.next(result.user);
                resolve();
            })
                .catch(function (err) {
                console.log(err, "Could not log in user");
                self.alertCtrl.create({
                    title: "Error : Could not log in",
                    subTitle: err.code,
                    message: err.message,
                    buttons: [{
                            text: "Close",
                            role: "close"
                        }]
                }).present();
                reject();
            });
        });
    };
    AuthenticationServiceProvider.prototype.logoutUser = function () {
        this.auth().signOut();
    };
    AuthenticationServiceProvider.prototype.getDashboards = function () {
        var _this = this;
        this.firestore().collection('Users').doc(this.user.getValue().email).collection('Public').get()
            .then(function (snap) {
            var array = [];
            snap.docs.forEach(function (doc) {
                array.push(doc);
            });
            _this.userDashboards.next(array);
        })
            .catch(function (err) {
            console.log(err);
        });
    };
    AuthenticationServiceProvider.prototype.uploadDashboard = function () {
        var _this = this;
        /**
         * Uploads the current file to cloud.
         * Initiated from : Activity-bar-component.
         * 1. First check if the file is saved.
         * 2. If file is not saved then show alert to save file.
         * 3. If file is saved then upload to cloud.
         */
        if (this.gsp.electronConfig.parsedPath) {
            this.gsp.showLoading = true;
            this.firestore().collection('Users').doc(this.user.getValue().email).collection('Public').doc(this.gsp.electronConfig.parsedPath.name)
                .set(this.gsp.getQuarkFile())
                .then(function () {
                _this.snackbar.open('File upload complete!', 'Close', {
                    duration: 1800,
                    horizontalPosition: 'right'
                });
                _this.gsp.showLoading = false;
            })
                .catch(function (err) {
                _this.gsp.showLoading = false;
            });
        }
        else {
            this.esp.showAlert('info', 'Oops..!', 'You must save the file first.', ['Save', 'Cancel'])
                .then(function (response) {
                console.log(response);
                if (response == 0) {
                    _this.esp.showSaveDialog();
                }
            })
                .catch(function (err) {
                console.log('Not electron. Sorry not sorry!', err);
            });
        }
    };
    AuthenticationServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_6__global_service_global_service__["a" /* GlobalServiceProvider */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injector"], __WEBPACK_IMPORTED_MODULE_7__angular_material__["k" /* MatSnackBar */]])
    ], AuthenticationServiceProvider);
    return AuthenticationServiceProvider;
}());

//# sourceMappingURL=authentication-service.js.map

/***/ })

},[401]);
//# sourceMappingURL=main.js.map