webpackJsonp([5],{

/***/ 120:
/***/ (function(module, exports) {

module.exports = require('electron');

/***/ }),

/***/ 143:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ElectronServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utilities_electron_resources__ = __webpack_require__(380);
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
    function ElectronServiceProvider(platform) {
        this.platform = platform;
        this.platform.is('electron') ? this.injectElectron() : console.log('Cannot Inject Electron');
        console.log('Auto updater');
    }
    ElectronServiceProvider.prototype.injectElectron = function () {
        console.log('Injecting Electron');
        var _a = __webpack_require__(120).remote, Menu = _a.Menu, MenuItem = _a.MenuItem, app = _a.app, dialog = _a.dialog, BrowserWindow = _a.BrowserWindow, getCurrentWebContents = _a.getCurrentWebContents;
        this.MenuItem = MenuItem;
        this.Menu = Menu;
        this.app = app;
        this.dialog = dialog;
        this.BrowserWindow = BrowserWindow;
        this.currentWebContents = getCurrentWebContents();
        // console.log(location.hostname, location.origin, location.href, location.host);
    };
    ElectronServiceProvider.prototype.editorContextMenu = function () {
        if (this.platform.is('electron')) {
            var menu = this.Menu.buildFromTemplate(__WEBPACK_IMPORTED_MODULE_2__utilities_electron_resources__["a" /* contextMenu */]);
            var win = this.BrowserWindow.fromWebContents(this.currentWebContents);
            menu.popup({
                window: win, callback: function () {
                    console.log('Closing');
                }
            });
        }
        else {
            console.log('Sorry not electron');
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
        this.platform.is('electron') ?
            this.app.quit() : null;
    };
    ElectronServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */]])
    ], ElectronServiceProvider);
    return ElectronServiceProvider;
}());

//# sourceMappingURL=electron-service.js.map

/***/ }),

/***/ 144:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SocketServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__global_service_global_service__ = __webpack_require__(51);
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
            _this.socket.emit('initialize', _this.gsp.global_config.js.getValue(), code);
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
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */], __WEBPACK_IMPORTED_MODULE_2__global_service_global_service__["a" /* GlobalServiceProvider */]])
    ], SocketServiceProvider);
    return SocketServiceProvider;
}());

//# sourceMappingURL=socket-service.js.map

/***/ }),

/***/ 154:
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
webpackEmptyAsyncContext.id = 154;

/***/ }),

/***/ 198:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/code-mirror/code-mirror.module": [
		422,
		4
	],
	"../pages/connect-mobile/connect-mobile.module": [
		423,
		3
	],
	"../pages/designer/designer.module": [
		424,
		0
	],
	"../pages/landing/landing.module": [
		425,
		2
	],
	"../pages/menu/menu.module": [
		426,
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
webpackAsyncContext.id = 198;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 262:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComponentsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mtr_toggle_mtr_toggle__ = __webpack_require__(263);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__hover_hover__ = __webpack_require__(381);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__codebar_codebar__ = __webpack_require__(382);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__status_bar_status_bar__ = __webpack_require__(383);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__tabs_bar_tabs_bar__ = __webpack_require__(384);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__activity_bar_activity_bar__ = __webpack_require__(385);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__widgets_widgets__ = __webpack_require__(386);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__mtr_button_mtr_button__ = __webpack_require__(264);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__mtr_range_mtr_range__ = __webpack_require__(265);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__code_editor_code_editor__ = __webpack_require__(266);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__css_inspector_css_inspector__ = __webpack_require__(387);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__console_console__ = __webpack_require__(388);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__menu_bar_menu_bar__ = __webpack_require__(389);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__angular_material__ = __webpack_require__(85);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
















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
            ],
            imports: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicModule */],
                __WEBPACK_IMPORTED_MODULE_15__angular_material__["f" /* MatTooltipModule */],
                __WEBPACK_IMPORTED_MODULE_15__angular_material__["b" /* MatMenuModule */],
                __WEBPACK_IMPORTED_MODULE_15__angular_material__["e" /* MatTabsModule */],
                __WEBPACK_IMPORTED_MODULE_15__angular_material__["d" /* MatSnackBarModule */]
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
            ],
            entryComponents: [__WEBPACK_IMPORTED_MODULE_1__mtr_toggle_mtr_toggle__["a" /* MtrToggleComponent */], __WEBPACK_IMPORTED_MODULE_9__mtr_button_mtr_button__["a" /* MtrButtonComponent */], __WEBPACK_IMPORTED_MODULE_10__mtr_range_mtr_range__["a" /* MtrRangeComponent */], __WEBPACK_IMPORTED_MODULE_11__code_editor_code_editor__["a" /* CodeEditorComponent */]]
        })
    ], ComponentsModule);
    return ComponentsModule;
}());

//# sourceMappingURL=components.module.js.map

/***/ }),

/***/ 263:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MtrToggleComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utilities_code_samples__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_codemirror__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_codemirror___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_codemirror__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_js_beautify__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_js_beautify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_js_beautify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_global_service_global_service__ = __webpack_require__(51);
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
        var config = JSON.parse(this.gsp.global_config.js.getValue());
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
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */], __WEBPACK_IMPORTED_MODULE_5__providers_global_service_global_service__["a" /* GlobalServiceProvider */]])
    ], MtrToggleComponent);
    return MtrToggleComponent;
}());

//# sourceMappingURL=mtr-toggle.js.map

/***/ }),

/***/ 264:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MtrButtonComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_codemirror__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_codemirror___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_codemirror__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_js_beautify__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_js_beautify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_js_beautify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utilities_code_samples__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_global_service_global_service__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(27);
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
    function MtrButtonComponent(events, gsp) {
        this.events = events;
        this.gsp = gsp;
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
        this.data.localData = {
            content: this.data.config.variable,
            color: '#000000'
        };
    }
    MtrButtonComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.gsp.addCSS(this.data);
        this.events.publish('misc-components : global-service : add-component', this);
        this.events.subscribe('socket-service : misc-components : update-renderer', function (closure) {
            _this.data.localData = closure["" + _this.data.config.variable];
            // console.log(closure[`${this.data.config.variable}`]);
        });
    };
    MtrButtonComponent.prototype.change = function () {
        this.events.publish('misc-components : socket-service : firmata', this.data.config.function, this.data.localData);
    };
    MtrButtonComponent.prototype.openTab = function (tab) {
        this.events.publish('misc-components : global-service : add-tab', tab);
    };
    MtrButtonComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'mtr-button',template:/*ion-inline-start:"G:\ionic\Project\quark\src\components\mtr-button\mtr-button.html"*/'<div [id]="id" [class]="data.config.css_class">\n\n  <div class="hover button-container">\n\n    <hover [component]="component" (clickEvent)="openTab($event)"></hover>\n\n    <button ion-button (click)="change($event)" [innerText]="data.localData.content" [color]="data.localData.color" [disabled]="data.localData.disabled"\n\n      [block]="data.localData.block" [clear]="data.localData.clear" [default]="data.localData.default" [full]="data.localData.full"></button>\n\n  </div>\n\n</div>\n\n'/*ion-inline-end:"G:\ionic\Project\quark\src\components\mtr-button\mtr-button.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5_ionic_angular__["c" /* Events */], __WEBPACK_IMPORTED_MODULE_4__providers_global_service_global_service__["a" /* GlobalServiceProvider */]])
    ], MtrButtonComponent);
    return MtrButtonComponent;
}());

//# sourceMappingURL=mtr-button.js.map

/***/ }),

/***/ 265:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MtrRangeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_codemirror__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_codemirror___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_codemirror__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_js_beautify__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_js_beautify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_js_beautify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utilities_code_samples__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_global_service_global_service__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(27);
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
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5_ionic_angular__["c" /* Events */], __WEBPACK_IMPORTED_MODULE_4__providers_global_service_global_service__["a" /* GlobalServiceProvider */]])
    ], MtrRangeComponent);
    return MtrRangeComponent;
}());

//# sourceMappingURL=mtr-range.js.map

/***/ }),

/***/ 266:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CodeEditorComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_codemirror__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_codemirror___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_codemirror__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_js_beautify__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_js_beautify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_js_beautify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_jsonlint_mod__ = __webpack_require__(360);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_jsonlint_mod___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_jsonlint_mod__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__node_modules_codemirror_mode_javascript_javascript_js__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__node_modules_codemirror_mode_javascript_javascript_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__node_modules_codemirror_mode_javascript_javascript_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__node_modules_codemirror_mode_clike_clike_js__ = __webpack_require__(362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__node_modules_codemirror_mode_clike_clike_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__node_modules_codemirror_mode_clike_clike_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__node_modules_codemirror_mode_css_css_js__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__node_modules_codemirror_mode_css_css_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__node_modules_codemirror_mode_css_css_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__node_modules_codemirror_addon_comment_comment_js__ = __webpack_require__(363);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__node_modules_codemirror_addon_comment_comment_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__node_modules_codemirror_addon_comment_comment_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__node_modules_codemirror_addon_comment_continuecomment_js__ = __webpack_require__(364);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__node_modules_codemirror_addon_comment_continuecomment_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__node_modules_codemirror_addon_comment_continuecomment_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__node_modules_codemirror_addon_dialog_dialog_js__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__node_modules_codemirror_addon_dialog_dialog_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__node_modules_codemirror_addon_dialog_dialog_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__node_modules_codemirror_addon_edit_closebrackets_js__ = __webpack_require__(365);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__node_modules_codemirror_addon_edit_closebrackets_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10__node_modules_codemirror_addon_edit_closebrackets_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__node_modules_codemirror_addon_edit_matchbrackets_js__ = __webpack_require__(366);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__node_modules_codemirror_addon_edit_matchbrackets_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11__node_modules_codemirror_addon_edit_matchbrackets_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__node_modules_codemirror_addon_fold_foldcode_js__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__node_modules_codemirror_addon_fold_foldcode_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12__node_modules_codemirror_addon_fold_foldcode_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__node_modules_codemirror_addon_fold_brace_fold_js__ = __webpack_require__(367);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__node_modules_codemirror_addon_fold_brace_fold_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13__node_modules_codemirror_addon_fold_brace_fold_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__node_modules_codemirror_addon_fold_comment_fold_js__ = __webpack_require__(368);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__node_modules_codemirror_addon_fold_comment_fold_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14__node_modules_codemirror_addon_fold_comment_fold_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__node_modules_codemirror_addon_fold_indent_fold_js__ = __webpack_require__(369);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__node_modules_codemirror_addon_fold_indent_fold_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15__node_modules_codemirror_addon_fold_indent_fold_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__node_modules_codemirror_addon_fold_foldgutter_js__ = __webpack_require__(370);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__node_modules_codemirror_addon_fold_foldgutter_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_16__node_modules_codemirror_addon_fold_foldgutter_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__node_modules_codemirror_addon_hint_show_hint_js__ = __webpack_require__(371);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__node_modules_codemirror_addon_hint_show_hint_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_17__node_modules_codemirror_addon_hint_show_hint_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__node_modules_codemirror_addon_hint_anyword_hint_js__ = __webpack_require__(372);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__node_modules_codemirror_addon_hint_anyword_hint_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_18__node_modules_codemirror_addon_hint_anyword_hint_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__node_modules_codemirror_addon_hint_javascript_hint_js__ = __webpack_require__(373);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__node_modules_codemirror_addon_hint_javascript_hint_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_19__node_modules_codemirror_addon_hint_javascript_hint_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__node_modules_codemirror_addon_hint_css_hint_js__ = __webpack_require__(374);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__node_modules_codemirror_addon_hint_css_hint_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_20__node_modules_codemirror_addon_hint_css_hint_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__node_modules_codemirror_addon_lint_lint_js__ = __webpack_require__(375);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__node_modules_codemirror_addon_lint_lint_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_21__node_modules_codemirror_addon_lint_lint_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__node_modules_codemirror_addon_lint_json_lint_js__ = __webpack_require__(376);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__node_modules_codemirror_addon_lint_json_lint_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_22__node_modules_codemirror_addon_lint_json_lint_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__node_modules_codemirror_addon_lint_css_lint_js__ = __webpack_require__(377);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__node_modules_codemirror_addon_lint_css_lint_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_23__node_modules_codemirror_addon_lint_css_lint_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__node_modules_codemirror_addon_tern_tern_js__ = __webpack_require__(378);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__node_modules_codemirror_addon_tern_tern_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_24__node_modules_codemirror_addon_tern_tern_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__node_modules_rxjs_Subject__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__node_modules_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_25__node_modules_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__utilities_ecmascript__ = __webpack_require__(379);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__angular_material__ = __webpack_require__(85);
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








var CodeEditorComponent = /** @class */ (function () {
    function CodeEditorComponent(data) {
        this.data = data;
        this.inputDocument = new __WEBPACK_IMPORTED_MODULE_25__node_modules_rxjs_Subject__["Subject"]();
        this.showInterface = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        console.log('Hello CodeEditorComponent Component');
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
        });
        document.getElementsByClassName('CodeMirror')[0].addEventListener('wheel', function (event) {
            event.preventDefault();
            // console.log(event, this.editor.getScrollInfo());
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
        var server = new __WEBPACK_IMPORTED_MODULE_1_codemirror___default.a["TernServer"]({ defs: [__WEBPACK_IMPORTED_MODULE_26__utilities_ecmascript__["a" /* code */]] });
        this.editor.setOption("extraKeys", {
            "Ctrl-Space": function (cm) { server.complete(cm); },
            "Ctrl-I": function (cm) { server.showType(cm); },
            "Ctrl-O": function (cm) { server.showDocs(cm); },
            "Alt-.": function (cm) { server.jumpToDef(cm); },
            "Alt-,": function (cm) { server.jumpBack(cm); },
            "Ctrl-Q": function (cm) { server.rename(cm); },
            "Ctrl-.": function (cm) { server.selectName(cm); }
        });
        this.editor.on("cursorActivity", function (cm) {
            server.updateArgHints(cm);
        });
        this.editor.on("change", function (cm, obj) {
            if (obj.text[0] == '.') {
                server.complete(cm);
            }
        });
        this.editor.on('blur', function (cm) {
            server.updateArgHints(cm);
        });
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
        // this.esp.editorContextMenu();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_25__node_modules_rxjs_Subject__["Subject"])
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
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"])()), __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_27__angular_material__["a" /* MAT_SNACK_BAR_DATA */])),
        __metadata("design:paramtypes", [Object])
    ], CodeEditorComponent);
    return CodeEditorComponent;
}());

//# sourceMappingURL=code-editor.js.map

/***/ }),

