"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoginComponent = void 0;
var core_1 = require("@angular/core");
var angularx_social_login_1 = require("angularx-social-login");
var forms_1 = require("@angular/forms");
var sweetalert2_1 = require("sweetalert2");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(formBuilder, socialService, router, authService, tokenService, modalService, clientservice) {
        this.formBuilder = formBuilder;
        this.socialService = socialService;
        this.router = router;
        this.authService = authService;
        this.tokenService = tokenService;
        this.modalService = modalService;
        this.clientservice = clientservice;
        this.loading = false;
        this.submitted = false;
        this.rememberMe = true;
        this.loggedClient = {
            email: '',
            password: ''
        };
        this.isLoggedIn = false;
        this.isLoginFailed = false;
        this.errorMessage = '';
        this.roles = [];
        this.GoogleLoginProvider = angularx_social_login_1.GoogleLoginProvider;
        this.FacebookLoginProvider = angularx_social_login_1.FacebookLoginProvider;
        this.user = {
            email: '',
            firstName: '',
            lastName: '',
            id: '',
            provider: '',
            name: '',
            photoUrl: '',
            authToken: '',
            idToken: '',
            authorizationCode: '',
            response: ''
        };
    }
    LoginComponent.prototype.closeModal = function () {
        this.modalService.hide();
    };
    LoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        //login in with social works
        this.socialService.authState.subscribe(function (user) {
            _this.user = user;
        });
        //check staute
        console.log('remember me : ', this.rememberMe);
        this.loginForm = this.formBuilder.group({
            email: ['', forms_1.Validators.required],
            password: ['', forms_1.Validators.required]
        });
        if (this.tokenService.getToken()) {
            this.isLoggedIn = true;
            this.roles = this.tokenService.getClient().roles;
        }
    }; //end of onit
    LoginComponent.prototype.signInWithGoogle = function () {
        console.log(angularx_social_login_1.GoogleLoginProvider.PROVIDER_ID);
        this.socialService.signIn(angularx_social_login_1.GoogleLoginProvider.PROVIDER_ID);
        (this.loggedClient.email = this.user.email),
            (this.loggedClient.password = this.user.firstName + this.user.id),
            console.log('data from google', this.user);
        console.log('client', this.loggedClient);
    };
    LoginComponent.prototype.signInWithFB = function () {
        this.socialService.signIn(angularx_social_login_1.FacebookLoginProvider.PROVIDER_ID);
        console.log(angularx_social_login_1.FacebookLoginProvider.PROVIDER_ID);
        (this.loggedClient.email = this.user.email),
            (this.loggedClient.password = this.user.firstName + this.user.id);
        //console.log('data from google', this.user);
        //console.log('client', this.loggedClient);
    };
    Object.defineProperty(LoginComponent.prototype, "fieldget", {
        // convenience getter for easy access to form fields
        get: function () {
            return this.loginForm.controls;
        },
        enumerable: false,
        configurable: true
    });
    LoginComponent.prototype.onSubmit = function () {
        var _this = this;
        //check if user is exist
        this.clientservice.getByemail(this.loggedClient.email).subscribe(function (data) {
            console.log('status from mail', data);
            console.log('status', data[0].status);
            //   sessionStorage.setItem('client id', JSON.stringify(data));
            if (data[0].status == 404) {
                sweetalert2_1["default"].fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Email is not Exist Please Register First!'
                });
            }
        });
        //login
        this.authService
            .login(this.fieldget.email.value, this.fieldget.password.value)
            .subscribe(function (data) {
            // Save value to local storage
            if (_this.rememberMe) {
                //localStorage.setItem('rememberMe', 'yes');
                localStorage.setItem('currentClient', JSON.stringify(_this.loggedClient));
                // localStorage.setItem('token', JSON.stringify(data));
            }
            sessionStorage.setItem('token', JSON.stringify(data));
            //console.log('token', data);
            _this.router.navigate(['']);
            _this.closeModal();
        });
        //console.log('before getting email');
        // store client id in session
        // this.clientservice.getByemail(this.loggedClient.email).subscribe((data) => {
        //   console.log('getbyemail', data);
        //   sessionStorage.setItem('client id', JSON.stringify(data));
        // });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css']
        })
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
