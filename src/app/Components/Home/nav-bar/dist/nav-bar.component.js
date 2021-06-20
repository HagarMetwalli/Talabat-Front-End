"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NavBarComponent = void 0;
var login_component_1 = require("./../../login/login.component");
var core_1 = require("@angular/core");
var NavBarComponent = /** @class */ (function () {
    function NavBarComponent(authService, modalService, router, nav) {
        this.authService = authService;
        this.modalService = modalService;
        this.router = router;
        this.nav = nav;
        this.config = {
            animated: true,
            keyboard: false,
            backdrop: true,
            ignoreBackdropClick: true
        };
    }
    NavBarComponent.prototype.openModal = function () {
        this.bsmodalRef = this.modalService.show(login_component_1.LoginComponent, this.config);
    };
    NavBarComponent.prototype.register = function () {
        this.router.navigate(['register']);
    };
    NavBarComponent.prototype.loggedIn = function () {
        var token = sessionStorage.getItem('token');
        if (token != '' && token != null) {
            //console.log('from nav bar token here', token);
            return true;
        }
        else {
            // console.log('from nav bar no token ');
            return false;
        }
    };
    NavBarComponent.prototype.logout = function () {
        console.log('clear all');
        sessionStorage.setItem('token', '');
    };
    NavBarComponent.prototype.ngOnInit = function () { };
    __decorate([
        core_1.ViewChild('menu')
    ], NavBarComponent.prototype, "searchElementRef");
    NavBarComponent = __decorate([
        core_1.Component({
            selector: 'app-nav-bar',
            templateUrl: './nav-bar.component.html',
            styleUrls: ['./nav-bar.component.css']
        })
    ], NavBarComponent);
    return NavBarComponent;
}());
exports.NavBarComponent = NavBarComponent;