/***/ 268:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(269);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(281);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 281:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(256);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(259);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(412);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_socket_service_socket_service__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_components_module__ = __webpack_require__(262);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_forms__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_global_service_global_service__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_electron_service_electron_service__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_platform_browser_animations__ = __webpack_require__(413);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_authentication_service_authentication_service__ = __webpack_require__(415);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_firebase_app__ = __webpack_require__(260);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_firebase_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__environments_environment__ = __webpack_require__(421);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};















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
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {
                    tabspageTransition: 'ios-transition',
                    menuType: 'push',
                    alertEnter: "alert-pop-in",
                    backButtonText: "Back",
                    pageTransition: "ios-transition",
                    toastEnter: "toast-slide-in",
                }, {
                    links: [
                        { loadChildren: '../pages/code-mirror/code-mirror.module#CodeMirrorPageModule', name: 'CodeMirrorPage', segment: 'code-mirror', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/connect-mobile/connect-mobile.module#ConnectMobilePageModule', name: 'ConnectMobilePage', segment: 'connect-mobile', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/designer/designer.module#DesignerPageModule', name: 'DesignerPage', segment: 'designer', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/landing/landing.module#LandingPageModule', name: 'LandingPage', segment: 'landing', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/menu/menu.module#MenuPageModule', name: 'MenuPage', segment: 'menu', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_7__components_components_module__["a" /* ComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_8__angular_forms__["c" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_11__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */]
                // NoopAnimationsModule
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_9__providers_global_service_global_service__["a" /* GlobalServiceProvider */],
                __WEBPACK_IMPORTED_MODULE_6__providers_socket_service_socket_service__["a" /* SocketServiceProvider */],
                __WEBPACK_IMPORTED_MODULE_10__providers_electron_service_electron_service__["a" /* ElectronServiceProvider */],
                __WEBPACK_IMPORTED_MODULE_12__providers_authentication_service_authentication_service__["a" /* AuthenticationServiceProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 303:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = addCSSFromDump;
/* harmony export (immutable) */ __webpack_exports__["b"] = addClassFromDump;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utilities_johnny_five_sample_code__ = __webpack_require__(304);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_js_beautify__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_js_beautify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_js_beautify__);


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
function addClassFromDump(component, globalConfigJS) {
    var json = JSON.parse(globalConfigJS.getValue());
    // let json: globalConfigInterface["js"] = JSON.parse(this.global_config.js.getValue());
    switch (component.class) {
        case 'Accelerometer':
            json.components.push(__WEBPACK_IMPORTED_MODULE_0__utilities_johnny_five_sample_code__["a" /* five_Accelerometer */]);
            break;
        case 'Altimeter':
            json.components.push(__WEBPACK_IMPORTED_MODULE_0__utilities_johnny_five_sample_code__["b" /* five_Altimeter */]);
            break;
        case 'Animation':
            json.components.push(__WEBPACK_IMPORTED_MODULE_0__utilities_johnny_five_sample_code__["c" /* five_Animation */]);
            break;
        case 'Barometer':
            json.components.push(__WEBPACK_IMPORTED_MODULE_0__utilities_johnny_five_sample_code__["d" /* five_Barometer */]);
            break;
        case 'Board':
            json.components.push(__WEBPACK_IMPORTED_MODULE_0__utilities_johnny_five_sample_code__["e" /* five_Board */]);
            break;
        case 'Boards':
            json.components.push(__WEBPACK_IMPORTED_MODULE_0__utilities_johnny_five_sample_code__["f" /* five_Boards */]);
            break;
        case 'Button':
            json.components.push(__WEBPACK_IMPORTED_MODULE_0__utilities_johnny_five_sample_code__["g" /* five_Button */]);
            break;
        case 'Compass':
            json.components.push(__WEBPACK_IMPORTED_MODULE_0__utilities_johnny_five_sample_code__["h" /* five_Compass */]);
            break;
        case 'ESC':
            json.components.push(__WEBPACK_IMPORTED_MODULE_0__utilities_johnny_five_sample_code__["i" /* five_ESC */]);
            break;
        case 'ESCs':
            json.components.push(__WEBPACK_IMPORTED_MODULE_0__utilities_johnny_five_sample_code__["j" /* five_ESCs */]);
            break;
        case 'Expander':
            json.components.push(__WEBPACK_IMPORTED_MODULE_0__utilities_johnny_five_sample_code__["k" /* five_Expander */]);
            break;
        case 'Fn':
            json.components.push(__WEBPACK_IMPORTED_MODULE_0__utilities_johnny_five_sample_code__["l" /* five_Fn */]);
            break;
        case 'GPS':
            json.components.push(__WEBPACK_IMPORTED_MODULE_0__utilities_johnny_five_sample_code__["m" /* five_GPS */]);
            break;
        case 'Gyro':
            json.components.push(__WEBPACK_IMPORTED_MODULE_0__utilities_johnny_five_sample_code__["n" /* five_Gyro */]);
            break;
        case 'Hygrometer':
            json.components.push(__WEBPACK_IMPORTED_MODULE_0__utilities_johnny_five_sample_code__["o" /* five_Hygrometer */]);
            break;
        case 'IMU':
            json.components.push(__WEBPACK_IMPORTED_MODULE_0__utilities_johnny_five_sample_code__["p" /* five_IMU */]);
            break;
        case 'IR.Reflect.Array':
            json.components.push(__WEBPACK_IMPORTED_MODULE_0__utilities_johnny_five_sample_code__["q" /* five_IR_Reflect_Array */]);
            break;
        case 'Joystick':
            json.components.push(__WEBPACK_IMPORTED_MODULE_0__utilities_johnny_five_sample_code__["r" /* five_Joystick */]);
            break;
        case 'Keypad':
            json.components.push(__WEBPACK_IMPORTED_MODULE_0__utilities_johnny_five_sample_code__["s" /* five_Keypad */]);
            break;
        case 'LCD':
            json.components.push(__WEBPACK_IMPORTED_MODULE_0__utilities_johnny_five_sample_code__["t" /* five_LCD */]);
            break;
        case 'Led':
            json.components.push(__WEBPACK_IMPORTED_MODULE_0__utilities_johnny_five_sample_code__["u" /* five_Led */]);
            break;
        case 'Led.Digits':
            json.components.push(__WEBPACK_IMPORTED_MODULE_0__utilities_johnny_five_sample_code__["v" /* five_LedDotDigits */]);
            break;
        case 'Led.Matrix':
            json.components.push(__WEBPACK_IMPORTED_MODULE_0__utilities_johnny_five_sample_code__["w" /* five_LedDotMatrix */]);
            break;
        case 'Led.RGB':
            json.components.push(__WEBPACK_IMPORTED_MODULE_0__utilities_johnny_five_sample_code__["x" /* five_LedDotRGB */]);
            break;
        case 'Leds':
            json.components.push(__WEBPACK_IMPORTED_MODULE_0__utilities_johnny_five_sample_code__["y" /* five_Leds */]);
            break;
        case 'Light':
            json.components.push(__WEBPACK_IMPORTED_MODULE_0__utilities_johnny_five_sample_code__["z" /* five_Light */]);
            break;
        case 'Motion':
            json.components.push(__WEBPACK_IMPORTED_MODULE_0__utilities_johnny_five_sample_code__["A" /* five_Motion */]);
            break;
        case 'Motor':
            json.components.push(__WEBPACK_IMPORTED_MODULE_0__utilities_johnny_five_sample_code__["B" /* five_Motor */]);
            break;
        case 'Motors':
            json.components.push(__WEBPACK_IMPORTED_MODULE_0__utilities_johnny_five_sample_code__["C" /* five_Motors */]);
            break;
        case 'Multi':
            json.components.push(__WEBPACK_IMPORTED_MODULE_0__utilities_johnny_five_sample_code__["D" /* five_Multi */]);
            break;
        case 'Piezo':
            json.components.push(__WEBPACK_IMPORTED_MODULE_0__utilities_johnny_five_sample_code__["E" /* five_Piezo */]);
            break;
        case 'Pin':
            json.components.push(__WEBPACK_IMPORTED_MODULE_0__utilities_johnny_five_sample_code__["F" /* five_Pin */]);
            break;
        case 'Proximity':
            json.components.push(__WEBPACK_IMPORTED_MODULE_0__utilities_johnny_five_sample_code__["G" /* five_Proximity */]);
            break;
        case 'Relay':
            json.components.push(__WEBPACK_IMPORTED_MODULE_0__utilities_johnny_five_sample_code__["H" /* five_Relay */]);
            break;
        case 'Relays':
            json.components.push(__WEBPACK_IMPORTED_MODULE_0__utilities_johnny_five_sample_code__["I" /* five_Relays */]);
            break;
        case 'Sensor':
            json.components.push(__WEBPACK_IMPORTED_MODULE_0__utilities_johnny_five_sample_code__["J" /* five_Sensor */]);
            break;
        case 'Servo':
            json.components.push(__WEBPACK_IMPORTED_MODULE_0__utilities_johnny_five_sample_code__["K" /* five_Servo */]);
            break;
        case 'Servos':
            json.components.push(__WEBPACK_IMPORTED_MODULE_0__utilities_johnny_five_sample_code__["L" /* five_Servos */]);
            break;
        case 'ShiftRegister':
            json.components.push(__WEBPACK_IMPORTED_MODULE_0__utilities_johnny_five_sample_code__["M" /* five_ShiftRegister */]);
            break;
        case 'Stepper':
            json.components.push(__WEBPACK_IMPORTED_MODULE_0__utilities_johnny_five_sample_code__["N" /* five_Stepper */]);
            break;
        case 'Switch':
            json.components.push(__WEBPACK_IMPORTED_MODULE_0__utilities_johnny_five_sample_code__["O" /* five_Switch */]);
            break;
        case 'Thermometer':
            json.components.push(__WEBPACK_IMPORTED_MODULE_0__utilities_johnny_five_sample_code__["P" /* five_Thermometer */]);
            break;
        default:
            break;
    }
    globalConfigJS.setValue(Object(__WEBPACK_IMPORTED_MODULE_1_js_beautify__["js_beautify"])(JSON.stringify(json), { indent_size: 2 }));
}
//# sourceMappingURL=global-service-dump.js.map

/***/ }),

/***/ 304:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return five_Accelerometer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return five_Altimeter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return five_Animation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return five_Barometer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return five_Board; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return five_Boards; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return five_Button; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return five_Compass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return five_ESC; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return five_ESCs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return five_Expander; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return five_Fn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return five_GPS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return five_Gyro; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return five_Hygrometer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return five_IMU; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "q", function() { return five_IR_Reflect_Array; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "r", function() { return five_Joystick; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s", function() { return five_Keypad; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "t", function() { return five_LCD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "u", function() { return five_Led; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "v", function() { return five_LedDotDigits; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "w", function() { return five_LedDotMatrix; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "x", function() { return five_LedDotRGB; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "y", function() { return five_Leds; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "z", function() { return five_Light; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "A", function() { return five_Motion; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "B", function() { return five_Motor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "C", function() { return five_Motors; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "D", function() { return five_Multi; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "E", function() { return five_Piezo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "F", function() { return five_Pin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "G", function() { return five_Proximity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "H", function() { return five_Relay; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "I", function() { return five_Relays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "J", function() { return five_Sensor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "K", function() { return five_Servo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "L", function() { return five_Servos; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "M", function() { return five_ShiftRegister; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "N", function() { return five_Stepper; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "O", function() { return five_Switch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "P", function() { return five_Thermometer; });
var five_Accelerometer = {
    class: 'Accelerometer',
    variable: '',
    arguments: {
        pins: ["A0", "A1"],
        sensitivity: 96,
        aref: 5,
        zeroV: 478
    }
};
var five_Altimeter = {
    class: 'Altimeter',
    variable: '',
    arguments: {
        controller: "MS5611"
    }
};
var five_Animation = {
    class: 'Animation',
    variable: '',
    arguments: "this.servo"
};
var five_Barometer = {
    class: 'Barometer',
    variable: '',
    arguments: {
        controller: "MPL115A2"
    }
};
var five_Board = {
    class: 'Board',
    variable: '',
    arguments: { port: "/dev/ttyUSB*" }
};
var five_Boards = {
    class: 'Boards',
    variable: '',
    arguments: [
        { id: "A", port: "/dev/cu.usbmodem621" },
        { id: "B", port: "/dev/cu.usbmodem411" }
    ]
};
var five_Button = {
    class: 'Button',
    variable: '',
    arguments: "A0"
};
var five_Compass = {
    class: 'Compass',
    variable: '',
    arguments: {
        controller: "BNO055"
    }
};
var five_ESC = {
    class: 'ESC',
    variable: '',
    arguments: {
        controller: "PCA9685",
        pin: 1
    }
};
var five_ESCs = {
    class: 'ESCs',
    variable: '',
    arguments: [{
            pin: 9
        }, {
            pin: 10
        }]
};
var five_Expander = {
    class: 'Expander',
    variable: '',
    arguments: {
        controller: "MCP23008"
    }
};
var five_Fn = {
    class: 'Fn',
    variable: '',
    arguments: ''
};
var five_GPS = {
    class: 'GPS',
    variable: '',
    arguments: {
        pins: [11, 10],
        breakout: "ADAFRUIT_ULTIMATE_GPS"
    }
};
var five_Gyro = {
    class: 'Gyro',
    variable: '',
    arguments: {
        controller: "MPU6050"
    }
};
var five_Hygrometer = {
    class: 'Hygrometer',
    variable: '',
    arguments: {
        controller: "HTU21D"
    }
};
var five_IMU = {
    class: 'IMU',
    variable: '',
    arguments: {
        controller: "MPU6050",
        address: 0x68,
        freq: 100 // optional
    }
};
var five_IR_Reflect_Array = {
    class: 'IR.Reflect.Array',
    variable: '',
    arguments: ""
};
var five_Joystick = {
    class: 'Joystick',
    variable: '',
    arguments: {
        pins: ["A0", "A1"],
    }
};
var five_Keypad = {
    class: 'Keypad',
    variable: '',
    arguments: {
        controller: "VKEY",
        pin: "A0",
    }
};
var five_LCD = {
    class: 'LCD',
    variable: '',
    arguments: {
        pins: [7, 8, 9, 10, 11, 12],
        backlight: 13,
        rows: 2,
        cols: 16
    }
};
var five_Led = {
    class: 'Led',
    variable: '',
    arguments: {
        option: {
            pin: 13
        }
    }
};
var five_LedDotDigits = {
    class: 'Led.Digits',
    variable: '',
    arguments: {
        option: {
            pins: {
                data: 2,
                clock: 3,
                cs: 4
            }
        }
    }
};
var five_LedDotMatrix = {
    class: 'Led.Matrix',
    variable: '',
    arguments: {
        option: {
            pins: {
                data: 2,
                clock: 3,
                cs: 4
            }
        }
    }
};
var five_LedDotRGB = {
    class: 'Led.RGB',
    variable: '',
    arguments: {
        option: {
            pins: {
                red: 6,
                green: 5,
                blue: 3
            }
        }
    }
};
var five_Leds = {
    class: 'Leds',
    variable: '',
    arguments: {
        option: [{
                pin: 9
            }, {
                pin: 10
            }]
    }
};
var five_Light = {
    class: 'Light',
    variable: '',
    arguments: 'A0'
};
var five_Motion = {
    class: 'Motion',
    variable: '',
    arguments: {
        controller: "GP2Y0D815Z0F",
        pin: "A0"
    }
};
var five_Motor = {
    class: 'Motor',
    variable: '',
    arguments: {
        pins: {
            pwm: 9,
            dir: 8,
            brake: 11
        }
    }
};
var five_Motors = {
    class: 'Motors',
    variable: '',
    arguments: [{
            pins: {
                pwm: 3,
                dir: 12
            }
        }, {
            pins: {
                pwm: 9,
                dir: 8,
                cdir: 11
            }
        }]
};
var five_Multi = {
    class: 'Multi',
    variable: '',
    arguments: {
        controller: "DHT22_I2C_NANO_BACKPACK"
    }
};
var five_Piezo = {
    class: 'Piezo',
    variable: '',
    arguments: {
        controller: "I2C_BACKPACK",
        pin: 3
    }
};
var five_Pin = {
    class: 'Pin',
    variable: '',
    arguments: {
        pin: "A0"
    }
};
var five_Proximity = {
    class: 'Proximity',
    variable: '',
    arguments: {
        controller: "GP2Y0A21YK",
        pin: "A0"
    }
};
var five_Relay = {
    class: 'Relay',
    variable: '',
    arguments: {
        pins: {
            pwm: 9,
            dir: 8,
            brake: 11
        }
    }
};
var five_Relays = {
    class: 'Relays',
    variable: '',
    arguments: {
        pins: {
            pwm: 9,
            dir: 8,
            brake: 11
        }
    }
};
var five_Sensor = {
    class: 'Sensor',
    variable: '',
    arguments: {
        pins: {
            pwm: 9,
            dir: 8,
            brake: 11
        }
    }
};
var five_Servo = {
    class: 'Servo',
    variable: '',
    arguments: {
        pins: {
            pwm: 9,
            dir: 8,
            brake: 11
        }
    }
};
var five_Servos = {
    class: 'Servos',
    variable: '',
    arguments: {
        pins: {
            pwm: 9,
            dir: 8,
            brake: 11
        }
    }
};
var five_ShiftRegister = {
    class: 'ShiftRegister',
    variable: '',
    arguments: {
        pins: {
            pwm: 9,
            dir: 8,
            brake: 11
        }
    }
};
var five_Stepper = {
    class: 'Stepper',
    variable: '',
    arguments: {
        pins: {
            pwm: 9,
            dir: 8,
            brake: 11
        }
    }
};
var five_Switch = {
    class: 'Switch',
    variable: '',
    arguments: {
        pins: {
            pwm: 9,
            dir: 8,
            brake: 11
        }
    }
};
var five_Thermometer = {
    class: 'Thermometer',
    variable: '',
    arguments: {
        pins: {
            pwm: 9,
            dir: 8,
            brake: 11
        }
    }
};
//# sourceMappingURL=johnny-five-sample-code.js.map

/***/ }),

/***/ 379:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return code; });
var code = {
    "!name": "ecmascript",
    "!define": {
        "Error.prototype": "Error.prototype",
        "propertyDescriptor": {
            "enumerable": "bool",
            "configurable": "bool",
            "value": "?",
            "writable": "bool",
            "get": "fn() -> ?",
            "set": "fn(value: ?)"
        },
        "Promise.prototype": {
            "catch": {
                "!doc": "The catch() method returns a Promise and deals with rejected cases only. It behaves the same as calling Promise.prototype.then(undefined, onRejected).",
                "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch",
                "!type": "fn(onRejected: fn(reason: ?)) -> !this"
            },
            "then": {
                "!doc": "The then() method returns a Promise. It takes two arguments, both are callback functions for the success and failure cases of the Promise.",
                "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then",
                "!type": "fn(onFulfilled: fn(value: ?), onRejected: fn(reason: ?)) -> !custom:Promise_then",
                "!effects": ["call !0 !this.:t"]
            }
        },
        "Promise_reject": {
            "!type": "fn(reason: ?) -> !this",
            "!doc": "The Promise.reject(reason) method returns a Promise object that is rejected with the given reason.",
            "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject"
        },
        "iter_prototype": {
            ":Symbol.iterator": "fn() -> !this"
        },
        "iter": {
            "!proto": "iter_prototype",
            "next": {
                "!type": "fn() -> +iter_result[value=!this.:t]",
                "!doc": "Return the next item in the sequence.",
                "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators"
            },
            "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators"
        },
        "iter_result": {
            "done": "bool",
            "value": "?"
        },
        "generator_prototype": {
            "!proto": "iter_prototype",
            "next": "fn(value?: ?) -> iter_result",
            "return": "fn(value?: ?) -> iter_result",
            "throw": "fn(exception: +Error)"
        },
        "Proxy_handler": {
            "!doc": "The proxy's handler object is a placeholder object which contains traps for proxies.",
            "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler",
            "getPrototypeOf": "fn(target: ?)",
            "setPrototypeOf": "fn(target: ?, prototype: ?)",
            "isExtensible": "fn(target: ?)",
            "preventExtensions": "fn(target: ?)",
            "getOwnPropertyDescriptor": "fn(target: ?, property: string) -> propertyDescriptor",
            "defineProperty": "fn(target: ?, property: string, descriptor: propertyDescriptor)",
            "has": "fn(target: ?, property: string)",
            "get": "fn(target: ?, property: string)",
            "set": "fn(target: ?, property: string, value: ?)",
            "deleteProperty": "fn(target: ?, property: string)",
            "enumerate": "fn(target: ?)",
            "ownKeys": "fn(target: ?)",
            "apply": "fn(target: ?, self: ?, arguments: [?])",
            "construct": "fn(target: ?, arguments: [?])"
        },
        "Proxy_revocable": {
            "proxy": "+Proxy",
            "revoke": "fn()"
        },
        "TypedArray": {
            "!type": "fn(size: number)",
            "!doc": "A TypedArray object describes an array-like view of an underlying binary data buffer. There is no global property named TypedArray, nor is there a directly visible TypedArray constructor.  Instead, there are a number of different global properties, whose values are typed array constructors for specific element types, listed below. On the following pages you will find common properties and methods that can be used with any typed array containing elements of any type.",
            "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray",
            "from": {
                "!type": "fn(arrayLike: ?, mapFn?: fn(elt: ?, i: number) -> number, thisArg?: ?) -> +TypedArray",
                "!effects": ["call !1 this=!2 !0.<i> number"],
                "!doc": "Creates a new typed array from an array-like or iterable object.",
                "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/from"
            },
            "of": {
                "!type": "fn(elements: number) -> +TypedArray",
                "!doc": "Creates a new typed array from a variable number of arguments.",
                "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/of"
            },
            "BYTES_PER_ELEMENT": {
                "!type": "number",
                "!doc": "The TypedArray.BYTES_PER_ELEMENT property represents the size in bytes of each element in an typed array.",
                "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/BYTES_PER_ELEMENT"
            },
            "name": {
                "!type": "string",
                "!doc": "The TypedArray.name property represents a string value of the typed array constructor name.",
                "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/name"
            },
            "prototype": {
                "<i>": "number",
                "buffer": {
                    "!type": "+ArrayBuffer",
                    "!doc": "The buffer accessor property represents the ArrayBuffer referenced by a TypedArray at construction time.",
                    "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/buffer"
                },
                "byteLength": {
                    "!type": "number",
                    "!doc": "The byteLength accessor property represents the length (in bytes) of a typed array from the start of its ArrayBuffer.",
                    "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/byteLength"
                },
                "byteOffset": {
                    "!type": "number",
                    "!doc": "The byteOffset accessor property represents the offset (in bytes) of a typed array from the start of its ArrayBuffer.",
                    "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/byteOffset"
                },
                "copyWithin": {
                    "!type": "fn(target: number, start: number, end?: number) -> ?",
                    "!doc": "The copyWithin() method copies the sequence of array elements within the array to the position starting at target. The copy is taken from the index positions of the second and third arguments start and end. The end argument is optional and defaults to the length of the array. This method has the same algorithm as Array.prototype.copyWithin. TypedArray is one of the typed array types here.",
                    "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/copyWithin"
                },
                "entries": {
                    "!type": "fn() -> +iter[:t=number]",
                    "!doc": "The entries() method returns a new Array Iterator object that contains the key/value pairs for each index in the array.",
                    "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/entries"
                },
                "every": {
                    "!type": "fn(callback: fn(element: number, index: number, array: TypedArray) -> bool, thisArg?: ?) -> bool",
                    "!effects": ["call !0 this=!1 number number !this"],
                    "!doc": "The every() method tests whether all elements in the typed array pass the test implemented by the provided function. This method has the same algorithm as Array.prototype.every(). TypedArray is one of the typed array types here.",
                    "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/every"
                },
                "fill": {
                    "!type": "fn(value: number, start?: number, end?: number)",
                    "!doc": "The fill() method fills all the elements of a typed array from a start index to an end index with a static value. This method has the same algorithm as Array.prototype.fill(). TypedArray is one of the typed array types here.",
                    "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/fill"
                },
                "filter": {
                    "!type": "fn(test: fn(element: number, i: number) -> bool, context?: ?) -> !this",
                    "!effects": ["call !0 this=!1 number number"],
                    "!doc": "Creates a new array with all of the elements of this array for which the provided filtering function returns true. See also Array.prototype.filter().",
                    "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/filter"
                },
                "find": {
                    "!type": "fn(callback: fn(element: number, index: number, array: +TypedArray) -> bool, thisArg?: ?) -> number",
                    "!effects": ["call !0 this=!1 number number !this"],
                    "!doc": "The find() method returns a value in the typed array, if an element satisfies the provided testing function. Otherwise undefined is returned. TypedArray is one of the typed array types here.\nSee also the findIndex() method, which returns the index of a found element in the typed array instead of its value.",
                    "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/find"
                },
                "findIndex": {
                    "!type": "fn(callback: fn(element: number, index: number, array: +TypedArray) -> bool, thisArg?: ?) -> number",
                    "!effects": ["call !0 this=!1 number number !this"],
                    "!doc": "The findIndex() method returns an index in the typed array, if an element in the typed array satisfies the provided testing function. Otherwise -1 is returned.\nSee also the find() method, which returns the value of a found element in the typed array instead of its index.",
                    "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/findIndex"
                },
                "forEach": {
                    "!type": "fn(callback: fn(value: number, key: number, array: +TypedArray), thisArg?: ?)",
                    "!effects": ["call !0 this=!1 number number !this"],
                    "!doc": "Executes a provided function once per array element.",
                    "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/forEach"
                },
                "indexOf": {
                    "!type": "fn(searchElement: number, fromIndex?: number) -> number",
                    "!doc": "The indexOf() method returns the first index at which a given element can be found in the typed array, or -1 if it is not present. This method has the same algorithm as Array.prototype.indexOf(). TypedArray is one of the typed array types here.",
                    "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/indexOf"
                },
                "join": {
                    "!type": "fn(separator?: string) -> string",
                    "!doc": "The join() method joins all elements of an array into a string. This method has the same algorithm as Array.prototype.join(). TypedArray is one of the typed array types here.",
                    "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/join"
                },
                "keys": {
                    "!type": "fn() -> +iter[:t=number]",
                    "!doc": "The keys() method returns a new Array Iterator object that contains the keys for each index in the array.",
                    "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/keys"
                },
                "lastIndexOf": {
                    "!type": "fn(searchElement: number, fromIndex?: number) -> number",
                    "!doc": "The lastIndexOf() method returns the last index at which a given element can be found in the typed array, or -1 if it is not present. The typed array is searched backwards, starting at fromIndex. This method has the same algorithm as Array.prototype.lastIndexOf(). TypedArray is one of the typed array types here.",
                    "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/lastIndexOf"
                },
                "length": {
                    "!type": "number",
                    "!doc": "Returns the number of elements hold in the typed array. Fixed at construction time and thus read only.",
                    "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/length"
                },
                "map": {
                    "!type": "fn(f: fn(element: number, i: number) -> number, context?: ?) -> +TypedArray",
                    "!effects": ["call !0 this=!1 number number"],
                    "!doc": "Creates a new array with the results of calling a provided function on every element in this array. See also Array.prototype.map().",
                    "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/map"
                },
                "reduce": {
                    "!type": "fn(combine: fn(sum: ?, elt: number, i: number) -> ?, init?: ?) -> !0.!ret",
                    "!effects": ["call !0 !1 number number"],
                    "!doc": "Apply a function against an accumulator and each value of the array (from left-to-right) as to reduce it to a single value. See also Array.prototype.reduce().",
                    "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/reduce"
                },
                "reduceRight": {
                    "!type": "fn(combine: fn(sum: ?, elt: number, i: number) -> ?, init?: ?) -> !0.!ret",
                    "!effects": ["call !0 !1 number number"],
                    "!doc": "Apply a function against an accumulator and each value of the array (from right-to-left) as to reduce it to a single value. See also Array.prototype.reduceRight().",
                    "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/reduceRight"
                },
                "reverse": {
                    "!type": "fn()",
                    "!doc": "The reverse() method reverses a typed array in place. The first typed array element becomes the last and the last becomes the first. This method has the same algorithm as Array.prototype.reverse(). TypedArray is one of the typed array types here.",
                    "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/reverse"
                },
                "set": {
                    "!type": "fn(array: [number], offset?: number)",
                    "!doc": "The set() method stores multiple values in the typed array, reading input values from a specified array.",
                    "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/set"
                },
                "slice": {
                    "!type": "fn(from: number, to?: number) -> +TypedArray",
                    "!doc": "Extracts a section of an array and returns a new array. See also Array.prototype.slice().",
                    "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/slice"
                },
                "some": {
                    "!type": "fn(test: fn(elt: number, i: number) -> bool, context?: ?) -> bool",
                    "!effects": ["call !0 this=!1 number number"],
                    "!doc": "The some() method tests whether some element in the typed array passes the test implemented by the provided function. This method has the same algorithm as Array.prototype.some(). TypedArray is one of the typed array types here.",
                    "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/some"
                },
                "sort": {
                    "!type": "fn(compare?: fn(a: number, b: number) -> number)",
                    "!effects": ["call !0 number number"],
                    "!doc": "Sorts the elements of an array in place and returns the array. See also Array.prototype.sort().",
                    "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/sort"
                },
                "subarray": {
                    "!type": "fn(begin?: number, end?: number) -> +TypedArray",
                    "!doc": "The subarray() method returns a new TypedArray on the same ArrayBuffer store and with the same element types as for this TypedArray object. The begin offset is inclusive and the end offset is exclusive. TypedArray is one of the typed array types.",
                    "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/subarray"
                },
                "values": {
                    "!type": "fn() -> +iter[:t=number]",
                    "!doc": "The values() method returns a new Array Iterator object that contains the values for each index in the array.",
                    "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/values"
                },
                ":Symbol.iterator": {
                    "!type": "fn() -> +iter[:t=number]",
                    "!doc": "Returns a new Array Iterator object that contains the values for each index in the array.",
                    "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/@@iterator"
                }
            }
        }
    },
    "Infinity": {
        "!type": "number",
        "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Infinity",
        "!doc": "A numeric value representing infinity."
    },
    "undefined": {
        "!type": "?",
        "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/undefined",
        "!doc": "The value undefined."
    },
    "NaN": {
        "!type": "number",
        "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/NaN",
        "!doc": "A value representing Not-A-Number."
    },
    "Object": {
        "!type": "fn()",
        "getPrototypeOf": {
            "!type": "fn(obj: ?) -> ?",
            "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/getPrototypeOf",
            "!doc": "Returns the prototype (i.e. the internal prototype) of the specified object."
        },
        "create": {
            "!type": "fn(proto: ?) -> !custom:Object_create",
            "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/create",
            "!doc": "Creates a new object with the specified prototype object and properties."
        },
        "defineProperty": {
            "!type": "fn(obj: ?, prop: string, desc: propertyDescriptor) -> !custom:Object_defineProperty",
            "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/defineProperty",
            "!doc": "Defines a new property directly on an object, or modifies an existing property on an object, and returns the object. If you want to see how to use the Object.defineProperty method with a binary-flags-like syntax, see this article."
        },
        "defineProperties": {
            "!type": "fn(obj: ?, props: ?) -> !custom:Object_defineProperties",
            "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/defineProperty",
            "!doc": "Defines a new property directly on an object, or modifies an existing property on an object, and returns the object. If you want to see how to use the Object.defineProperty method with a binary-flags-like syntax, see this article."
        },
        "getOwnPropertyDescriptor": {
            "!type": "fn(obj: ?, prop: string) -> propertyDescriptor",
            "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor",
            "!doc": "Returns a property descriptor for an own property (that is, one directly present on an object, not present by dint of being along an object's prototype chain) of a given object."
        },
        "keys": {
            "!type": "fn(obj: ?) -> [string]",
            "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/keys",
            "!doc": "Returns an array of a given object's own enumerable properties, in the same order as that provided by a for-in loop (the difference being that a for-in loop enumerates properties in the prototype chain as well)."
        },
        "getOwnPropertyNames": {
            "!type": "fn(obj: ?) -> [string]",
            "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames",
            "!doc": "Returns an array of all properties (enumerable or not) found directly upon a given object."
        },
        "seal": {
            "!type": "fn(obj: ?)",
            "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/seal",
            "!doc": "Seals an object, preventing new properties from being added to it and marking all existing properties as non-configurable. Values of present properties can still be changed as long as they are writable."
        },
        "isSealed": {
            "!type": "fn(obj: ?) -> bool",
            "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/isSealed",
            "!doc": "Determine if an object is sealed."
        },
        "freeze": {
            "!type": "fn(obj: ?) -> !0",
            "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/freeze",
            "!doc": "Freezes an object: that is, prevents new properties from being added to it; prevents existing properties from being removed; and prevents existing properties, or their enumerability, configurability, or writability, from being changed. In essence the object is made effectively immutable. The method returns the object being frozen."
        },
        "isFrozen": {
            "!type": "fn(obj: ?) -> bool",
            "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/isFrozen",
            "!doc": "Determine if an object is frozen."
        },
        "preventExtensions": {
            "!type": "fn(obj: ?)",
            "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/preventExtensions",
            "!doc": "Prevents new properties from ever being added to an object."
        },
        "isExtensible": {
            "!type": "fn(obj: ?) -> bool",
            "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible",
            "!doc": "The Object.isExtensible() method determines if an object is extensible (whether it can have new properties added to it)."
        },
        "assign": {
            "!type": "fn(target: ?, source: ?, source?: ?) -> !0",
            "!effects": ["copy !1 !0", "copy !2 !0", "copy !3 !0"],
            "!doc": "The Object.assign() method is used to copy the values of all enumerable own properties from one or more source objects to a target object. It will return the target object.",
            "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign"
        },
        "getOwnPropertySymbols": {
            "!type": "fn(obj: ?) -> !custom:getOwnPropertySymbols",
            "!doc": "The Object.getOwnPropertySymbols() method returns an array of all symbol properties found directly upon a given object.",
            "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertySymbols"
        },
        "is": {
            "!type": "fn(value1: ?, value2: ?) -> bool",
            "!doc": "The Object.is() method determines whether two values are the same value.",
            "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is"
        },
        "setPrototypeOf": {
            "!type": "fn(obj: ?, prototype: ?)",
            "!doc": "The Object.setPrototype() method sets the prototype (i.e., the internal [[Prototype]] property) of a specified object to another object or null.",
            "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf"
        },
        "prototype": {
            "!stdProto": "Object",
            "toString": {
                "!type": "fn() -> string",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/toString",
                "!doc": "Returns a string representing the object."
            },
            "toLocaleString": {
                "!type": "fn() -> string",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/toLocaleString",
                "!doc": "Returns a string representing the object. This method is meant to be overriden by derived objects for locale-specific purposes."
            },
            "valueOf": {
                "!type": "fn() -> number",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/valueOf",
                "!doc": "Returns the primitive value of the specified object"
            },
            "hasOwnProperty": {
                "!type": "fn(prop: string) -> bool",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/hasOwnProperty",
                "!doc": "Returns a boolean indicating whether the object has the specified property."
            },
            "propertyIsEnumerable": {
                "!type": "fn(prop: string) -> bool",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/propertyIsEnumerable",
                "!doc": "Returns a Boolean indicating whether the specified property is enumerable."
            },
            "isPrototypeOf": {
                "!type": "fn(obj: ?) -> bool",
                "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isPrototypeOf",
                "!doc": "Tests for an object in another object's prototype chain."
            }
        },
        "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object",
        "!doc": "Creates an object wrapper."
    },
    "Function": {
        "!type": "fn(body: string) -> fn()",
        "prototype": {
            "!stdProto": "Function",
            "apply": {
                "!type": "fn(this: ?, args: [?])",
                "!effects": [
                    "call and return !this this=!0 !1.<i> !1.<i> !1.<i>"
                ],
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Function/apply",
                "!doc": "Calls a function with a given this value and arguments provided as an array (or an array like object)."
            },
            "call": {
                "!type": "fn(this: ?, args?: ?) -> !this.!ret",
                "!effects": [
                    "call and return !this this=!0 !1 !2 !3 !4"
                ],
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Function/call",
                "!doc": "Calls a function with a given this value and arguments provided individually."
            },
            "bind": {
                "!type": "fn(this: ?, args?: ?) -> !custom:Function_bind",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Function/bind",
                "!doc": "Creates a new function that, when called, has its this keyword set to the provided value, with a given sequence of arguments preceding any provided when the new function was called."
            },
            "prototype": "?"
        },
        "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Function",
        "!doc": "Every function in JavaScript is actually a Function object."
    },
    "Array": {
        "!type": "fn(size: number) -> !custom:Array_ctor",
        "isArray": {
            "!type": "fn(value: ?) -> bool",
            "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/isArray",
            "!doc": "Returns true if an object is an array, false if it is not."
        },
        "from": {
            "!type": "fn(arrayLike: ?, mapFn?: fn(elt: ?, i: number) -> ?, thisArg?: ?) -> [!0.<i>]",
            "!effects": [
                "call !1 this=!2 !0.<i> number"
            ],
            "!doc": "The Array.from() method creates a new Array instance from an array-like or iterable object.",
            "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from"
        },
        "of": {
            "!type": "fn(elementN: ?) -> [!0]",
            "!doc": "The Array.of() method creates a new Array instance with a variable number of arguments, regardless of number or type of the arguments.",
            "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/of"
        },
        "prototype": {
            "!stdProto": "Array",
            "length": {
                "!type": "number",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/length",
                "!doc": "An unsigned, 32-bit integer that specifies the number of elements in an array."
            },
            "concat": {
                "!type": "fn(other: [?]) -> !this",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/concat",
                "!doc": "Returns a new array comprised of this array joined with other array(s) and/or value(s)."
            },
            "join": {
                "!type": "fn(separator?: string) -> string",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/join",
                "!doc": "Joins all elements of an array into a string."
            },
            "splice": {
                "!type": "fn(pos: number, amount: number, newelt?: ?) -> [?]",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/splice",
                "!doc": "Changes the content of an array, adding new elements while removing old elements."
            },
            "pop": {
                "!type": "fn() -> !this.<i>",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/pop",
                "!doc": "Removes the last element from an array and returns that element."
            },
            "push": {
                "!type": "fn(newelt: ?) -> number",
                "!effects": [
                    "propagate !0 !this.<i>"
                ],
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/push",
                "!doc": "Mutates an array by appending the given elements and returning the new length of the array."
            },
            "shift": {
                "!type": "fn() -> !this.<i>",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/shift",
                "!doc": "Removes the first element from an array and returns that element. This method changes the length of the array."
            },
            "unshift": {
                "!type": "fn(newelt: ?) -> number",
                "!effects": [
                    "propagate !0 !this.<i>"
                ],
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/unshift",
                "!doc": "Adds one or more elements to the beginning of an array and returns the new length of the array."
            },
            "slice": {
                "!type": "fn(from?: number, to?: number) -> !this",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/slice",
                "!doc": "Returns a shallow copy of a portion of an array."
            },
            "reverse": {
                "!type": "fn()",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/reverse",
                "!doc": "Reverses an array in place.  The first array element becomes the last and the last becomes the first."
            },
            "sort": {
                "!type": "fn(compare?: fn(a: ?, b: ?) -> number)",
                "!effects": [
                    "call !0 !this.<i> !this.<i>"
                ],
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/sort",
                "!doc": "Sorts the elements of an array in place and returns the array."
            },
            "indexOf": {
                "!type": "fn(elt: ?, from?: number) -> number",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/indexOf",
                "!doc": "Returns the first index at which a given element can be found in the array, or -1 if it is not present."
            },
            "lastIndexOf": {
                "!type": "fn(elt: ?, from?: number) -> number",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/lastIndexOf",
                "!doc": "Returns the last index at which a given element can be found in the array, or -1 if it is not present. The array is searched backwards, starting at fromIndex."
            },
            "every": {
                "!type": "fn(test: fn(elt: ?, i: number, array: +Array) -> bool, context?: ?) -> bool",
                "!effects": [
                    "call !0 this=!1 !this.<i> number !this"
                ],
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/every",
                "!doc": "Tests whether all elements in the array pass the test implemented by the provided function."
            },
            "some": {
                "!type": "fn(test: fn(elt: ?, i: number, array: +Array) -> bool, context?: ?) -> bool",
                "!effects": [
                    "call !0 this=!1 !this.<i> number !this"
                ],
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/some",
                "!doc": "Tests whether some element in the array passes the test implemented by the provided function."
            },
            "filter": {
                "!type": "fn(test: fn(elt: ?, i: number, array: +Array) -> bool, context?: ?) -> !this",
                "!effects": [
                    "call !0 this=!1 !this.<i> number !this"
                ],
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/filter",
                "!doc": "Creates a new array with all elements that pass the test implemented by the provided function."
            },
            "forEach": {
                "!type": "fn(f: fn(elt: ?, i: number, array: +Array), context?: ?)",
                "!effects": [
                    "call !0 this=!1 !this.<i> number !this"
                ],
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/forEach",
                "!doc": "Executes a provided function once per array element."
            },
            "map": {
                "!type": "fn(f: fn(elt: ?, i: number, array: +Array) -> ?, context?: ?) -> [!0.!ret]",
                "!effects": [
                    "call !0 this=!1 !this.<i> number !this"
                ],
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/map",
                "!doc": "Creates a new array with the results of calling a provided function on every element in this array."
            },
            "reduce": {
                "!type": "fn(combine: fn(sum: ?, elt: ?, i: number, array: +Array) -> ?, init?: ?) -> !0.!ret",
                "!effects": [
                    "call !0 !1 !this.<i> number !this"
                ],
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/Reduce",
                "!doc": "Apply a function against an accumulator and each value of the array (from left-to-right) as to reduce it to a single value."
            },
            "reduceRight": {
                "!type": "fn(combine: fn(sum: ?, elt: ?, i: number, array: +Array) -> ?, init?: ?) -> !0.!ret",
                "!effects": [
                    "call !0 !1 !this.<i> number !this"
                ],
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/ReduceRight",
                "!doc": "Apply a function simultaneously against two values of the array (from right-to-left) as to reduce it to a single value."
            },
            "copyWithin": {
                "!type": "fn(target: number, start: number, end?: number) -> !this",
                "!doc": "The copyWithin() method copies the sequence of array elements within the array to the position starting at target. The copy is taken from the index positions of the second and third arguments start and end.",
                "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin"
            },
            "entries": {
                "!type": "fn() -> +iter[:t=[number, !this.<i>]]",
                "!doc": "The entries() method returns a new Array Iterator object that contains the key/value pairs for each index in the array.",
                "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/entries"
            },
            "fill": {
                "!type": "fn(value: ?, start?: number, end?: number) -> !this",
                "!doc": "The fill() method fills all the elements of an array from a start index to an end index with a static value.",
                "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill"
            },
            "find": {
                "!type": "fn(callback: fn(element: ?, index: number, array: [?]) -> bool, thisArg?: ?) -> !this.<i>",
                "!effects": ["call !0 this=!2 !this.<i> number"],
                "!doc": "The find() method returns a value in the array, if an element in the array satisfies the provided testing function. Otherwise undefined is returned.",
                "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find"
            },
            "findIndex": {
                "!type": "fn(callback: fn(element: ?, index: number, array: [?]), thisArg?: ?) -> number",
                "!effects": ["call !0 this=!2 !this.<i> number"],
                "!doc": "The findIndex() method returns an index in the array, if an element in the array satisfies the provided testing function. Otherwise -1 is returned.",
                "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex"
            },
            "keys": {
                "!type": "fn() -> +iter[:t=number]",
                "!doc": "The keys() method returns a new Array Iterator that contains the keys for each index in the array.",
                "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/keys"
            },
            "values": {
                "!type": "fn() -> +iter[:t=!this.<i>]",
                "!doc": "The values() method returns a new Array Iterator object that contains the values for each index in the array.",
                "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/values"
            },
            ":Symbol.iterator": {
                "!type": "fn() -> +iter[:t=!this.<i>]",
                "!doc": "Returns a new Array Iterator object that contains the values for each index in the array.",
                "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/@@iterator"
            },
            "includes": {
                "!type": "fn(value: ?) -> bool",
                "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes",
                "!doc": "Determines whether an array includes a certain element, returning true or false as appropriate."
            }
        },
        "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array",
        "!doc": "The JavaScript Array global object is a constructor for arrays, which are high-level, list-like objects."
    },
    "String": {
        "!type": "fn(value: ?) -> string",
        "fromCharCode": {
            "!type": "fn(code: number) -> string",
            "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/fromCharCode",
            "!doc": "Returns a string created by using the specified sequence of Unicode values."
        },
        "fromCodePoint": {
            "!type": "fn(point: number, point?: number) -> string",
            "!doc": "The static String.fromCodePoint() method returns a string created by using the specified sequence of code points.",
            "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint"
        },
        "raw": {
            "!type": "fn(template: [string], substitutions: ?, templateString: ?) -> string",
            "!doc": "The static String.raw() method is a tag function of template strings, used to get the raw string form of template strings.",
            "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/raw"
        },
        "prototype": {
            "!stdProto": "String",
            "length": {
                "!type": "number",
                "!url": "https://developer.mozilla.org/en/docs/JavaScript/Reference/Global_Objects/String/length",
                "!doc": "Represents the length of a string."
            },
            "<i>": "string",
            "charAt": {
                "!type": "fn(i: number) -> string",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/charAt",
                "!doc": "Returns the specified character from a string."
            },
            "charCodeAt": {
                "!type": "fn(i: number) -> number",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/charCodeAt",
                "!doc": "Returns the numeric Unicode value of the character at the given index (except for unicode codepoints > 0x10000)."
            },
            "indexOf": {
                "!type": "fn(char: string, from?: number) -> number",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/indexOf",
                "!doc": "Returns the index within the calling String object of the first occurrence of the specified value, starting the search at fromIndex,\nreturns -1 if the value is not found."
            },
            "lastIndexOf": {
                "!type": "fn(char: string, from?: number) -> number",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/lastIndexOf",
                "!doc": "Returns the index within the calling String object of the last occurrence of the specified value, or -1 if not found. The calling string is searched backward, starting at fromIndex."
            },
            "substring": {
                "!type": "fn(from: number, to?: number) -> string",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/substring",
                "!doc": "Returns a subset of a string between one index and another, or through the end of the string."
            },
            "substr": {
                "!type": "fn(from: number, length?: number) -> string",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/substr",
                "!doc": "Returns the characters in a string beginning at the specified location through the specified number of characters."
            },
            "slice": {
                "!type": "fn(from: number, to?: number) -> string",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/slice",
                "!doc": "Extracts a section of a string and returns a new string."
            },
            "trim": {
                "!type": "fn() -> string",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/Trim",
                "!doc": "Removes whitespace from both ends of the string."
            },
            "toUpperCase": {
                "!type": "fn() -> string",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/toUpperCase",
                "!doc": "Returns the calling string value converted to uppercase."
            },
            "toLowerCase": {
                "!type": "fn() -> string",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/toLowerCase",
                "!doc": "Returns the calling string value converted to lowercase."
            },
            "toLocaleUpperCase": {
                "!type": "fn() -> string",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/toLocaleUpperCase",
                "!doc": "Returns the calling string value converted to upper case, according to any locale-specific case mappings."
            },
            "toLocaleLowerCase": {
                "!type": "fn() -> string",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/toLocaleLowerCase",
                "!doc": "Returns the calling string value converted to lower case, according to any locale-specific case mappings."
            },
            "split": {
                "!type": "fn(pattern?: string|+RegExp, limit?: number) -> [string]",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/split",
                "!doc": "Splits a String object into an array of strings by separating the string into substrings."
            },
            "concat": {
                "!type": "fn(other: string) -> string",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/concat",
                "!doc": "Combines the text of two or more strings and returns a new string."
            },
            "localeCompare": {
                "!type": "fn(other: string) -> number",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/localeCompare",
                "!doc": "Returns a number indicating whether a reference string comes before or after or is the same as the given string in sort order."
            },
            "match": {
                "!type": "fn(pattern: +RegExp) -> [string]",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/match",
                "!doc": "Used to retrieve the matches when matching a string against a regular expression."
            },
            "replace": {
                "!type": "fn(pattern: string|+RegExp, replacement: string) -> string",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/replace",
                "!doc": "Returns a new string with some or all matches of a pattern replaced by a replacement.  The pattern can be a string or a RegExp, and the replacement can be a string or a function to be called for each match."
            },
            "search": {
                "!type": "fn(pattern: +RegExp) -> number",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/search",
                "!doc": "Executes the search for a match between a regular expression and this String object."
            },
            "codePointAt": {
                "!type": "fn(pos: number) -> number",
                "!doc": "The codePointAt() method returns a non-negative integer that is the UTF-16 encoded code point value.",
                "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt"
            },
            "endsWith": {
                "!type": "fn(searchString: string, position?: number) -> bool",
                "!doc": "The endsWith() method determines whether a string ends with the characters of another string, returning true or false as appropriate.",
                "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith"
            },
            "includes": {
                "!type": "fn(searchString: string, position?: number) -> bool",
                "!doc": "The includes() method determines whether one string may be found within another string, returning true or false as appropriate.",
                "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/contains"
            },
            "normalize": {
                "!type": "fn(form: string) -> string",
                "!doc": "The normalize() method returns the Unicode Normalization Form of a given string (if the value isn't a string, it will be converted to one first).",
                "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize"
            },
            "repeat": {
                "!type": "fn(count: number) -> string",
                "!doc": "The repeat() method constructs and returns a new string which contains the specified number of copies of the string on which it was called, concatenated together.",
                "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat"
            },
            "startsWith": {
                "!type": "fn(searchString: string, position?: number) -> bool",
                "!doc": "The startsWith() method determines whether a string begins with the characters of another string, returning true or false as appropriate.",
                "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith"
            },
            ":Symbol.iterator": {
                "!type": "fn() -> +iter[:t=string]",
                "!doc": "Returns a new Iterator object that iterates over the code points of a String value, returning each code point as a String value.",
                "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/@@iterator"
            }
        },
        "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String",
        "!doc": "The String global object is a constructor for strings, or a sequence of characters."
    },
    "Number": {
        "!type": "fn(value: ?) -> number",
        "MAX_VALUE": {
            "!type": "number",
            "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Number/MAX_VALUE",
            "!doc": "The maximum numeric value representable in JavaScript."
        },
        "MIN_VALUE": {
            "!type": "number",
            "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Number/MIN_VALUE",
            "!doc": "The smallest positive numeric value representable in JavaScript."
        },
        "POSITIVE_INFINITY": {
            "!type": "number",
            "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Number/POSITIVE_INFINITY",
            "!doc": "A value representing the positive Infinity value."
        },
        "NEGATIVE_INFINITY": {
            "!type": "number",
            "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Number/NEGATIVE_INFINITY",
            "!doc": "A value representing the negative Infinity value."
        },
        "prototype": {
            "!stdProto": "Number",
            "toString": {
                "!type": "fn(radix?: number) -> string",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Number/toString",
                "!doc": "Returns a string representing the specified Number object"
            },
            "toFixed": {
                "!type": "fn(digits: number) -> string",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Number/toFixed",
                "!doc": "Formats a number using fixed-point notation"
            },
            "toExponential": {
                "!type": "fn(digits: number) -> string",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Number/toExponential",
                "!doc": "Returns a string representing the Number object in exponential notation"
            },
            "toPrecision": {
                "!type": "fn(digits: number) -> string",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Number/toPrecision",
                "!doc": "The toPrecision() method returns a string representing the number to the specified precision."
            }
        },
        "EPSILON": {
            "!type": "number",
            "!doc": "The Number.EPSILON property represents the difference between one and the smallest value greater than one that can be represented as a Number.",
            "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/EPSILON"
        },
        "MAX_SAFE_INTEGER": {
            "!type": "number",
            "!doc": "The Number.MAX_SAFE_INTEGER constant represents the maximum safe integer in JavaScript (253 - 1).",
            "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER"
        },
        "MIN_SAFE_INTEGER": {
            "!type": "number",
            "!doc": "The Number.MIN_SAFE_INTEGER constant represents the minimum safe integer in JavaScript (-(253 - 1)).",
            "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MIN_SAFE_INTEGER"
        },
        "isFinite": {
            "!type": "fn(testValue: ?) -> bool",
            "!doc": "The Number.isFinite() method determines whether the passed value is finite.",
            "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite"
        },
        "isInteger": {
            "!type": "fn(testValue: ?) -> bool",
            "!doc": "The Number.isInteger() method determines whether the passed value is an integer.",
            "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger"
        },
        "isNaN": {
            "!type": "fn(testValue: ?) -> bool",
            "!doc": "The Number.isNaN() method determines whether the passed value is NaN. More robust version of the original global isNaN().",
            "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN"
        },
        "isSafeInteger": {
            "!type": "fn(testValue: ?) -> bool",
            "!doc": "The Number.isSafeInteger() method determines whether the provided value is a number that is a safe integer. A safe integer is an integer that",
            "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger"
        },
        "parseFloat": {
            "!type": "fn(string: string) -> number",
            "!doc": "The Number.parseFloat() method parses a string argument and returns a floating point number.",
            "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/parseFloat"
        },
        "parseInt": {
            "!type": "fn(string: string, radix?: number) -> number",
            "!doc": "The Number.parseInt() method parses a string argument and returns an integer of the specified radix or base.",
            "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/parseInt"
        },
        "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Number",
        "!doc": "The Number JavaScript object is a wrapper object allowing you to work with numerical values. A Number object is created using the Number() constructor."
    },
    "Boolean": {
        "!type": "fn(value: ?) -> bool",
        "prototype": {
            "!stdProto": "Boolean"
        },
        "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Boolean",
        "!doc": "The Boolean object is an object wrapper for a boolean value."
    },
    "RegExp": {
        "!type": "fn(source: string, flags?: string)",
        "prototype": {
            "!stdProto": "RegExp",
            "exec": {
                "!type": "fn(input: string) -> [string]",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/RegExp/exec",
                "!doc": "Executes a search for a match in a specified string. Returns a result array, or null."
            },
            "test": {
                "!type": "fn(input: string) -> bool",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/RegExp/test",
                "!doc": "Executes the search for a match between a regular expression and a specified string. Returns true or false."
            },
            "global": {
                "!type": "bool",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/RegExp",
                "!doc": "Creates a regular expression object for matching text with a pattern."
            },
            "ignoreCase": {
                "!type": "bool",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/RegExp",
                "!doc": "Creates a regular expression object for matching text with a pattern."
            },
            "multiline": {
                "!type": "bool",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/RegExp/multiline",
                "!doc": "Reflects whether or not to search in strings across multiple lines.\n"
            },
            "source": {
                "!type": "string",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/RegExp/source",
                "!doc": "A read-only property that contains the text of the pattern, excluding the forward slashes.\n"
            },
            "lastIndex": {
                "!type": "number",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/RegExp/lastIndex",
                "!doc": "A read/write integer property that specifies the index at which to start the next match."
            },
            "flags": {
                "!type": "string",
                "!doc": "The flags property returns a string consisting of the flags of the current regular expression object.",
                "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/flags"
            },
            "sticky": {
                "!type": "bool",
                "!doc": "The sticky property reflects whether or not the search is sticky (searches in strings only from the index indicated by the lastIndex property of this regular expression). sticky is a read-only property of an individual regular expression object.",
                "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/sticky"
            },
            "unicode": {
                "!type": "bool",
                "!doc": "The 'u' flag enables various Unicode-related features.",
                "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/unicode"
            }
        },
        "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/RegExp",
        "!doc": "Creates a regular expression object for matching text with a pattern."
    },
    "Date": {
        "!type": "fn(ms: number)",
        "parse": {
            "!type": "fn(source: string) -> +Date",
            "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/parse",
            "!doc": "Parses a string representation of a date, and returns the number of milliseconds since January 1, 1970, 00:00:00 UTC."
        },
        "UTC": {
            "!type": "fn(year: number, month: number, date: number, hour?: number, min?: number, sec?: number, ms?: number) -> number",
            "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/UTC",
            "!doc": "Accepts the same parameters as the longest form of the constructor, and returns the number of milliseconds in a Date object since January 1, 1970, 00:00:00, universal time."
        },
        "now": {
            "!type": "fn() -> number",
            "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/now",
            "!doc": "Returns the number of milliseconds elapsed since 1 January 1970 00:00:00 UTC."
        },
        "prototype": {
            "toUTCString": {
                "!type": "fn() -> string",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/toUTCString",
                "!doc": "Converts a date to a string, using the universal time convention."
            },
            "toISOString": {
                "!type": "fn() -> string",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/toISOString",
                "!doc": "JavaScript provides a direct way to convert a date object into a string in ISO format, the ISO 8601 Extended Format."
            },
            "toDateString": {
                "!type": "fn() -> string",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/toDateString",
                "!doc": "Returns the date portion of a Date object in human readable form in American English."
            },
            "toTimeString": {
                "!type": "fn() -> string",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/toTimeString",
                "!doc": "Returns the time portion of a Date object in human readable form in American English."
            },
            "toLocaleDateString": {
                "!type": "fn() -> string",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/toLocaleDateString",
                "!doc": "Converts a date to a string, returning the \"date\" portion using the operating system's locale's conventions.\n"
            },
            "toLocaleTimeString": {
                "!type": "fn() -> string",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/toLocaleTimeString",
                "!doc": "Converts a date to a string, returning the \"time\" portion using the current locale's conventions."
            },
            "getTime": {
                "!type": "fn() -> number",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/getTime",
                "!doc": "Returns the numeric value corresponding to the time for the specified date according to universal time."
            },
            "getFullYear": {
                "!type": "fn() -> number",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/getFullYear",
                "!doc": "Returns the year of the specified date according to local time."
            },
            "getYear": {
                "!type": "fn() -> number",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/getYear",
                "!doc": "Returns the year in the specified date according to local time."
            },
            "getMonth": {
                "!type": "fn() -> number",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/getMonth",
                "!doc": "Returns the month in the specified date according to local time."
            },
            "getUTCMonth": {
                "!type": "fn() -> number",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/getUTCMonth",
                "!doc": "Returns the month of the specified date according to universal time.\n"
            },
            "getDate": {
                "!type": "fn() -> number",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/getDate",
                "!doc": "Returns the day of the month for the specified date according to local time."
            },
            "getUTCDate": {
                "!type": "fn() -> number",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/getUTCDate",
                "!doc": "Returns the day (date) of the month in the specified date according to universal time.\n"
            },
            "getDay": {
                "!type": "fn() -> number",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/getDay",
                "!doc": "Returns the day of the week for the specified date according to local time."
            },
            "getUTCDay": {
                "!type": "fn() -> number",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/getUTCDay",
                "!doc": "Returns the day of the week in the specified date according to universal time.\n"
            },
            "getHours": {
                "!type": "fn() -> number",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/getHours",
                "!doc": "Returns the hour for the specified date according to local time."
            },
            "getUTCHours": {
                "!type": "fn() -> number",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/getUTCHours",
                "!doc": "Returns the hours in the specified date according to universal time.\n"
            },
            "getMinutes": {
                "!type": "fn() -> number",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/getMinutes",
                "!doc": "Returns the minutes in the specified date according to local time."
            },
            "getUTCMinutes": {
                "!type": "fn() -> number",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date",
                "!doc": "Creates JavaScript Date instances which let you work with dates and times."
            },
            "getSeconds": {
                "!type": "fn() -> number",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/getSeconds",
                "!doc": "Returns the seconds in the specified date according to local time."
            },
            "getUTCSeconds": {
                "!type": "fn() -> number",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/getUTCSeconds",
                "!doc": "Returns the seconds in the specified date according to universal time.\n"
            },
            "getMilliseconds": {
                "!type": "fn() -> number",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/getMilliseconds",
                "!doc": "Returns the milliseconds in the specified date according to local time."
            },
            "getUTCMilliseconds": {
                "!type": "fn() -> number",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/getUTCMilliseconds",
                "!doc": "Returns the milliseconds in the specified date according to universal time.\n"
            },
            "getTimezoneOffset": {
                "!type": "fn() -> number",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset",
                "!doc": "Returns the time-zone offset from UTC, in minutes, for the current locale."
            },
            "setTime": {
                "!type": "fn(date: +Date) -> number",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/setTime",
                "!doc": "Sets the Date object to the time represented by a number of milliseconds since January 1, 1970, 00:00:00 UTC.\n"
            },
            "setFullYear": {
                "!type": "fn(year: number) -> number",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/setFullYear",
                "!doc": "Sets the full year for a specified date according to local time.\n"
            },
            "setUTCFullYear": {
                "!type": "fn(year: number) -> number",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/setUTCFullYear",
                "!doc": "Sets the full year for a specified date according to universal time.\n"
            },
            "setMonth": {
                "!type": "fn(month: number) -> number",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/setMonth",
                "!doc": "Set the month for a specified date according to local time."
            },
            "setUTCMonth": {
                "!type": "fn(month: number) -> number",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/setUTCMonth",
                "!doc": "Sets the month for a specified date according to universal time.\n"
            },
            "setDate": {
                "!type": "fn(day: number) -> number",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/setDate",
                "!doc": "Sets the day of the month for a specified date according to local time."
            },
            "setUTCDate": {
                "!type": "fn(day: number) -> number",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/setUTCDate",
                "!doc": "Sets the day of the month for a specified date according to universal time.\n"
            },
            "setHours": {
                "!type": "fn(hour: number) -> number",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/setHours",
                "!doc": "Sets the hours for a specified date according to local time, and returns the number of milliseconds since 1 January 1970 00:00:00 UTC until the time represented by the updated Date instance."
            },
            "setUTCHours": {
                "!type": "fn(hour: number) -> number",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/setUTCHours",
                "!doc": "Sets the hour for a specified date according to universal time.\n"
            },
            "setMinutes": {
                "!type": "fn(min: number) -> number",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/setMinutes",
                "!doc": "Sets the minutes for a specified date according to local time."
            },
            "setUTCMinutes": {
                "!type": "fn(min: number) -> number",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/setUTCMinutes",
                "!doc": "Sets the minutes for a specified date according to universal time.\n"
            },
            "setSeconds": {
                "!type": "fn(sec: number) -> number",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/setSeconds",
                "!doc": "Sets the seconds for a specified date according to local time."
            },
            "setUTCSeconds": {
                "!type": "fn(sec: number) -> number",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/setUTCSeconds",
                "!doc": "Sets the seconds for a specified date according to universal time.\n"
            },
            "setMilliseconds": {
                "!type": "fn(ms: number) -> number",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/setMilliseconds",
                "!doc": "Sets the milliseconds for a specified date according to local time.\n"
            },
            "setUTCMilliseconds": {
                "!type": "fn(ms: number) -> number",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/setUTCMilliseconds",
                "!doc": "Sets the milliseconds for a specified date according to universal time.\n"
            },
            "toJSON": {
                "!type": "fn() -> string",
                "!doc": "Returns a string (using toISOString()) representing the Date object's value.",
                "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toJSON"
            }
        },
        "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date",
        "!doc": "Creates JavaScript Date instances which let you work with dates and times."
    },
    "Error": {
        "!type": "fn(message: string)",
        "prototype": {
            "name": {
                "!type": "string",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Error/name",
                "!doc": "A name for the type of error."
            },
            "message": {
                "!type": "string",
                "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Error/message",
                "!doc": "A human-readable description of the error."
            }
        },
        "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Error",
        "!doc": "Creates an error object."
    },
    "SyntaxError": {
        "!type": "fn(message: string)",
        "prototype": "Error.prototype",
        "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/SyntaxError",
        "!doc": "Represents an error when trying to interpret syntactically invalid code."
    },
    "ReferenceError": {
        "!type": "fn(message: string)",
        "prototype": "Error.prototype",
        "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/ReferenceError",
        "!doc": "Represents an error when a non-existent variable is referenced."
    },
    "URIError": {
        "!type": "fn(message: string)",
        "prototype": "Error.prototype",
        "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/URIError",
        "!doc": "Represents an error when a malformed URI is encountered."
    },
    "EvalError": {
        "!type": "fn(message: string)",
        "prototype": "Error.prototype",
        "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/EvalError",
        "!doc": "Represents an error regarding the eval function."
    },
    "RangeError": {
        "!type": "fn(message: string)",
        "prototype": "Error.prototype",
        "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/RangeError",
        "!doc": "Represents an error when a number is not within the correct range allowed."
    },
    "TypeError": {
        "!type": "fn(message: string)",
        "prototype": "Error.prototype",
        "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/TypeError",
        "!doc": "Represents an error an error when a value is not of the expected type."
    },
    "parseInt": {
        "!type": "fn(string: string, radix?: number) -> number",
        "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/parseInt",
        "!doc": "Parses a string argument and returns an integer of the specified radix or base."
    },
    "parseFloat": {
        "!type": "fn(string: string) -> number",
        "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/parseFloat",
        "!doc": "Parses a string argument and returns a floating point number."
    },
    "isNaN": {
        "!type": "fn(value: number) -> bool",
        "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/isNaN",
        "!doc": "Determines whether a value is NaN or not. Be careful, this function is broken. You may be interested in ECMAScript 6 Number.isNaN."
    },
    "isFinite": {
        "!type": "fn(value: number) -> bool",
        "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/isFinite",
        "!doc": "Determines whether the passed value is a finite number."
    },
    "eval": {
        "!type": "fn(code: string) -> ?",
        "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/eval",
        "!doc": "Evaluates JavaScript code represented as a string."
    },
    "encodeURI": {
        "!type": "fn(uri: string) -> string",
        "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/encodeURI",
        "!doc": "Encodes a Uniform Resource Identifier (URI) by replacing each instance of certain characters by one, two, three, or four escape sequences representing the UTF-8 encoding of the character (will only be four escape sequences for characters composed of two \"surrogate\" characters)."
    },
    "encodeURIComponent": {
        "!type": "fn(uri: string) -> string",
        "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/encodeURIComponent",
        "!doc": "Encodes a Uniform Resource Identifier (URI) component by replacing each instance of certain characters by one, two, three, or four escape sequences representing the UTF-8 encoding of the character (will only be four escape sequences for characters composed of two \"surrogate\" characters)."
    },
    "decodeURI": {
        "!type": "fn(uri: string) -> string",
        "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/decodeURI",
        "!doc": "Decodes a Uniform Resource Identifier (URI) previously created by encodeURI or by a similar routine."
    },
    "decodeURIComponent": {
        "!type": "fn(uri: string) -> string",
        "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/decodeURIComponent",
        "!doc": "Decodes a Uniform Resource Identifier (URI) component previously created by encodeURIComponent or by a similar routine."
    },
    "Math": {
        "E": {
            "!type": "number",
            "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Math/E",
            "!doc": "The base of natural logarithms, e, approximately 2.718."
        },
        "LN2": {
            "!type": "number",
            "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Math/LN2",
            "!doc": "The natural logarithm of 2, approximately 0.693."
        },
        "LN10": {
            "!type": "number",
            "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Math/LN10",
            "!doc": "The natural logarithm of 10, approximately 2.302."
        },
        "LOG2E": {
            "!type": "number",
            "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Math/LOG2E",
            "!doc": "The base 2 logarithm of E (approximately 1.442)."
        },
        "LOG10E": {
            "!type": "number",
            "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Math/LOG10E",
            "!doc": "The base 10 logarithm of E (approximately 0.434)."
        },
        "SQRT1_2": {
            "!type": "number",
            "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Math/SQRT1_2",
            "!doc": "The square root of 1/2; equivalently, 1 over the square root of 2, approximately 0.707."
        },
        "SQRT2": {
            "!type": "number",
            "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Math/SQRT2",
            "!doc": "The square root of 2, approximately 1.414."
        },
        "PI": {
            "!type": "number",
            "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Math/PI",
            "!doc": "The ratio of the circumference of a circle to its diameter, approximately 3.14159."
        },
        "abs": {
            "!type": "fn(number) -> number",
            "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Math/abs",
            "!doc": "Returns the absolute value of a number."
        },
        "cos": {
            "!type": "fn(number) -> number",
            "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Math/cos",
            "!doc": "Returns the cosine of a number."
        },
        "sin": {
            "!type": "fn(number) -> number",
            "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Math/sin",
            "!doc": "Returns the sine of a number."
        },
        "tan": {
            "!type": "fn(number) -> number",
            "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Math/tan",
            "!doc": "Returns the tangent of a number."
        },
        "acos": {
            "!type": "fn(number) -> number",
            "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Math/acos",
            "!doc": "Returns the arccosine (in radians) of a number."
        },
        "asin": {
            "!type": "fn(number) -> number",
            "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Math/asin",
            "!doc": "Returns the arcsine (in radians) of a number."
        },
        "atan": {
            "!type": "fn(number) -> number",
            "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Math/atan",
            "!doc": "Returns the arctangent (in radians) of a number."
        },
        "atan2": {
            "!type": "fn(y: number, x: number) -> number",
            "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Math/atan2",
            "!doc": "Returns the arctangent of the quotient of its arguments."
        },
        "ceil": {
            "!type": "fn(number) -> number",
            "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Math/ceil",
            "!doc": "Returns the smallest integer greater than or equal to a number."
        },
        "floor": {
            "!type": "fn(number) -> number",
            "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Math/floor",
            "!doc": "Returns the largest integer less than or equal to a number."
        },
        "round": {
            "!type": "fn(number) -> number",
            "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Math/round",
            "!doc": "Returns the value of a number rounded to the nearest integer."
        },
        "exp": {
            "!type": "fn(number) -> number",
            "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Math/exp",
            "!doc": "Returns Ex, where x is the argument, and E is Euler's constant, the base of the natural logarithms."
        },
        "log": {
            "!type": "fn(number) -> number",
            "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Math/log",
            "!doc": "Returns the natural logarithm (base E) of a number."
        },
        "sqrt": {
            "!type": "fn(number) -> number",
            "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Math/sqrt",
            "!doc": "Returns the square root of a number."
        },
        "pow": {
            "!type": "fn(number, number) -> number",
            "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Math/pow",
            "!doc": "Returns base to the exponent power, that is, baseexponent."
        },
        "max": {
            "!type": "fn(number, number) -> number",
            "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Math/max",
            "!doc": "Returns the largest of zero or more numbers."
        },
        "min": {
            "!type": "fn(number, number) -> number",
            "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Math/min",
            "!doc": "Returns the smallest of zero or more numbers."
        },
        "random": {
            "!type": "fn() -> number",
            "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Math/random",
            "!doc": "Returns a floating-point, pseudo-random number in the range [0, 1) that is, from 0 (inclusive) up to but not including 1 (exclusive), which you can then scale to your desired range."
        },
        "acosh": {
            "!type": "fn(x: number) -> number",
            "!doc": "The Math.acosh() function returns the hyperbolic arc-cosine of a number.",
            "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/acosh"
        },
        "asinh": {
            "!type": "fn(x: number) -> number",
            "!doc": "The Math.asinh() function returns the hyperbolic arcsine of a number.",
            "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/asinh"
        },
        "atanh": {
            "!type": "fn(x: number) -> number",
            "!doc": "The Math.atanh() function returns the hyperbolic arctangent of a number.",
            "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/atanh"
        },
        "cbrt": {
            "!type": "fn(x: number) -> number",
            "!doc": "The Math.cbrt() function returns the cube root of a number.",
            "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/cbrt"
        },
        "clz32": {
            "!type": "fn(x: number) -> number",
            "!doc": "The Math.clz32() function returns the number of leading zero bits in the 32-bit binary representation of a number.",
            "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/clz32"
        },
        "cosh": {
            "!type": "fn(x: number) -> number",
            "!doc": "The Math.cosh() function returns the hyperbolic cosine of a number, that can be expressed using the constant e:",
            "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/cosh"
        },
        "expm1": {
            "!type": "fn(x: number) -> number",
            "!doc": "The Math.expm1() function returns ex - 1, where x is the argument, and e the base of the natural logarithms.",
            "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/expm1"
        },
        "fround": {
            "!type": "fn(x: number) -> number",
            "!doc": "The Math.fround() function returns the nearest single precision float representation of a number.",
            "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/fround"
        },
        "hypot": {
            "!type": "fn(value: number) -> number",
            "!doc": "The Math.hypot() function returns the square root of the sum of squares of its arguments.",
            "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/hypot"
        },
        "imul": {
            "!type": "fn(a: number, b: number) -> number",
            "!doc": "The Math.imul() function returns the result of the C-like 32-bit multiplication of the two parameters.",
            "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/imul"
        },
        "log10": {
            "!type": "fn(x: number) -> number",
            "!doc": "The Math.log10() function returns the base 10 logarithm of a number.",
            "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/log10"
        },
        "log1p": {
            "!type": "fn(x: number) -> number",
            "!doc": "The Math.log1p() function returns the natural logarithm (base e) of 1 + a number.",
            "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/log1p"
        },
        "log2": {
            "!type": "fn(x: number) -> number",
            "!doc": "The Math.log2() function returns the base 2 logarithm of a number.",
            "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/log2"
        },
        "sign": {
            "!type": "fn(x: number) -> number",
            "!doc": "The Math.sign() function returns the sign of a number, indicating whether the number is positive, negative or zero.",
            "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sign"
        },
        "sinh": {
            "!type": "fn(x: number) -> number",
            "!doc": "The Math.sinh() function returns the hyperbolic sine of a number, that can be expressed using the constant e:",
            "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sinh"
        },
        "tanh": {
            "!type": "fn(x: number) -> number",
            "!doc": "The Math.tanh() function returns the hyperbolic tangent of a number.",
            "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/tanh"
        },
        "trunc": {
            "!type": "fn(x: number) -> number",
            "!doc": "The Math.trunc() function returns the integral part of a number by removing any fractional digits. It does not round any numbers. The function can be expressed with the floor() and ceil() function:",
            "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/trunc"
        },
        "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Math",
        "!doc": "A built-in object that has properties and methods for mathematical constants and functions."
    },
    "JSON": {
        "parse": {
            "!type": "fn(json: string, reviver?: fn(key: string, value: ?) -> ?) -> ?",
            "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/JSON/parse",
            "!doc": "Parse a string as JSON, optionally transforming the value produced by parsing."
        },
        "stringify": {
            "!type": "fn(value: ?, replacer?: fn(key: string, value: ?) -> ?, space?: string|number) -> string",
            "!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/JSON/stringify",
            "!doc": "Convert a value to JSON, optionally replacing values if a replacer function is specified, or optionally including only the specified properties if a replacer array is specified."
        },
        "!url": "https://developer.mozilla.org/en-US/docs/JSON",
        "!doc": "JSON (JavaScript Object Notation) is a data-interchange format.  It closely resembles a subset of JavaScript syntax, although it is not a strict subset. (See JSON in the JavaScript Reference for full details.)  It is useful when writing any kind of JavaScript-based application, including websites and browser extensions.  For example, you might store user information in JSON format in a cookie, or you might store extension preferences in JSON in a string-valued browser preference."
    },
    "ArrayBuffer": {
        "!type": "fn(length: number)",
        "!doc": "The ArrayBuffer object is used to represent a generic, fixed-length raw binary data buffer.",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer",
        "isView": {
            "!type": "fn(arg: +ArrayBuffer) -> bool",
            "!doc": "The ArrayBuffer.isView() method returns true if arg is one of the ArrayBuffer views, such as typed array objects or a DataView; false otherwise.",
            "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer/isView"
        },
        "prototype": {
            "byteLength": {
                "!type": "number",
                "!doc": "The byteLength accessor property represents the length of an ArrayBuffer in bytes.",
                "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer/byteLength"
            },
            "slice": {
                "!type": "fn(begin: number, end?: number) -> +ArrayBuffer",
                "!doc": "The slice() method returns a new ArrayBuffer whose contents are a copy of this ArrayBuffer's bytes from begin, inclusive, up to end, exclusive.",
                "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer/slice"
            }
        }
    },
    "DataView": {
        "!type": "fn(buffer: +ArrayBuffer, byteOffset?: number, byteLength?: number)",
        "!doc": "The DataView view provides a low-level interface for reading data from and writing it to an ArrayBuffer.",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView",
        "prototype": {
            "buffer": {
                "!type": "+ArrayBuffer",
                "!doc": "The buffer accessor property represents the ArrayBuffer referenced by the DataView at construction time.",
                "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView/buffer"
            },
            "byteLength": {
                "!type": "number",
                "!doc": "The byteLength accessor property represents the length (in bytes) of this view from the start of its ArrayBuffer.",
                "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView/byteLength"
            },
            "byteOffset": {
                "!type": "number",
                "!doc": "The byteOffset accessor property represents the offset (in bytes) of this view from the start of its ArrayBuffer.",
                "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView/byteOffset"
            },
            "getFloat32": {
                "!type": "fn(byteOffset: number, littleEndian?: bool) -> number",
                "!doc": "The getFloat32() method gets a signed 32-bit integer (float) at the specified byte offset from the start of the DataView.",
                "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView/getFloat32"
            },
            "getFloat64": {
                "!type": "fn(byteOffset: number, littleEndian?: bool) -> number",
                "!doc": "The getFloat64() method gets a signed 64-bit float (double) at the specified byte offset from the start of the DataView.",
                "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView/getFloat64"
            },
            "getInt16": {
                "!type": "fn(byteOffset: number, littleEndian?: bool) -> number",
                "!doc": "The getInt16() method gets a signed 16-bit integer (short) at the specified byte offset from the start of the DataView.",
                "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView/getInt16"
            },
            "getInt32": {
                "!type": "fn(byteOffset: number, littleEndian?: bool) -> number",
                "!doc": "The getInt32() method gets a signed 32-bit integer (long) at the specified byte offset from the start of the DataView.",
                "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView/getInt32"
            },
            "getInt8": {
                "!type": "fn(byteOffset: number, littleEndian?: bool) -> number",
                "!doc": "The getInt8() method gets a signed 8-bit integer (byte) at the specified byte offset from the start of the DataView.",
                "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView/getInt8"
            },
            "getUint16": {
                "!type": "fn(byteOffset: number, littleEndian?: bool) -> number",
                "!doc": "The getUint16() method gets an unsigned 16-bit integer (unsigned short) at the specified byte offset from the start of the DataView.",
                "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView/getUint16"
            },
            "getUint32": {
                "!type": "fn(byteOffset: number, littleEndian?: bool) -> number",
                "!doc": "The getUint32() method gets an unsigned 32-bit integer (unsigned long) at the specified byte offset from the start of the DataView.",
                "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView/getUint32"
            },
            "getUint8": {
                "!type": "fn(byteOffset: number) -> number",
                "!doc": "The getUint8() method gets an unsigned 8-bit integer (unsigned byte) at the specified byte offset from the start of the DataView.",
                "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView/getUint8"
            },
            "setFloat32": {
                "!type": "fn(byteOffset: number, value: number, littleEndian?: bool)",
                "!doc": "The setFloat32() method stores a signed 32-bit integer (float) value at the specified byte offset from the start of the DataView.",
                "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView/setFloat32"
            },
            "setFloat64": {
                "!type": "fn(byteOffset: number, value: number, littleEndian?: bool)",
                "!doc": "The setFloat64() method stores a signed 64-bit integer (double) value at the specified byte offset from the start of the DataView.",
                "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView/setFloat64"
            },
            "setInt16": {
                "!type": "fn(byteOffset: number, value: number, littleEndian?: bool)",
                "!doc": "The setInt16() method stores a signed 16-bit integer (short) value at the specified byte offset from the start of the DataView.",
                "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView/setInt16"
            },
            "setInt32": {
                "!type": "fn(byteOffset: number, value: number, littleEndian?: bool)",
                "!doc": "The setInt32() method stores a signed 32-bit integer (long) value at the specified byte offset from the start of the DataView.",
                "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView/setInt32"
            },
            "setInt8": {
                "!type": "fn(byteOffset: number, value: number)",
                "!doc": "The setInt8() method stores a signed 8-bit integer (byte) value at the specified byte offset from the start of the DataView.",
                "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView/setInt8"
            },
            "setUint16": {
                "!type": "fn(byteOffset: number, value: number, littleEndian?: bool)",
                "!doc": "The setUint16() method stores an unsigned 16-bit integer (unsigned short) value at the specified byte offset from the start of the DataView.",
                "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView/setUint16"
            },
            "setUint32": {
                "!type": "fn(byteOffset: number, value: number, littleEndian?: bool)",
                "!doc": "The setUint32() method stores an unsigned 32-bit integer (unsigned long) value at the specified byte offset from the start of the DataView.",
                "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView/setUint32"
            },
            "setUint8": {
                "!type": "fn(byteOffset: number, value: number)",
                "!doc": "The setUint8() method stores an unsigned 8-bit integer (byte) value at the specified byte offset from the start of the DataView.",
                "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView/setUint8"
            }
        }
    },
    "Float32Array": "TypedArray",
    "Float64Array": "TypedArray",
    "Int16Array": "TypedArray",
    "Int32Array": "TypedArray",
    "Int8Array": "TypedArray",
    "Map": {
        "!type": "fn(iterable?: [?])",
        "!doc": "The Map object is a simple key/value map. Any value (both objects and primitive values) may be used as either a key or a value.",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map",
        "prototype": {
            "clear": {
                "!type": "fn()",
                "!doc": "The clear() method removes all elements from a Map object.",
                "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/clear"
            },
            "delete": {
                "!type": "fn(key: ?)",
                "!doc": "The delete() method removes the specified element from a Map object.",
                "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/delete"
            },
            "entries": {
                "!type": "fn() -> +iter[:t=[!this.:key, !this.:value]]",
                "!doc": "The entries() method returns a new Iterator object that contains the [key, value] pairs for each element in the Map object in insertion order.",
                "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/entries"
            },
            "forEach": {
                "!type": "fn(callback: fn(value: ?, key: ?, map: +Map), thisArg?: ?)",
                "!effects": ["call !0 this=!1 !this.:value !this.:key !this"],
                "!doc": "The forEach() method executes a provided function once per each key/value pair in the Map object, in insertion order.",
                "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/forEach"
            },
            "get": {
                "!type": "fn(key: ?) -> !this.:value",
                "!doc": "The get() method returns a specified element from a Map object.",
                "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get"
            },
            "has": {
                "!type": "fn(key: ?) -> bool",
                "!doc": "The has() method returns a boolean indicating whether an element with the specified key exists or not.",
                "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/has"
            },
            "keys": {
                "!type": "fn() -> +iter[:t=!this.:key]",
                "!doc": "The keys() method returns a new Iterator object that contains the keys for each element in the Map object in insertion order.",
                "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/keys"
            },
            "set": {
                "!type": "fn(key: ?, value: ?) -> !this",
                "!effects": ["propagate !0 !this.:key", "propagate !1 !this.:value"],
                "!doc": "The set() method adds a new element with a specified key and value to a Map object.",
                "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/set"
            },
            "size": {
                "!type": "number",
                "!doc": "The size accessor property returns the number of elements in a Map object.",
                "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/size"
            },
            "values": {
                "!type": "fn() -> +iter[:t=!this.:value]",
                "!doc": "The values() method returns a new Iterator object that contains the values for each element in the Map object in insertion order.",
                "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/values"
            },
            ":Symbol.iterator": {
                "!type": "fn() -> +iter[:t=[!this.:key, !this.:value]]",
                "!doc": "Returns a new Iterator object that contains the [key, value] pairs for each element in the Map object in insertion order.",
                "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/@@iterator"
            }
        }
    },
    "Promise": {
        "!type": "fn(executor: fn(resolve: fn(value: ?), reject: fn(reason: ?))) -> !custom:Promise_ctor",
        "!doc": "The Promise object is used for deferred and asynchronous computations. A Promise is in one of the three states:",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise",
        "all": {
            "!type": "fn(iterable: [+Promise]) -> +Promise[:t=[!0.<i>.:t]]",
            "!doc": "The Promise.all(iterable) method returns a promise that resolves when all of the promises in the iterable argument have resolved.",
            "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all"
        },
        "race": {
            "!type": "fn(iterable: [+Promise]) -> !0.<i>",
            "!doc": "The Promise.race(iterable) method returns a promise that resolves or rejects as soon as one of the promises in the iterable resolves or rejects, with the value or reason from that promise.",
            "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race"
        },
        "reject": "Promise_reject",
        "resolve": {
            "!type": "fn(value: ?) -> !custom:Promise_resolve",
            "!doc": "The Promise.resolve(value) method returns a Promise object that is resolved with the given value. If the value is a thenable (i.e. has a then method), the returned promise will 'follow' that thenable, adopting its eventual state; otherwise the returned promise will be fulfilled with the value.",
            "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve"
        },
        "prototype": "Promise.prototype"
    },
    "Proxy": {
        "!type": "fn(target: ?, handler: Proxy_handler)",
        "!doc": "The Proxy object is used to define the custom behavior in JavaScript fundamental operation (e.g. property lookup, assignment, enumeration, function invocation, etc).",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy",
        "revocable": {
            "!type": "fn(target: ?, handler: Proxy_handler) -> Proxy_revocable",
            "!doc": "The Proxy.revocable() method is used to create a revocable Proxy object.",
            "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/revocable"
        }
    },
    "Reflect": {
        "!doc": "Reflect is a built-in object that provides methods for interceptable JavaScript operations.",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect",
        "apply": {
            "!type": "fn(target: fn(), thisArg?: ?, argumentList?: [?]) -> !0.!ret",
            "!doc": "Calls a target function with arguments as specified.",
            "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/apply"
        },
        "construct": {
            "!type": "fn(target: fn(), argumentList?: [?]) -> ?",
            "!doc": "Acts like the new operator as a function. It is equivalent to calling new target(...args).",
            "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/construct"
        },
        "defineProperty": {
            "!type": "fn(target: ?, property: string, descriptor: propertyDescriptor) -> bool",
            "!doc": "The static Reflect.defineProperty() method is like Object.defineProperty() but returns a Boolean.",
            "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/defineProperty"
        },
        "deleteProperty": {
            "!type": "fn(target: ?, property: string) -> bool",
            "!doc": "Works like the delete operator as a function.",
            "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/deleteProperty"
        },
        "enumerate": {
            "!type": "fn(target: ?) -> +iter[:t=string]",
            "!doc": "Returns an iterator with the enumerable own and inherited properties of the target object.",
            "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/enumerate"
        },
        "get": {
            "!type": "fn(target: ?, property: string) -> ?",
            "!doc": "Gets a property from an object.",
            "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/get"
        },
        "getOwnPropertyDescriptor": {
            "!type": "fn(target: ?, property: string) -> ?",
            "!doc": "Returns a property descriptor of the given property if it exists on the object, undefined otherwise.",
            "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/getOwnPropertyDescriptor"
        },
        "getPrototypeOf": {
            "!type": "fn(target: ?) -> ?",
            "!doc": "Returns the prototype of the specified object.",
            "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/getPrototypeOf"
        },
        "has": {
            "!type": "fn(target: ?, property: string) -> bool",
            "!doc": "The static Reflect.has() method works like the in operator as a function.",
            "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/has"
        },
        "isExtensible": {
            "!type": "fn(target: ?) -> bool",
            "!doc": "Determines if an object is extensible (whether it can have new properties added to it).",
            "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/isExtensible"
        },
        "ownKeys": {
            "!type": "fn(target: ?) -> [string]",
            "!doc": "Returns an array of the target object's own property keys.",
            "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/ownKeys"
        },
        "preventExtensions": {
            "!type": "fn(target: ?) -> bool",
            "!doc": "Prevents new properties from ever being added to an object.",
            "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/preventExtensions"
        },
        "set": {
            "!type": "fn(target: ?, property: string, value: ?) -> bool",
            "!doc": "Set a property on an object.",
            "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/set"
        },
        "setPrototypeOf": {
            "!type": "fn(target: ?, prototype: ?) -> bool",
            "!doc": "Sets the prototype of a specified object to another object or to null.",
            "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/setPrototypeOf"
        }
    },
    "Set": {
        "!type": "fn(iterable?: [?])",
        "!doc": "The Set object lets you store unique values of any type, whether primitive values or object references.",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set",
        "prototype": {
            "add": {
                "!type": "fn(value: ?) -> !this",
                "!effects": ["propagate !0 !this.:t"],
                "!doc": "The add() method appends a new element with a specified value to the end of a Set object.",
                "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/add"
            },
            "clear": {
                "!type": "fn()",
                "!doc": "The clear() method removes all elements from a Set object.",
                "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/clear"
            },
            "delete": {
                "!type": "fn(value: ?) -> bool",
                "!doc": "The delete() method removes the specified element from a Set object.",
                "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/delete"
            },
            "entries": {
                "!type": "fn() -> +iter[:t=[!this.:t]]",
                "!doc": "The entries() method returns a new Iterator object that contains an array of [value, value] for each element in the Set object, in insertion order. For Set objects there is no key like in Map objects. However, to keep the API similar to the Map object, each entry has the same value for its key and value here, so that an array [value, value] is returned.",
                "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/entries"
            },
            "forEach": {
                "!type": "fn(callback: fn(value: ?, value2: ?, set: +Set), thisArg?: ?)",
                "!effects": ["call !0 this=!1 !this.:t number !this"],
                "!doc": "The forEach() method executes a provided function once per each value in the Set object, in insertion order.",
                "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/forEach"
            },
            "has": {
                "!type": "fn(value: ?) -> bool",
                "!doc": "The has() method returns a boolean indicating whether an element with the specified value exists in a Set object or not.",
                "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/has"
            },
            "keys": {
                "!type": "fn() -> +iter[:t=!this.:t]",
                "!doc": "The values() method returns a new Iterator object that contains the values for each element in the Set object in insertion order.",
                "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/keys"
            },
            "size": {
                "!type": "number",
                "!doc": "The size accessor property returns the number of elements in a Set object.",
                "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/size"
            },
            "values": {
                "!type": "fn() -> +iter[:t=!this.:t]",
                "!doc": "The values() method returns a new Iterator object that contains the values for each element in the Set object in insertion order.",
                "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/values"
            },
            ":Symbol.iterator": {
                "!type": "fn() -> +iter[:t=!this.:t]",
                "!doc": "Returns a new Iterator object that contains the values for each element in the Set object in insertion order.",
                "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/@@iterator"
            }
        }
    },
    "Symbol": {
        "!type": "fn(description?: string) -> !custom:getSymbol",
        "!doc": "A symbol is a unique and immutable data type and may be used as an identifier for object properties. The symbol object is an implicit object wrapper for the symbol primitive data type.",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol",
        "for": {
            "!type": "fn(key: string) -> !custom:getSymbol",
            "!doc": "The Symbol.for(key) method searches for existing symbols in a runtime-wide symbol registry with the given key and returns it if found. Otherwise a new symbol gets created in the global symbol registry with this key.",
            "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/for"
        },
        "keyFor": {
            "!type": "fn(sym: +Symbol) -> string",
            "!doc": "The Symbol.keyFor(sym) method retrieves a shared symbol key from the global symbol registry for the given symbol.",
            "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/keyFor"
        },
        "hasInstance": ":Symbol.hasInstance",
        "isConcatSpreadable": ":Symbol.isConcatSpreadable",
        "iterator": ":Symbol.iterator",
        "match": ":Symbol.match",
        "replace": ":Symbol.replace",
        "search": ":Symbol.search",
        "species": ":Symbol.species",
        "split": ":Symbol.split",
        "toStringTag": ":Symbol.toStringTag",
        "unscopables": ":Symbol.unscopables",
        "prototype": {
            "!stdProto": "Symbol"
        }
    },
    "Uint16Array": "TypedArray",
    "Uint32Array": "TypedArray",
    "Uint8Array": "TypedArray",
    "Uint8ClampedArray": "TypedArray",
    "WeakMap": {
        "!type": "fn(iterable?: [?])",
        "!doc": "The WeakMap object is a collection of key/value pairs in which the keys are objects and the values can be arbitrary values.",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap",
        "prototype": {
            "delete": {
                "!type": "fn(key: ?) -> bool",
                "!doc": "The delete() method removes the specified element from a WeakMap object.",
                "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap/delete"
            },
            "get": {
                "!type": "fn(key: ?) -> !this.:value",
                "!doc": "The get() method returns a specified element from a WeakMap object.",
                "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap/get"
            },
            "has": {
                "!type": "fn(key: ?) -> bool",
                "!doc": "The has() method returns a boolean indicating whether an element with the specified key exists in the WeakMap object or not.",
                "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap/has"
            },
            "set": {
                "!type": "fn(key: ?, value: ?)",
                "!effects": ["propagate !0 !this.:key", "propagate !1 !this.:value"],
                "!doc": "The set() method adds a new element with a specified key and value to a WeakMap object.",
                "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap/set"
            }
        }
    },
    "WeakSet": {
        "!type": "fn(iterable?: [?])",
        "!doc": "The WeakSet object lets you store weakly held objects in a collection.",
        "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet",
        "prototype": {
            "add": {
                "!type": "fn(value: ?)",
                "!doc": "The add() method appends a new object to the end of a WeakSet object.",
                "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet/add"
            },
            "delete": {
                "!type": "fn(value: ?) -> bool",
                "!doc": "The delete() method removes the specified element from a WeakSet object.",
                "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet/delete"
            },
            "has": {
                "!type": "fn(value: ?) -> bool",
                "!doc": "The has() method returns a boolean indicating whether an object exists in a WeakSet or not.",
                "!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet/has"
            }
        }
    }
};
//# sourceMappingURL=ecmascript.js.map

