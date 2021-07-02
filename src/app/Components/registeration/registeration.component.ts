import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { AuthService } from './../../Services/auth.service';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
} from 'angularx-social-login';
import { Client } from './../../Models/Client';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormsModule,
} from '@angular/forms';
import { CustomValidationService } from './../../Services/custom-validation.service';
import { ClientService } from './../../Services/client.service';
import Swal from 'sweetalert2';
import { NavbarService } from 'src/app/Services/Home/navbar.service';
import { NgControl } from '@angular/forms';

@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.css'],
})
export class RegisterationComponent implements OnInit {
  //reactive forms
  registerForm: FormGroup = this.formBuilder.group({});
  submitted = false;
  //login modal
  bsmodalRef?: BsModalRef;
  disableSelect: boolean = false;
  disableSelecto: boolean = false;
  hide = true;
  hide0 = true;

  user: SocialUser = {
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
    response: '',
  };
  GoogleLoginProvider = GoogleLoginProvider;
  FacebookLoginProvider = FacebookLoginProvider;
  client: Client = {
    clientFname: '',
    clientLname: '',
    clientEmail: '',
    clientDateOfBirth: '',
    clientPassword: '',
    clientGenderIsMale: 0,
    clientNewsletterSubscribe: 0,
    clientSmsSubscribe: 0,
  };

  clientPassword = new FormControl('', []);

  cclientPassword = new FormControl('', []);

  clientGenderIsMale = new FormControl('', [Validators.required]);
  minDate = new Date(1930, 0, 1);
  maxDate = new Date(2010, 0, 1);

  constructor(
    public cs: CustomValidationService,
    private formBuilder: FormBuilder,
    private modalService: BsModalService,
    private router: Router,
    private socialService: SocialAuthService,
    private authService: AuthService,
    private clientservice: ClientService,
    public nav: NavbarService
  ) {}
  //toOpenLoginModal
  openModal() {
    this.bsmodalRef = this.modalService.show(LoginComponent);
  }

  ngOnInit(): void {
    this.nav.show();

    this.registerForm = this.formBuilder.group({
      clientFname: [{ value: '', disabled: true }],

      //   cclientPassword: ['', Validators.required]
      // },
      // {  // validator: this.cs.MatchPassword,

      clientEmail: Validators.pattern(
        /^[a-zA-Z0-9_\\+-]+(\\.[a-z0-9_\\+-]+)*@[a-z0-9-]+(\\.[a-z0-9]+)*\\.([a-z]{2,4})$/
      ),
    });
  }

  get registerFormControl() {
    return this.registerForm.controls;
  }

  register() {
    if (this.client.clientGenderIsMale == 1) {
      this.client.clientGenderIsMale = 1;
    } else {
      this.client.clientGenderIsMale = 0;
    }
    if (this.client.clientNewsletterSubscribe == 1) {
      this.client.clientNewsletterSubscribe = 1;
    } else {
      this.client.clientNewsletterSubscribe = 0;
    }
    if (this.client.clientSmsSubscribe == 1) {
      this.client.clientSmsSubscribe = 1;
    } else {
      this.client.clientSmsSubscribe = 0;
    }
    //check if user is exist
    this.clientservice.getByemail(this.client.clientEmail).subscribe((data) => {
      console.log('status from mail', data);
      console.log('status', data[0].status);

      if (data[0].status == 200) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Email is alraedy Exist Use diffrent Email OR login !',
        });
      }
    });
    console.log('hi', this.client);
    this.authService.register(this.client).subscribe((a) => {
      console.log('subscribed', this.client);
      //this.openModal();
      this.router.navigate(['/home']);
    });

    console.log(this.client);
  }

  signInWithGoogle(): void {
    // this.clintFname.disabled
    // x:HTMLElement
    console.log(GoogleLoginProvider.PROVIDER_ID);
    this.socialService.signIn(GoogleLoginProvider.PROVIDER_ID);
    //login in with social works
    this.socialService.authState.subscribe((user) => {
      this.user = user;
      (this.client.clientFname = this.user.firstName),
        (this.client.clientLname = this.user.lastName),
        (this.client.clientEmail = this.user.email),
        (this.client.clientPassword = this.user.firstName + this.user.id);

      this.disableSelect = true;
      this.disableSelecto = true;
    });

    console.log('data from google', this.user);

    console.log('client', this.client);
  }

  signInWithFB(): void {
    this.socialService.signIn(FacebookLoginProvider.PROVIDER_ID);
    console.log(FacebookLoginProvider.PROVIDER_ID);

    //login in with social works
    this.socialService.authState.subscribe((user) => {
      this.user = user;
      (this.client.clientFname = this.user.firstName),
        (this.client.clientLname = this.user.lastName),
        (this.client.clientEmail = this.user.email),
        (this.client.clientPassword = this.user.firstName + this.user.id);
    });
    this.disableSelect = true;
  }
}
