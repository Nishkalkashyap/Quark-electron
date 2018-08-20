webpackJsonp([3],{

/***/ 805:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConnectMobilePageModule", function() { return ConnectMobilePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__connect_mobile__ = __webpack_require__(813);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ConnectMobilePageModule = /** @class */ (function () {
    function ConnectMobilePageModule() {
    }
    ConnectMobilePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__connect_mobile__["a" /* ConnectMobilePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__connect_mobile__["a" /* ConnectMobilePage */]),
            ],
        })
    ], ConnectMobilePageModule);
    return ConnectMobilePageModule;
}());

//# sourceMappingURL=connect-mobile.module.js.map

/***/ }),

/***/ 813:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConnectMobilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_socket_service_socket_service__ = __webpack_require__(398);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ConnectMobilePage = /** @class */ (function () {
    function ConnectMobilePage(navCtrl, ssp, loadCtrl, events, alertCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.ssp = ssp;
        this.loadCtrl = loadCtrl;
        this.events = events;
        this.alertCtrl = alertCtrl;
        this.events.subscribe('socket-service : connect-mobile : connected', function () {
            _this.navCtrl.setRoot('LandingPage');
        });
    }
    ConnectMobilePage.prototype.connectToServer = function (ip) {
        var _this = this;
        this.ssp.connectToSocketServer(ip.value);
        var loading = this.loadCtrl.create({
            content: 'Connecting...',
            dismissOnPageChange: true
        });
        loading.present();
        loading.onDidDismiss(function () {
            loadCompelete = true;
        });
        var loadCompelete = false;
        setTimeout(function () {
            loading.dismiss();
            if (loadCompelete == false) {
                _this.alertCtrl.create({
                    title: 'Connection Timed Out',
                    message: 'Your connection was timed out. Please check the entered ip address'
                }).present();
                loadCompelete = true;
            }
        }, 5000);
    };
    ConnectMobilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-connect-mobile',template:/*ion-inline-start:"G:\ionic\Project\quark\src\pages\connect-mobile\connect-mobile.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>Connect To Mobile</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n  <h1>Please enter the IP Address</h1>\n  <ion-item>\n    <ion-label floating>IP Address</ion-label>\n    <ion-input type="text" #ip></ion-input>\n  </ion-item>\n\n  <button ion-button (click)="connectToServer(ip)">Connect</button>\n\n</ion-content>\n'/*ion-inline-end:"G:\ionic\Project\quark\src\pages\connect-mobile\connect-mobile.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_socket_service_socket_service__["a" /* SocketServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], ConnectMobilePage);
    return ConnectMobilePage;
}());

//# sourceMappingURL=connect-mobile.js.map

/***/ })

});
//# sourceMappingURL=3.js.map