/***/ }),

/***/ 380:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export menuTemplateDev */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return contextMenu; });
/* unused harmony export template */
var menuTemplateDev = [{
        label: 'Options',
        submenu: [{
                label: 'Open Dev Tools',
                click: function () {
                    console.log('Tatti');
                },
            },],
    }, {
        label: 'View',
        submenu: [{
                label: 'View IP Address',
                click: function () {
                    var dialog = __webpack_require__(120).remote.dialog;
                    dialog.showMessageBox({
                        title: 'IP Address',
                        message: 'Hello'
                    });
                }
            }]
    }];
var contextMenu = [
    { role: 'copy' },
    { role: 'paste' },
    { type: 'separator' },
    { role: 'undo' },
    { role: 'redo' },
];
var template = [
    {
        label: 'Edit',
        submenu: [
            { role: 'undo' },
            { role: 'redo' },
            { type: 'separator' },
            { role: 'cut' },
            { role: 'copy' },
            { role: 'paste' },
            { role: 'pasteandmatchstyle' },
            { role: 'delete' },
            { role: 'selectall' }
        ]
    },
    {
        label: 'View',
        submenu: [
            { role: 'reload' },
            { role: 'forcereload' },
            { role: 'toggledevtools' },
            { type: 'separator' },
            { role: 'resetzoom' },
            { role: 'zoomin' },
            { role: 'zoomout' },
            { type: 'separator' },
            { role: 'togglefullscreen' }
        ]
    },
    {
        role: 'window',
        submenu: [
            { role: 'minimize' },
            { role: 'close' }
        ]
    },
    {
        role: 'help',
        submenu: [
            {
                label: 'Learn More',
                click: function () { __webpack_require__(120).shell.openExternal('https://electronjs.org'); }
            }
        ]
    }
];
//# sourceMappingURL=electron-resources.js.map

