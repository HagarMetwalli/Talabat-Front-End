"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RegisterationComponent = void 0;
var core_1 = require("@angular/core");
var login_component_1 = require("../login/login.component");
var angularx_social_login_1 = require("angularx-social-login");
var forms_1 = require("@angular/forms");
var sweetalert2_1 = require("sweetalert2");
var RegisterationComponent = /** @class */ (function () {
    function RegisterationComponent(cs, formBuilder, modalService, router, socialService, authService, clientservice) {
        this.cs = cs;
        this.formBuilder = formBuilder;
        this.modalService = modalService;
        this.router = router;
        this.socialService = socialService;
        this.authService = authService;
        this.clientservice = clientservice;
        //reactive forms
        this.registerForm = this.formBuilder.group({});
        this.submitted = false;
        this.hide = true;
        this.hide0 = true;
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
        this.GoogleLoginProvider = angularx_social_login_1.GoogleLoginProvider;
        this.FacebookLoginProvider = angularx_social_login_1.FacebookLoginProvider;
        this.client = {
            clientFname: '',
            clientLname: '',
            clientEmail: '',
            clientDateOfBirth: '',
            clientPassword: '',
            clientGenderIsMale: 0,
            clientNewsletterSubscribe: 0,
            clientSmsSubscribe: 0
        };
        this.clientPassword = new forms_1.FormControl('', []);
        this.cclientPassword = new forms_1.FormControl('', []);
        this.clientGenderIsMale = new forms_1.FormControl('', [forms_1.Validators.required]);
        this.minDate = new Date(1930, 0, 1);
        this.maxDate = new Date(2010, 0, 1);
    }
    //toOpenLoginModal
    RegisterationComponent.prototype.openModal = function () {
        this.bsmodalRef = this.modalService.show(login_component_1.LoginComponent);
    };
    RegisterationComponent.prototype.ngOnInit = function () {
        var _this = this;
        //login in with social works
        this.socialService.authState.subscribe(function (user) {
            _this.user = user;
        });
        this.registerForm = this.formBuilder.group({
            //   clientPassword:['', Validators.compose([Validators.required, this.cs.patternValidator()])],
            //   cclientPassword: ['', Validators.required]
            // },
            // {  // validator: this.cs.MatchPassword,
            clientEmail: forms_1.Validators.pattern(/^[a-zA-Z0-9_\\+-]+(\\.[a-z0-9_\\+-]+)*@[a-z0-9-]+(\\.[a-z0-9]+)*\\.([a-z]{2,4})$/)
        });
    };
    Object.defineProperty(RegisterationComponent.prototype, "registerFormControl", {
        get: function () {
            return this.registerForm.controls;
        },
        enumerable: false,
        configurable: true
    });
    RegisterationComponent.prototype.register = function () {
        var _this = this;
        if (this.client.clientGenderIsMale == 1) {
            this.client.clientGenderIsMale = 1;
        }
        else {
            this.client.clientGenderIsMale = 0;
        }
        if (this.client.clientNewsletterSubscribe == 1) {
            this.client.clientNewsletterSubscribe = 1;
        }
        else {
            this.client.clientNewsletterSubscribe = 0;
        }
        if (this.client.clientSmsSubscribe == 1) {
            this.client.clientSmsSubscribe = 1;
        }
        else {
            this.client.clientSmsSubscribe = 0;
        }
        //check if user is exist
        this.clientservice.getByemail(this.client.clientEmail).subscribe(function (data) {
            console.log('status from mail', data);
            console.log('status', data[0].status);
            if (data[0].status == 200) {
                sweetalert2_1["default"].fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Email is alraedy Exist Use diffrent Email OR login !'
                });
            }
        });
        console.log('hi', this.client);
        this.authService.register(this.client).subscribe(function (a) {
            console.log('subscribed', _this.client);
            _this.openModal();
        });
        console.log(this.client);
    };
    RegisterationComponent.prototype.signInWithGoogle = function () {
        console.log(angularx_social_login_1.GoogleLoginProvider.PROVIDER_ID);
        this.socialService.signIn(angularx_social_login_1.GoogleLoginProvider.PROVIDER_ID);
        (this.client.clientFname = this.user.firstName),
            (this.client.clientLname = this.user.lastName),
            (this.client.clientEmail = this.user.email),
            (this.client.clientPassword = this.user.firstName + this.user.id),
            console.log('data from google', this.user);
        console.log('client', this.client);
    };
    RegisterationComponent.prototype.signInWithFB = function () {
        this.socialService.signIn(angularx_social_login_1.FacebookLoginProvider.PROVIDER_ID);
        console.log(angularx_social_login_1.FacebookLoginProvider.PROVIDER_ID);
        (this.client.clientFname = this.user.firstName),
            (this.client.clientLname = this.user.lastName),
            (this.client.clientEmail = this.user.email),
            (this.client.clientPassword = this.user.firstName + this.user.id),
            console.log('data from google', this.user);
        console.log('client', this.client);
    };
    RegisterationComponent = __decorate([
        core_1.Component({
            selector: 'app-registeration',
            templateUrl: './registeration.component.html',
            styleUrls: ['./registeration.component.css']
        })
    ], RegisterationComponent);
    return RegisterationComponent;
}());
exports.RegisterationComponent = RegisterationComponent;
