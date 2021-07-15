import { Component, OnInit } from '@angular/core';
import { SocialAuthService } from 'angularx-social-login';
import { Router, ActivatedRoute } from '@angular/router';
import { SocialUser } from 'angularx-social-login';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
} from 'angularx-social-login';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { AuthService } from './../../Services/auth.service';
import { first } from 'rxjs/operators';
import { TokenService } from './../../Services/token.service';
import { LoggedClient } from './../../Models/LoggedClient';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ClientService } from './../../Services/client.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  bsmodalRef?: BsModalRef;
  loading = false;
  // loginForm!: FormGroup;
  submitted = false;
  rememberMe: boolean = true;
  loggedClient = {
    email: '',
    password: '',
  };
  formGroup?: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  GoogleLoginProvider = GoogleLoginProvider;
  FacebookLoginProvider = FacebookLoginProvider;
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
  constructor(
    private formBuilder: FormBuilder,
    private socialService: SocialAuthService,
    private router: Router,
    private authService: AuthService,
    private tokenService: TokenService,
    private modalService: BsModalService,
    private clientservice: ClientService
  ) {}

  disableSelect: boolean = false;
  disableSelecto: boolean = false;
  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  // convenience getter for easy access to form fields
  get fieldget() {
    return this.loginForm.controls;
  }

  closeModal() {
    this.modalService.hide();
  }

  ngOnInit(): void {} //end of onit

  signInWithGoogle(): void {
    // console.log(GoogleLoginProvider.PROVIDER_ID);
    this.socialService.signIn(GoogleLoginProvider.PROVIDER_ID);
    //login in with social works
    this.socialService.authState.subscribe((user) => {
      this.user = user;
      (this.loggedClient.email = this.user.email),
        (this.loggedClient.password = this.user.firstName + this.user.id);
    });
    this.disableSelect = true;
    this.disableSelecto = true;
    setTimeout(() => {
      this.onSubmit();
    }, 11000);

    // console.log('data from google', this.user);

    // console.log('clienttt', this.loggedClient);
  }

  signInWithFB(): void {
    this.socialService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.socialService.authState.subscribe((user) => {
      this.user = user;
      (this.loggedClient.email = this.user.email),
        (this.loggedClient.password = this.user.firstName + this.user.id);
    });
    this.disableSelect = true;
  }

  onSubmit() {
    //check if user is exist
    this.clientservice.getByemail(this.loggedClient.email).subscribe((data) => {
      console.log('data from mail', data);
      console.log('status', data.status);

      if (data.status == 404) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Email is not Exist Please Register First!',
        });
      }
    });

    // store client id in session

    this.clientservice
      .getByemailtwo(this.loggedClient.email)
      .subscribe((data) => {
        console.log('getbyemailnow', data);
        sessionStorage.setItem('client', JSON.stringify(data));
        // sessionStorage.setItem('clientId', JSON.stringify(data.clientId));
      });

    //login
    this.authService
      .login(this.loggedClient.email, this.loggedClient.password)
      .subscribe(
        (data) => {
          // Save value to local storage
          if (this.rememberMe) {
            localStorage.setItem(
              'currentClient',
              JSON.stringify(this.loggedClient)
            );
            localStorage.setItem('token', JSON.stringify(data));
          }
          sessionStorage.setItem('token', JSON.stringify(data));
          this.router.navigate(['']);
          this.closeModal();
        },

        //error
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Email or Password in falid!',
          });
        }
      );
  }
}