/***/ }),

/***/ 381:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HoverComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
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
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */]])
    ], HoverComponent);
    return HoverComponent;
}());

//# sourceMappingURL=hover.js.map

/***/ }),

/***/ 382:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CodebarComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_angular_material__ = __webpack_require__(85);
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
            selector: 'codebar',template:/*ion-inline-start:"G:\ionic\Project\quark\src\components\codebar\codebar.html"*/'<div class="page-template page-template-elementor_canvas page page-id-77 elementor-default elementor-template-canvas elementor-page elementor-page-77"\n\n  data-elementor-device-mode="mobile">\n\n  <div class="elementor elementor-77">\n\n    <div class="elementor-inner">\n\n      <div class="elementor-section-wrap">\n\n        <section data-id="85d6837" class="elementor-element elementor-element-85d6837 elementor-section-stretched elementor-section-full_width elementor-section-height-default elementor-section-height-default elementor-section-content-top mtr-js elementor-section elementor-top-section"\n\n          data-settings="{&quot;background_background&quot;:&quot;classic&quot;}" data-element_type="section" style="width:100%; left: 0px;">\n\n          <div class="elementor-container elementor-column-gap-no">\n\n            <div class="elementor-row">\n\n              <div data-id="0485474" class="elementor-element elementor-element-0485474 elementor-column elementor-col-50 elementor-top-column"\n\n                data-element_type="column">\n\n                <div class="elementor-column-wrap elementor-element-populated">\n\n                  <div class="elementor-widget-wrap">\n\n                    <div data-id="3c6c848" class="elementor-element elementor-element-3c6c848 elementor-align-left elementor-widget elementor-widget-button"\n\n                      data-element_type="button.default">\n\n                      <div class="elementor-widget-container">\n\n                        <div class="elementor-button-wrapper">\n\n                          <a class="elementor-button elementor-size-xs" role="button">\n\n                            <span class="elementor-button-content-wrapper">\n\n                              <span class="elementor-button-icon elementor-align-icon-left">\n\n                                <!-- <i class="fa fa-code" aria-hidden="true"></i> -->\n\n                                <!-- <i [ngClass]="{\'fa\' :true, \'fa-code\' : mode==\'Javascript\' || mode ==\'JSON\', \'fa-css3\' : mode==\'CSS\'}" aria-hidden="true"></i> -->\n\n                                <ion-icon [name]=" mode==\'Javascript\' || mode==\'JSON\'?\'logo-javascript\' : \'logo-css3\'"></ion-icon>\n\n                              </span>\n\n                              <span class="elementor-button-text">{{mode}}</span>\n\n                            </span>\n\n                          </a>\n\n                        </div>\n\n                      </div>\n\n                    </div>\n\n                  </div>\n\n                </div>\n\n              </div>\n\n              <div data-id="3d1c5df" class="elementor-element elementor-element-3d1c5df elementor-column elementor-col-50 elementor-top-column"\n\n                data-element_type="column">\n\n                <div class="elementor-column-wrap elementor-element-populated">\n\n                  <div class="elementor-widget-wrap">\n\n                    <div data-id="335c52a" class="elementor-element elementor-element-335c52a elementor-button-danger elementor-align-right elementor-widget elementor-widget-button"\n\n                      data-element_type="button.default">\n\n                      <div class="elementor-widget-container">\n\n                        <div class="elementor-button-wrapper">\n\n                          <a *ngIf="mode == \'Javascript\' || mode == \'JSON\'" tappable (click)="showInterface()" class="elementor-button elementor-size-xs" role="button">\n\n                            <span class="elementor-button-content-wrapper">\n\n                              <span class="elementor-button-icon elementor-align-icon-right">\n\n                                <i class="fa fa-indent" aria-hidden="true"></i>\n\n                              </span>\n\n                              <span class="elementor-button-text">Interface</span>\n\n                            </span>\n\n                          </a>\n\n                          <a tappable (click)="indent()" class="elementor-button elementor-size-xs" role="button">\n\n                            <span class="elementor-button-content-wrapper">\n\n                              <span class="elementor-button-icon elementor-align-icon-right">\n\n                                <i class="fa fa-indent" aria-hidden="true"></i>\n\n                              </span>\n\n                              <span class="elementor-button-text">Indent</span>\n\n                            </span>\n\n                          </a>\n\n                        </div>\n\n                      </div>\n\n                    </div>\n\n                  </div>\n\n                </div>\n\n              </div>\n\n            </div>\n\n          </div>\n\n        </section>\n\n      </div>\n\n    </div>\n\n  </div>\n\n</div>\n\n'/*ion-inline-end:"G:\ionic\Project\quark\src\components\codebar\codebar.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2__node_modules_angular_material__["c" /* MatSnackBar */]])
    ], CodebarComponent);
    return CodebarComponent;
}());

