webpackJsonp([1],{

/***/ 807:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MenuPageModule", function() { return MenuPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__menu__ = __webpack_require__(815);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_components_module__ = __webpack_require__(399);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_material__ = __webpack_require__(67);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var MenuPageModule = /** @class */ (function () {
    function MenuPageModule() {
    }
    MenuPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__menu__["a" /* MenuPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__menu__["a" /* MenuPage */]),
                __WEBPACK_IMPORTED_MODULE_3__components_components_module__["a" /* ComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_material__["n" /* MatTabsModule */]
            ],
        })
    ], MenuPageModule);
    return MenuPageModule;
}());

//# sourceMappingURL=menu.module.js.map

/***/ }),

/***/ 815:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MenuPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utilities_widgets__ = __webpack_require__(816);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var MenuPage = /** @class */ (function () {
    function MenuPage(navCtrl, navParams, events) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.events = events;
        this.rootPage = 'DesignerPage';
        this.componentsList = __WEBPACK_IMPORTED_MODULE_2__utilities_widgets__["b" /* componentsList */];
        this.classesList = __WEBPACK_IMPORTED_MODULE_2__utilities_widgets__["a" /* classesList */];
        this.status = true;
        this.mode = 'Editing';
    }
    MenuPage.prototype.changeMode = function () {
        this.status = !this.status;
        this.status == true ? this.mode = 'Editing' : this.mode = 'Active';
        this.events.publish('page-menu : page-designer : mode', this.mode);
    };
    MenuPage.prototype.addComponent = function (component) {
        if (component.component) {
            this.events.publish('page-menu : page-designer && page-code-mirror : add-component', component);
        }
        else {
            this.events.publish('page-menu : global-service : add-class', component);
        }
    };
    MenuPage.prototype.statusBarEvent = function (value) {
        switch (value) {
            case 'changeMode':
                this.changeMode();
                break;
            case 'connect':
                this.events.publish('page-menu : socket-service : connect-to-board');
                break;
            case 'initialize':
                this.events.publish('page-menu : socket-service : initialize');
                break;
            default:
                break;
        }
    };
    MenuPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-menu',template:/*ion-inline-start:"G:\ionic\Project\quark\src\pages\menu\menu.html"*/'<ion-menu [content]="content">\n\n  <ion-content padding>\n\n    <mat-tab-group [backgroundColor]="\'#1e1e1e\'" [disableRipple]="true">\n\n      <mat-tab label="Renderer">\n\n        <widgets [componentsList]="componentsList" (selectedComponent)="addComponent($event)"></widgets>\n\n      </mat-tab>\n\n      <mat-tab label="Components">\n\n        <widgets [componentsList]="classesList" (selectedComponent)="addComponent($event)"></widgets>\n\n      </mat-tab>\n\n    </mat-tab-group>\n\n  </ion-content>\n\n</ion-menu>\n\n\n\n<ion-nav id="nav" #content [root]="rootPage"></ion-nav>\n\n<!-- <ion-footer>\n\n  <status-bar (value)="statusBarEvent($event)"></status-bar>\n\n</ion-footer> -->\n\n'/*ion-inline-end:"G:\ionic\Project\quark\src\pages\menu\menu.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */]])
    ], MenuPage);
    return MenuPage;
}());

//# sourceMappingURL=menu.js.map

/***/ }),

/***/ 816:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return componentsList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return classesList; });
var componentsList = [
    {
        component: 'MtrButtonComponent'
    }, {
        component: 'MtrRangeComponent',
    }, {
        component: 'MtrToggleComponent'
    }
];
var classesList = [
    {
        class: 'Accelerometer'
    },
    {
        class: 'Altimeter'
    },
    {
        class: 'Animation'
    },
    {
        class: 'Barometer'
    },
    {
        class: 'Board'
    },
    {
        class: 'Boards'
    },
    {
        class: 'Button'
    },
    {
        class: 'Compass'
    },
    {
        class: 'ESC'
    },
    {
        class: 'ESCs'
    },
    {
        class: 'Expander'
    },
    {
        class: 'Fn'
    },
    {
        class: 'GPS'
    },
    {
        class: 'Gyro'
    },
    {
        class: 'Hygrometer'
    },
    {
        class: 'IMU'
    },
    {
        class: 'IR.Reflect.Array'
    },
    {
        class: 'Joystick'
    },
    {
        class: 'Keypad'
    },
    {
        class: 'LCD'
    },
    {
        class: 'Led'
    },
    {
        class: 'Led.Digits'
    },
    {
        class: 'Led.Matrix'
    },
    {
        class: 'Led.RGB'
    },
    {
        class: 'Leds'
    },
    {
        class: 'Light'
    },
    {
        class: 'Motion'
    },
    {
        class: 'Motor'
    },
    {
        class: 'Motors'
    },
    {
        class: 'Multi'
    },
    {
        class: 'Piezo'
    },
    {
        class: 'Pin'
    },
    {
        class: 'Proximity'
    },
    {
        class: 'Relay'
    },
    {
        class: 'Relays'
    },
    {
        class: 'Sensor'
    },
    {
        class: 'Servo'
    },
    {
        class: 'Servos'
    },
    {
        class: 'ShiftRegister'
    },
    {
        class: 'Stepper'
    },
    {
        class: 'Switch'
    },
    {
        class: 'Thermometer'
    }
];
//# sourceMappingURL=widgets.js.map

/***/ })

});
//# sourceMappingURL=1.js.map