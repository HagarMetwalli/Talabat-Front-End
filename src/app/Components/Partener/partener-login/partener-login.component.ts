import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Partner } from 'src/app/Models/Partner/Partner';
import { NavbarService } from 'src/app/Services/Home/navbar.service';
import Swal from 'sweetalert2';
import { LoggedPartnerService } from './../../../Services/Partner/logged-partner.service';

@Component({
  selector: 'app-partener-login',
  templateUrl: './partener-login.component.html',
  styleUrls: ['./partener-login.component.css'],
})
export class PartenerLoginComponent implements OnInit {
  hide = true;
  hide0 = true;
  submitted = false;
  loginForm!: FormGroup;
  partner: Partner = {
    email: '',
    password: '',
  };
  constructor(
    public nav: NavbarService,
    public loggedpartner: LoggedPartnerService,
    private formBuilder: FormBuilder,
    private router: Router // private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.nav.hide();
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  get fieldget() {
    return this.loginForm.controls;
  }

  onSubmit() {
    //login
    this.loggedpartner
      .login(this.fieldget.email.value, this.fieldget.password.value)
      .subscribe((data) => {
        sessionStorage.setItem('token', JSON.stringify(data));
        console.log('loggedpartner', data);
        this.router.navigate(['']);
      });
  }
}