//# sourceMappingURL=codebar.js.map

/***/ }),

/***/ 383:
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

/***/ 384:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsBarComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_global_service_global_service__ = __webpack_require__(51);
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

/***/ 385:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export myCustomTooltipDefaults */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActivityBarComponent; });
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

var myCustomTooltipDefaults = {
    showDelay: 0,
    hideDelay: 5000,
    touchendHideDelay: 1000,
};
var ActivityBarComponent = /** @class */ (function () {
    function ActivityBarComponent() {
        this.newActivity = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    ActivityBarComponent.prototype.changeMode = function () {
        this.newActivity.emit('changeMode');
    };
    ActivityBarComponent.prototype.connectToBoard = function () {
        this.newActivity.emit('connect');
    };
    ActivityBarComponent.prototype.initialize = function () {
        this.newActivity.emit('initialize');
    };
    ActivityBarComponent.prototype.globalConfig = function () {
        this.newActivity.emit('globalConfigJSON');
    };
    ActivityBarComponent.prototype.globalStyle = function () {
        this.newActivity.emit('globalConfigCSS');
    };
    ActivityBarComponent.prototype.goToDesignerPage = function () {
        this.newActivity.emit('goToDesignerPage');
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], ActivityBarComponent.prototype, "newActivity", void 0);
    ActivityBarComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'activity-bar',template:/*ion-inline-start:"G:\ionic\Project\quark\src\components\activity-bar\activity-bar.html"*/'<div class="icon-container">\n\n  <div class="upper-container">\n\n    <ion-icon tappable id="eye" name="eye"></ion-icon>\n\n    <ion-icon tappable id="brush" name="brush" matTooltip="Designer" matTooltipPosition="after" (click)="goToDesignerPage()"></ion-icon>\n\n  </div>\n\n  <div class="lower-container">\n\n    <ion-icon tappable id="logo-nodejs" name="logo-nodejs" matTooltip="Global Config" matTooltipPosition="after" (click)="globalConfig()"></ion-icon>\n\n    <ion-icon tappable id="logo-css3" name="logo-css3" matTooltip="Global Style" matTooltipPosition="after" (click)="globalStyle()"></ion-icon>\n\n    <ion-icon tappable id="cog" name="cog" matTooltip="Settings" matTooltipPosition="after"></ion-icon>\n\n  </div>\n\n</div>\n\n'/*ion-inline-end:"G:\ionic\Project\quark\src\components\activity-bar\activity-bar.html"*/,
            // providers: [
            //   { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: myCustomTooltipDefaults }
            // ],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
        }),
        __metadata("design:paramtypes", [])
    ], ActivityBarComponent);
    return ActivityBarComponent;
}());

