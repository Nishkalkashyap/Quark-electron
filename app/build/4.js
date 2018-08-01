webpackJsonp([4],{

/***/ 422:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CodeMirrorPageModule", function() { return CodeMirrorPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__code_mirror__ = __webpack_require__(431);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_components_module__ = __webpack_require__(262);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var CodeMirrorPageModule = /** @class */ (function () {
    function CodeMirrorPageModule() {
    }
    CodeMirrorPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__code_mirror__["a" /* CodeMirrorPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__code_mirror__["a" /* CodeMirrorPage */]),
                __WEBPACK_IMPORTED_MODULE_3__components_components_module__["a" /* ComponentsModule */]
            ],
        })
    ], CodeMirrorPageModule);
    return CodeMirrorPageModule;
}());

//# sourceMappingURL=code-mirror.module.js.map

/***/ }),

/***/ 431:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CodeMirrorPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_global_service_global_service__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__node_modules_rxjs_Subject__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__node_modules_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__node_modules_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_mtr_toggle_mtr_toggle__ = __webpack_require__(263);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_mtr_button_mtr_button__ = __webpack_require__(264);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_mtr_range_mtr_range__ = __webpack_require__(265);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_material__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__utilities_code_samples__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_codemirror__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_codemirror___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_codemirror__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_js_beautify__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_js_beautify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_js_beautify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_code_editor_code_editor__ = __webpack_require__(266);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_electron_service_electron_service__ = __webpack_require__(143);
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
    function CodeMirrorPage(navCtrl, snackBar, gsp, events, resolver, esp) {
        this.navCtrl = navCtrl;
        this.snackBar = snackBar;
        this.gsp = gsp;
        this.events = events;
        this.resolver = resolver;
        this.esp = esp;
        this.document = new __WEBPACK_IMPORTED_MODULE_3__node_modules_rxjs_Subject__["Subject"]();
        this.mouseMoveEvent = new __WEBPACK_IMPORTED_MODULE_3__node_modules_rxjs_Subject__["Subject"]();
        this.mouseLeaveEvent = new __WEBPACK_IMPORTED_MODULE_3__node_modules_rxjs_Subject__["Subject"]();
        this.stayFixed = new __WEBPACK_IMPORTED_MODULE_3__node_modules_rxjs_Subject__["Subject"]();
        this.currentComponentClassName = new __WEBPACK_IMPORTED_MODULE_3__node_modules_rxjs_Subject__["Subject"]();
        this.interface = '';
        this.isSnackbarOpen = false;
    }
    CodeMirrorPage.prototype.ngAfterViewInit = function () {
        this.updateDocuments(this.gsp.currentTab);
        this.gsp.logger.log('Codemirror page initialized');
    };
    CodeMirrorPage.prototype.ionViewCanEnter = function () {
        this.gsp.tabsArray.length > 0 ? null : this.navCtrl.setRoot('DesignerPage');
    };
    CodeMirrorPage.prototype.ionViewDidLeave = function () {
        clearInterval(this.styleInterval);
        this.snackBar.dismiss();
    };
    CodeMirrorPage.prototype.openTab = function (tab) {
        this.gsp.currentTab = tab;
        this.updateDocuments(tab);
    };
    CodeMirrorPage.prototype.showSnackBar = function () {
        var _this = this;
        if (this.isSnackbarOpen) {
            this.snackBar.dismiss();
            this.isSnackbarOpen = false;
        }
        else {
            var config = {
                data: { inputDoc: new __WEBPACK_IMPORTED_MODULE_9_codemirror___default.a.Doc(this.interface, "text/x-java"), mode: 'Interface' },
                horizontalPosition: 'right',
                panelClass: 'mtr-snack-bar',
                announcementMessage: "Hello"
            };
            var ref = this.snackBar.openFromComponent(__WEBPACK_IMPORTED_MODULE_11__components_code_editor_code_editor__["a" /* CodeEditorComponent */], config);
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
                else {
                    _this.navCtrl.setRoot('DesignerPage');
                }
                _this.updateDocuments(_this.gsp.currentTab);
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
                    if (currentTab.mode == "Javascript") {
                        _this.document.next(_this.gsp.currentTab.component.data.code.js);
                        _this.addInterface(_this.gsp.currentTab.component.data.config.component);
                    }
                    else {
                        _this.document.next(_this.gsp.currentTab.component.data.code.css);
                        _this.currentComponentClassName.next(_this.gsp.currentTab.component.data.config.css_class);
                        _this.container.clear();
                        _this.createComponent(_this.gsp.currentTab.component);
                        _this.styleInterval = setInterval(function () {
                            _this.gsp.addCSS(_this.gsp.currentTab.component.data);
                        }, 1000);
                    }
                }
            });
        }
        else if (currentTab.other == "globalConfigJSON") {
            this.document.next(this.gsp.global_config.js);
            this.interface = Object(__WEBPACK_IMPORTED_MODULE_10_js_beautify__["js_beautify"])(__WEBPACK_IMPORTED_MODULE_8__utilities_code_samples__["a" /* GlobalConfigInterfaceSample */]);
        }
        else if (currentTab.other == "globalConfigCSS") {
            this.document.next(this.gsp.global_config.css);
        }
    };
    CodeMirrorPage.prototype.addInterface = function (component) {
        console.log(component);
        switch (component) {
            case 'MtrButtonComponent':
                this.interface = Object(__WEBPACK_IMPORTED_MODULE_10_js_beautify__["js_beautify"])(__WEBPACK_IMPORTED_MODULE_8__utilities_code_samples__["b" /* MTRButtonComponentInterfaceSample */]);
                break;
            default:
                this.interface = Object(__WEBPACK_IMPORTED_MODULE_10_js_beautify__["js_beautify"])(__WEBPACK_IMPORTED_MODULE_8__utilities_code_samples__["b" /* MTRButtonComponentInterfaceSample */]);
                break;
        }
    };
    CodeMirrorPage.prototype.newActivity = function (activity) {
        switch (activity) {
            case 'connect':
                this.events.publish('page-designer : socket-service : connect-to-board');
                break;
            case 'initialize':
                this.events.publish('page-designer : socket-service : initialize');
                break;
            case 'globalConfigJSON':
                this.events.publish('page-designer : global-service : add-tab', { other: "globalConfigJSON", mode: "JSON" });
                break;
            case 'goToDesignerPage':
                this.navCtrl.setRoot('DesignerPage');
                break;
            default:
                break;
        }
    };
    CodeMirrorPage.prototype.createComponent = function (_component) {
        var component;
        var data = _component.data;
        switch (data.config.component) {
            case 'MtrToggleComponent':
                component = this.resolver.resolveComponentFactory(__WEBPACK_IMPORTED_MODULE_4__components_mtr_toggle_mtr_toggle__["a" /* MtrToggleComponent */]);
                this.container.createComponent(component).instance.data = _component.data;
                break;
            case 'MtrButtonComponent':
                component = this.resolver.resolveComponentFactory(__WEBPACK_IMPORTED_MODULE_5__components_mtr_button_mtr_button__["a" /* MtrButtonComponent */]);
                this.container.createComponent(component).instance.data = _component.data;
                break;
            case 'MtrRangeComponent':
                component = this.resolver.resolveComponentFactory(__WEBPACK_IMPORTED_MODULE_6__components_mtr_range_mtr_range__["a" /* MtrRangeComponent */]);
                this.container.createComponent(component).instance.data = _component.data;
                break;
            default:
                component = this.resolver.resolveComponentFactory(__WEBPACK_IMPORTED_MODULE_4__components_mtr_toggle_mtr_toggle__["a" /* MtrToggleComponent */]);
                this.container.createComponent(component);
                break;
        }
    };
    CodeMirrorPage.prototype.clickedOnMenuBar = function (event) {
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
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('container', { read: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"] }),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"])
    ], CodeMirrorPage.prototype, "container", void 0);
    CodeMirrorPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-code-mirror',template:/*ion-inline-start:"G:\ionic\Project\quark\src\pages\code-mirror\code-mirror.html"*/'<ion-header>\n\n  <menu-bar (event)="clickedOnMenuBar($event)"></menu-bar>\n\n  <ion-title>\n\n    <div class="mtr-tabs-bar">\n\n      <tabs-bar [tabsArray]="this.gsp.tabsArray" (openTab)="openTab($event)" (closeTab)="closeTab($event)" [selectedTab]="this.gsp.currentTab"></tabs-bar>\n\n    </div>\n\n  </ion-title>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <div class="view-content" (contextmenu)="preventRightClick($event)">\n\n    <div [ngClass]="{\'rendered-component\' : true, \'display-rendered-component\' :this.gsp.currentTab.mode == \'CSS\'}">\n\n      <div (mousemove)="mouseMove($event)" (mouseleave)="mouseLeave()" (contextmenu)="lockContent($event)" (click)="lockContent($event)"\n\n        class="mtr-component-container">\n\n        <div #container></div>\n\n      </div>\n\n      <css-inspector [mouseMoveEvent]="mouseMoveEvent" [mouseLeaveEvent]="mouseLeaveEvent" [stayFixed]="stayFixed" [currentComponentClass]="currentComponentClassName"></css-inspector>\n\n    </div>\n\n    <div [ngClass]="{\'mtr-editor-container\' : true, \'mtr-mode-css\' : this.gsp.currentTab.mode == \'CSS\'}">\n\n      <code-editor [inputDocument]="document" [mode]="this.gsp.currentTab.mode" (showInterface)="showSnackBar()"></code-editor>\n\n    </div>\n\n  </div>\n\n  <div class="activity-bar">\n\n    <activity-bar (newActivity)="newActivity($event)"></activity-bar>\n\n  </div>\n\n  <ion-fab left middle>\n\n    <button ion-fab menuToggle>\n\n      <ion-icon name="arrow-dropright-circle"></ion-icon>\n\n    </button>\n\n  </ion-fab>\n\n</ion-content>\n\n\n\n<ion-footer>\n\n  <console></console>\n\n  <status-bar></status-bar>\n\n</ion-footer>\n\n'/*ion-inline-end:"G:\ionic\Project\quark\src\pages\code-mirror\code-mirror.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_7__angular_material__["c" /* MatSnackBar */],
            __WEBPACK_IMPORTED_MODULE_2__providers_global_service_global_service__["a" /* GlobalServiceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ComponentFactoryResolver"],
            __WEBPACK_IMPORTED_MODULE_12__providers_electron_service_electron_service__["a" /* ElectronServiceProvider */]])
    ], CodeMirrorPage);
    return CodeMirrorPage;
}());

//# sourceMappingURL=code-mirror.js.map

/***/ })

});
//# sourceMappingURL=4.js.map