//# sourceMappingURL=activity-bar.js.map

/***/ }),

/***/ 386:
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

/***/ 387:
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
                if ((elmnt.offsetTop - pos2) > 67 && (elmnt.offsetTop - pos2) < window.innerHeight - 100) {
                    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
                }
                if ((elmnt.offsetLeft - pos1) > 57 && (elmnt.offsetLeft - pos1) < (window.innerWidth - 50)) {
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

/***/ 388:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConsoleComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_global_service_global_service__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(27);
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
    function ConsoleComponent(gsp, domCtrl) {
        this.gsp = gsp;
        this.domCtrl = domCtrl;
        this.data = [];
        this.maps = {
            log: {
                color: '#000000',
                icon: 'return-right'
                // icon: 'fa-angle-double-right'
            },
            warn: {
                color: '#ffff9a',
                icon: 'warning'
                // icon: 'fa-warning'
            },
            error: {
                color: '#f53d3d',
                icon: 'close'
                // icon: 'fa-close'
            },
            right: {
                color: '#25d55f',
                icon: 'checkmark'
                // icon: 'fa-check'
            },
            indent: {
                color: '#000000',
                icon: 'arrow-dropright'
                // icon: 'fa-angle-right'
            }
        };
        this.data = this.gsp.consoleData.data;
    }
    ConsoleComponent.prototype.ngAfterViewInit = function () {
        this.myDiv = this.myDivRef.nativeElement;
        this.myDivHeader = this.myDivHeaderRef.nativeElement;
        this.myContent = this.myContentRef.nativeElement;
        this.dragster();
        this.myDiv.style.top = this.gsp.consoleData.top + 'px';
        this.myDiv.style.height = -this.gsp.consoleData.top + 'px';
        this.myContent.scrollTop = this.myContent.scrollHeight;
    };
    ConsoleComponent.prototype.minimizeConsole = function () {
        this.myDiv.style.height = '33.5px';
        this.myDiv.style.top = '-33.5px';
        this.gsp.consoleData.top = -33.5;
    };
    ConsoleComponent.prototype.maximiseConsole = function () {
        this.myDiv.style.height = '200px';
        this.myDiv.style.top = '-200px';
        this.gsp.consoleData.top = -200;
        this.myDiv.scrollTop = this.myDiv.scrollHeight;
        this.myContent.scrollTop = this.myContent.scrollHeight;
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
                e = e || window.event;
                e.preventDefault();
                // calculate the new cursor position:
                pos2 = pos4 - e.clientY;
                pos4 = e.clientY;
                // set the element's new position:
                if (pos2 > -36) {
                    elmnt.style.height = -(elmnt.offsetTop - pos2) + "px";
                }
                if ((elmnt.offsetTop - pos2) < -33.5 && (elmnt.offsetTop - pos2) > -500) {
                    var pos = (elmnt.offsetTop - pos2);
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
            selector: 'console',template:/*ion-inline-start:"G:\ionic\Project\quark\src\components\console\console.html"*/'<div id="myDiv" #myDiv (contextmenu)="contextMenu($event)" class="page-template page-template-elementor_canvas page page-id-232 woocommerce-js elementor-default elementor-template-canvas elementor-page elementor-page-232"\n\n  data-elementor-device-mode="mobile">\n\n  <div class="elementor elementor-232">\n\n    <div class="elementor-inner">\n\n      <div class="elementor-section-wrap">\n\n        <section id="myDivHeader" #myDivHeader data-id="bdc1c16" class="elementor-element elementor-element-bdc1c16 elementor-section-stretched elementor-section-full_width elementor-section-height-default elementor-section-height-default elementor-section-content-top elementor-section elementor-top-section"\n\n          data-settings="{&quot;background_background&quot;:&quot;classic&quot;}" data-element_type="section" style="width: 100%; left: 0px;">\n\n          <div class="elementor-container elementor-column-gap-no">\n\n            <div class="elementor-row">\n\n              <div data-id="b53f1a7" class="elementor-element elementor-element-b53f1a7 elementor-column elementor-col-100 elementor-top-column"\n\n                data-element_type="column">\n\n                <div class="elementor-column-wrap elementor-element-populated">\n\n                  <div class="elementor-widget-wrap">\n\n                    <div data-id="598c3a9" class="elementor-element elementor-element-598c3a9 elementor-widget elementor-widget-divider" data-element_type="divider.default">\n\n                      <div class="elementor-widget-container">\n\n                        <div class="elementor-divider">\n\n                          <span class="elementor-divider-separator"></span>\n\n                        </div>\n\n                      </div>\n\n                    </div>\n\n                  </div>\n\n                </div>\n\n              </div>\n\n            </div>\n\n          </div>\n\n        </section>\n\n        <section data-id="f0ba44c" class="elementor-element elementor-element-f0ba44c elementor-section-stretched elementor-section-full_width elementor-section-height-default elementor-section-height-default elementor-section-content-middle elementor-section elementor-top-section"\n\n          data-settings="{&quot;background_background&quot;:&quot;classic&quot;}" data-element_type="section" style="width: 100%; left: 0px;">\n\n          <div class="elementor-container elementor-column-gap-no">\n\n            <div class="elementor-row">\n\n              <div data-id="14b6a0e" class="elementor-element elementor-element-14b6a0e elementor-column elementor-col-50 elementor-top-column"\n\n                data-element_type="column">\n\n                <div class="elementor-column-wrap elementor-element-populated">\n\n                  <div class="elementor-widget-wrap">\n\n                    <div data-id="4fd05bf" class="elementor-element elementor-element-4fd05bf elementor-align-left elementor-widget elementor-widget-button"\n\n                      data-element_type="button.default">\n\n                      <div class="elementor-widget-container">\n\n                        <div class="elementor-button-wrapper">\n\n                          <a class="elementor-button elementor-size-xs" role="button">\n\n                            <span class="elementor-button-content-wrapper">\n\n                              <span class="elementor-button-text">Console</span>\n\n                            </span>\n\n                          </a>\n\n                        </div>\n\n                      </div>\n\n                    </div>\n\n                  </div>\n\n                </div>\n\n              </div>\n\n              <div data-id="97c6b26" class="elementor-element elementor-element-97c6b26 elementor-column elementor-col-50 elementor-top-column"\n\n                data-element_type="column">\n\n                <div class="elementor-column-wrap elementor-element-populated">\n\n                  <div class="elementor-widget-wrap">\n\n                    <div data-id="a5d524f" class="elementor-element elementor-element-a5d524f elementor-align-right elementor-mobile-align-right elementor-widget elementor-widget-icon-list"\n\n                      data-element_type="icon-list.default">\n\n                      <div class="elementor-widget-container">\n\n                        <ul class="elementor-icon-list-items elementor-inline-items">\n\n                          <li class="elementor-icon-list-item" tappable (click)="clearConsole()">\n\n                            <span class="elementor-icon-list-icon">\n\n                              <!-- <i class="fa fa-trash" aria-hidden="true"></i> -->\n\n                              <ion-icon name="trash"></ion-icon>\n\n                            </span>\n\n                            <span class="elementor-icon-list-text"></span>\n\n                          </li>\n\n                          <li class="elementor-icon-list-item" tappable (click)="maximiseConsole()">\n\n                            <span class="elementor-icon-list-icon">\n\n                              <!-- <i class="fa fa-chevron-up" aria-hidden="true"></i> -->\n\n                              <ion-icon name="arrow-up"></ion-icon>\n\n                            </span>\n\n                            <span class="elementor-icon-list-text"></span>\n\n                          </li>\n\n                          <li class="elementor-icon-list-item" tappable (click)="minimizeConsole()">\n\n                            <span class="elementor-icon-list-icon">\n\n                              <!-- <i class="fa fa-times" aria-hidden="true"></i> -->\n\n                              <ion-icon name="close"></ion-icon>\n\n                            </span>\n\n                            <span class="elementor-icon-list-text"></span>\n\n                          </li>\n\n                        </ul>\n\n                      </div>\n\n                    </div>\n\n                  </div>\n\n                </div>\n\n              </div>\n\n            </div>\n\n          </div>\n\n        </section>\n\n        <section #myContent data-id="c346110" class="section3 elementor-element elementor-element-c346110 elementor-section-stretched elementor-section-full_width elementor-section-height-default elementor-section-height-default elementor-section-content-top elementor-section elementor-top-section"\n\n          data-settings="{&quot;background_background&quot;:&quot;classic&quot;}" data-element_type="section" style="width: 100%; left: 0px;">\n\n          <div class="elementor-container elementor-column-gap-no" *ngFor="let datapoint of data; index as i" [ngStyle]="{\'margin-left\' : datapoint.indent != undefined? datapoint.indent+\'px\' : \'0px\'}">\n\n            <div class="elementor-row">\n\n              <div data-id="4d695f3" class="elementor-element elementor-element-4d695f3 elementor-column elementor-col-33 elementor-top-column"\n\n                data-element_type="column">\n\n                <div class="elementor-column-wrap elementor-element-populated">\n\n                  <div class="elementor-widget-wrap">\n\n                    <div data-id="3c7074d" class="elementor-element elementor-element-3c7074d elementor-align-center elementor-mobile-align-left elementor-widget elementor-widget-button"\n\n                      data-element_type="button.default">\n\n                      <div class="elementor-widget-container">\n\n                        <div class="elementor-button-wrapper">\n\n                          <a class="elementor-button elementor-size-xs" role="button">\n\n                            <span class="elementor-button-content-wrapper">\n\n                              <span class="elementor-button-icon elementor-align-icon-left" [ngStyle]="{\'color\' : datapoint.type!=\'indent\'?maps[datapoint.type].color : maps[data[i-1].type].color}">\n\n                                <!-- <i class="fa" [ngClass]="maps[datapoint.type].icon" aria-hidden="true"></i> -->\n\n                                <ion-icon [name]="maps[datapoint.type].icon"></ion-icon>\n\n                              </span>\n\n                              <span class="elementor-button-text"></span>\n\n                            </span>\n\n                          </a>\n\n                        </div>\n\n                      </div>\n\n                    </div>\n\n                  </div>\n\n                </div>\n\n              </div>\n\n              <div data-id="4f728fa" class="elementor-element elementor-element-4f728fa elementor-column elementor-col-33 elementor-top-column"\n\n                data-element_type="column">\n\n                <div class="elementor-column-wrap elementor-element-populated">\n\n                  <div class="elementor-widget-wrap">\n\n                    <div data-id="2ba8b2c" class="elementor-element elementor-element-2ba8b2c elementor-widget elementor-widget-text-editor"\n\n                      data-element_type="text-editor.default">\n\n                      <div class="elementor-widget-container">\n\n                        <div class="elementor-text-editor elementor-clearfix">\n\n                          <!-- <p>{{datapoint.message}}</p> -->\n\n                          <p [innerHTML]="datapoint.message" [ngStyle]="{\'color\' : datapoint.fullColor? maps[datapoint.type].color : \'#f8f8f8\'}"></p>\n\n                        </div>\n\n                      </div>\n\n                    </div>\n\n                  </div>\n\n                </div>\n\n              </div>\n\n              <div data-id="2684700" class="elementor-element elementor-element-2684700 elementor-column elementor-col-33 elementor-top-column"\n\n                data-element_type="column">\n\n                <div class="elementor-column-wrap elementor-element-populated">\n\n                  <div class="elementor-widget-wrap">\n\n                    <div data-id="19231e8" class="elementor-element elementor-element-19231e8 elementor-widget elementor-widget-text-editor"\n\n                      data-element_type="text-editor.default">\n\n                      <div class="elementor-widget-container">\n\n                        <div class="elementor-text-editor elementor-clearfix">\n\n                          <p *ngIf="datapoint.indent==undefined" [ngStyle]="{\'color\' : datapoint.fullColor? maps[datapoint.type].color : \'#f8f8f8\'}">\n\n                            [ {{datapoint.timestamp | date:\'hh : mm : ss\'}} ]\n\n                          </p>\n\n                        </div>\n\n                      </div>\n\n                    </div>\n\n                  </div>\n\n                </div>\n\n              </div>\n\n            </div>\n\n          </div>\n\n        </section>\n\n      </div>\n\n    </div>\n\n  </div>\n\n</div>\n\n'/*ion-inline-end:"G:\ionic\Project\quark\src\components\console\console.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__providers_global_service_global_service__["a" /* GlobalServiceProvider */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* DomController */]])
    ], ConsoleComponent);
    return ConsoleComponent;
}());

//# sourceMappingURL=console.js.map

/***/ }),

/***/ 389:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MenuBarComponent; });
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

var MenuBarComponent = /** @class */ (function () {
    function MenuBarComponent() {
        this.event = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    MenuBarComponent.prototype.clicked = function (icon) {
        this.event.emit(icon);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], MenuBarComponent.prototype, "event", void 0);
    MenuBarComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'menu-bar',template:/*ion-inline-start:"G:\ionic\Project\quark\src\components\menu-bar\menu-bar.html"*/'<div class="page-template page-template-elementor_canvas page page-id-269 woocommerce-js elementor-default elementor-template-canvas elementor-page elementor-page-269"\n  data-elementor-device-mode="mobile">\n  <div class="elementor elementor-269">\n    <div class="elementor-inner">\n      <div class="elementor-section-wrap">\n        <section data-id="4b7c88c" class="elementor-element elementor-element-4b7c88c elementor-section-stretched elementor-section-full_width elementor-section-height-default elementor-section-height-default elementor-section-content-middle elementor-section elementor-top-section"\n          data-settings="{&quot;background_background&quot;:&quot;classic&quot;}" data-element_type="section" style="width: 100%; left: 0px;">\n          <div class="elementor-container elementor-column-gap-no">\n            <div class="elementor-row">\n              <div data-id="a9d672e" class="elementor-element elementor-element-a9d672e mtr-title elementor-column elementor-col-20 elementor-top-column"\n                data-element_type="column">\n                <div class="elementor-column-wrap elementor-element-populated">\n                  <div class="elementor-widget-wrap">\n                    <div data-id="beb4cce" class="elementor-element elementor-element-beb4cce elementor-widget elementor-widget-heading" data-element_type="heading.default">\n                      <div class="elementor-widget-container">\n                        <h2 class="elementor-heading-title elementor-size-medium">Quark</h2>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n              </div>  \n              <div (click)="clicked(\'minus\')" data-id="4debfca" class="elementor-element elementor-element-4debfca mtr-menu-bar elementor-column elementor-col-20 elementor-top-column"\n                data-element_type="column">\n                <div class="elementor-column-wrap elementor-element-populated">\n                  <div class="elementor-widget-wrap">\n                    <div data-id="0164114" class="elementor-element elementor-element-0164114 elementor-align-center elementor-widget elementor-widget-button"\n                      data-element_type="button.default">\n                      <div class="elementor-widget-container">\n                        <div class="elementor-button-wrapper">\n                          <a class="elementor-button elementor-size-sm" role="button">\n                            <span class="elementor-button-content-wrapper">\n                              <span class="elementor-button-icon elementor-align-icon-left">\n                                <!-- <i class="fa fa-minus" aria-hidden="true"></i> -->\n                                <ion-icon name="remove"></ion-icon>\n                              </span>\n                              <span class="elementor-button-text"></span>\n                            </span>\n                          </a>\n                        </div>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n              </div>\n              <div (click)="clicked(\'maximize\')" data-id="96fc0c0" class="elementor-element elementor-element-96fc0c0 mtr-menu-bar elementor-column elementor-col-20 elementor-top-column"\n                data-element_type="column">\n                <div class="elementor-column-wrap elementor-element-populated">\n                  <div class="elementor-widget-wrap">\n                    <div data-id="dd7cf60" class="elementor-element elementor-element-dd7cf60 elementor-align-center elementor-widget elementor-widget-button"\n                      data-element_type="button.default">\n                      <div class="elementor-widget-container">\n                        <div class="elementor-button-wrapper">\n                          <a class="elementor-button elementor-size-sm" role="button">\n                            <span class="elementor-button-content-wrapper">\n                              <span class="elementor-button-icon elementor-align-icon-left">\n                                <!-- <i class="fa fa-window-maximize" aria-hidden="true"></i> -->\n                                <ion-icon name="expand"></ion-icon>\n                              </span>\n                              <span class="elementor-button-text"></span>\n                            </span>\n                          </a>\n                        </div>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n              </div>\n              <div (click)="clicked(\'close\')" data-id="b4145b7" class="elementor-element elementor-element-b4145b7 mtr-menu-bar elementor-column elementor-col-20 elementor-top-column"\n                data-element_type="column">\n                <div class="elementor-column-wrap elementor-element-populated">\n                  <div class="elementor-widget-wrap">\n                    <div data-id="b9e53da" class="elementor-element elementor-element-b9e53da elementor-align-center elementor-widget elementor-widget-button"\n                      data-element_type="button.default">\n                      <div class="elementor-widget-container">\n                        <div class="elementor-button-wrapper">\n                          <a class="elementor-button elementor-size-sm" role="button">\n                            <span class="elementor-button-content-wrapper">\n                              <span class="elementor-button-icon elementor-align-icon-left">\n                                <!-- <i class="fa fa-close" aria-hidden="true"></i> -->\n                                <ion-icon name="close"></ion-icon>\n                              </span>\n                              <span class="elementor-button-text"></span>\n                            </span>\n                          </a>\n                        </div>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n        </section>\n      </div>\n    </div>\n  </div>\n</div>\n'/*ion-inline-end:"G:\ionic\Project\quark\src\components\menu-bar\menu-bar.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], MenuBarComponent);
    return MenuBarComponent;
}());

//# sourceMappingURL=menu-bar.js.map

/***/ }),

/***/ 412:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(259);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(256);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_socket_service_socket_service__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_electron_service_electron_service__ = __webpack_require__(143);
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
    function MyApp(platform, statusBar, splashScreen, ssp, esp) {
        this.platform = platform;
        this.ssp = ssp;
        this.esp = esp;
        // rootPage: any = this.platform.is('mobileweb') ? 'ConnectMobilePage' : 'LandingPage';
        this.rootPage = 'MenuPage';
        platform.ready().then(function () {
            statusBar.styleDefault();
            splashScreen.hide();
        });
        this.platform.is('mobileweb') ? null : this.ssp.connectToSocketServer('http://192.168.1.7');
    }
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
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_4__providers_socket_service_socket_service__["a" /* SocketServiceProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_electron_service_electron_service__["a" /* ElectronServiceProvider */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 415:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthenticationServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_firebase_app__ = __webpack_require__(260);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_firebase_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase_auth__ = __webpack_require__(419);
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
    function AuthenticationServiceProvider() {
        this.auth = __WEBPACK_IMPORTED_MODULE_1_firebase_app___default.a.auth();
        this.isLoggedIn = false;
        console.log('Hello AuthenticationServiceProvider Provider');
    }
    AuthenticationServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], AuthenticationServiceProvider);
    return AuthenticationServiceProvider;
}());

//# sourceMappingURL=authentication-service.js.map

/***/ }),

/***/ 421:
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

/***/ 51:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GlobalServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utilities_code_samples__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_codemirror__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_codemirror___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_codemirror__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_js_beautify__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_js_beautify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_js_beautify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__global_service_dump__ = __webpack_require__(303);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var GlobalServiceProvider = /** @class */ (function () {
    function GlobalServiceProvider(events) {
        var _this = this;
        this.events = events;
        this.global_config = {
            js: new __WEBPACK_IMPORTED_MODULE_3_codemirror___default.a.Doc(Object(__WEBPACK_IMPORTED_MODULE_4_js_beautify__["js_beautify"])(JSON.stringify(__WEBPACK_IMPORTED_MODULE_1__utilities_code_samples__["f" /* firmata_config */].js), { indent_size: 2 }), 'application/ld+json'),
            css: new __WEBPACK_IMPORTED_MODULE_3_codemirror___default.a.Doc(Object(__WEBPACK_IMPORTED_MODULE_4_js_beautify__["css_beautify"])(__WEBPACK_IMPORTED_MODULE_1__utilities_code_samples__["f" /* firmata_config */].css, { indent_size: 2 }), 'css'),
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
            data: [],
        };
        this.logger = {
            log: function (message, indent, fullColor) {
                _this.consoleData.data.push({ message: message, indent: indent, type: 'log', fullColor: fullColor, timestamp: indent ? 1 : Date.now() });
            },
            warn: function (message, indent, fullColor) {
                _this.consoleData.data.push({ message: message, indent: indent, type: 'warn', fullColor: fullColor, timestamp: indent ? 1 : Date.now() });
            },
            error: function (message, indent, fullColor) {
                _this.consoleData.data.push({ message: message, indent: indent, type: 'error', fullColor: fullColor, timestamp: indent ? 1 : Date.now() });
            },
            right: function (message, indent, fullColor) {
                _this.consoleData.data.push({ message: message, indent: indent, type: 'right', fullColor: fullColor, timestamp: indent ? 1 : Date.now() });
            },
            indent: function (message, indent, fullColor) {
                _this.consoleData.data.push({ message: message, indent: indent, type: 'indent', fullColor: fullColor, timestamp: indent ? 1 : Date.now() });
            }
        };
        this.appEvents();
        this.logger.log('Initializing Global Service');
        this.logger.log('Initialized Global Service', 40);
        this.logger.error('Initialized Global Service', 40);
        this.logger.indent('Hello World', 40);
        this.logger.right('Hello World', 80);
        this.logger.indent('Hello World', 80);
        this.logger.log('Initializing Global Service');
        this.logger.log('Initialized Global Service', 40);
        this.logger.error('Initialized Global Service', 40);
        this.logger.indent('Hello World', 40);
        this.logger.right('Hello World', 80);
        this.logger.indent('Hello World', 80);
        this.logger.log('Initializing Global Service');
        this.logger.log('Initialized Global Service', 40);
        this.logger.error('Initialized Global Service', 40);
        this.logger.indent('Hello World', 40);
        this.logger.right('Hello World', 80);
        this.logger.indent('Hello World', 80);
        this.logger.log('Initializing Global Service');
        this.logger.log('Initialized Global Service', 40);
        this.logger.error('Initialized Global Service', 40);
        this.logger.indent('Hello World', 40);
        this.logger.right('Hello World', 80);
        this.logger.indent('Hello World', 80);
    }
    GlobalServiceProvider.prototype.appEvents = function () {
        var _this = this;
        this.events.subscribe('misc-components : global-service : add-component', function (component) {
            var flag = _this.designerComponents.filter(function (val) { return val.data.config.id == component.data.config.id; });
            if (flag.length == 0) {
                _this.designerComponents.push(component);
                var data = component.data;
                var json = JSON.parse(_this.global_config.js.getValue());
                json.rendered_views.push({ component: data.config.component, id: data.config.id, variable: data.config.variable });
                _this.global_config.js.setValue(Object(__WEBPACK_IMPORTED_MODULE_4_js_beautify__["js_beautify"])(JSON.stringify(json), { indent_size: 2 }));
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
        this.events.subscribe('page-designer : global-service : add-tab', function (tab) {
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
                    default:
                        console.log("No tab");
                        break;
                }
            }
        });
        this.events.subscribe('page-menu : global-service : add-class', function (component) {
            Object(__WEBPACK_IMPORTED_MODULE_5__global_service_dump__["b" /* addClassFromDump */])(component, _this.global_config.js);
        });
    };
    GlobalServiceProvider.prototype.addCSS = function (data) {
        Object(__WEBPACK_IMPORTED_MODULE_5__global_service_dump__["a" /* addCSSFromDump */])(data);
    };
    GlobalServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* Events */]])
    ], GlobalServiceProvider);
    return GlobalServiceProvider;
}());

//# sourceMappingURL=global-service.js.map

/***/ }),

/***/ 70:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return code_toggle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return code_button; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return code_range; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return firmata_config; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return MTRButtonComponentInterfaceSample; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GlobalConfigInterfaceSample; });
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
        global_variables: [],
        rendered_views: [],
        components: [],
        analogRead: [
            {
                variable: 'lulzz',
                pin: 2,
                interval: 1000
            }
        ],
        renderer_update_interval: 1000,
        setup: (function () { var nishkal; }).toString()
    },
    css: "display: flex;\n  flex-wrap: wrap;\n  justify-content: flex-start;\n  // background-color : #1e1e1e;\n  // height: 100%;\n  "
};
var MTRButtonComponentInterfaceSample = "interface MTRButtonComponent {\n  content?: string | number;\n  color?: string;\n  disabled?: boolean;\n  block?: boolean;\n  clear?: boolean;\n  default?: boolean;\n  full?: boolean;\n  large?: boolean;\n  outline?: boolean;\n  round?: boolean;\n  small?: boolean;\n  strong?: boolean;\n}";
var GlobalConfigInterfaceSample = "interface GlobalConfigInterface {\n  global_variables?: Array<globalVariableInterface | string>;\n  components?: Array<johnnyFiveClassInterface>;\n  rendered_views?: Array<renderedViewInterface>;\n  analogRead?: Array<analogReadInterface>;\n  setup?: Function | string;\n  renderer_update_interval: number;\n  }\n\n  interface globalVariableInterface {\n    variable: string;\n    initialize?: any;\n}\n\ninterface johnnyFiveClassInterface {\n  class:\n  \"Accelerometer\" | \"Altimeter\" | \"Animation\" | \"Barometer\"\n  | \"Board\" | \"Boards\" | \"Button\" | \"Compass\" | \"ESC\" | \"ESCs\"\n  | \"Expander\" | \"Fn\" | \"GPS\" | \"Gyro\" | \"Hygrometer\" | \"IMU\"\n  | \"IR.Reflect.Array\" | \"Joystick\" | \"Keypad\" | \"LCD\" | \"Led\"\n  | \"Led.Digits\" | \"Led.Matrix\" | \"Led.RGB\" | \"Leds\"\n  | \"Light\" | \"Motion\" | \"Motor\" | \"Motors\" | \"Multi\" | \"Piezo\"\n  | \"Pin\" | \"Proximity\" | \"Relay\" | \"Relays\" | \"Sensor\" | \"Servo\"\n  | \"Servos\" | \"ShiftRegister\" | \"Stepper\" | \"Switch\" | \"Thermometer\"\n  variable: string;\n  arguments?: any;\n  setup?: Function;\n}\n\n  interface renderedViewInterface {\n    component: 'MtrToggleComponent' | 'MtrRangeComponent' | 'MtrButtonComponent';\n    id: number;\n    variable: string;\n    name?: string;  //For users convenience\n    description?: string  //For users convenience;\n}\n\ninterface renderedViewInterface {\n  component: 'MtrToggleComponent' | 'MtrRangeComponent' | 'MtrButtonComponent';\n  id: number;\n  variable: string;\n  name?: string;  //For users convenience\n  description?: string  //For users convenience;\n}\n\ninterface analogReadInterface {\n  variable: string;\n  pin: number;\n  interval: number;\n}";
//# sourceMappingURL=code-samples.js.map

/***/ })

},[268]);
//# sourceMappingURL=main.js.map