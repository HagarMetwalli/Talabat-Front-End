import { Router } from '@angular/router';
import { RegisterationComponent } from './../../registeration/registeration.component';
import { LoginComponent } from './../../login/login.component';
import { Component, OnInit } from '@angular/core';
import { SocialUser, SocialAuthService } from 'angularx-social-login';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  // template: `<!-- To render DropDownButton. -->
  // <button
  //   ejs-dropdownbutton
  //   [items]="items"
  //   content="Message"
  //   iconCss="ddb-icons e-message"
  // ></button>`,
})
export class NavBarComponent implements OnInit {
  bsmodalRef?: BsModalRef;
  user?: SocialUser;
  constructor(
    private authService: SocialAuthService,
    private modalService: BsModalService,
    private router: Router
  ) {}

  openModal() {
    this.bsmodalRef = this.modalService.show(LoginComponent);
  }

  register() {
    this.router.navigate(['register']);
  }
  loggedIn() {
    let token = sessionStorage.getItem('token');
    if (token != '' && token != null) {
      //  console.log('from nav bar token here', token);

      return true;
    } else {
      //  console.log('from nav bar no token ');

      return false;
    }
  }

  logout() {
    console.log('clear all');
    sessionStorage.setItem('token', '');
  }
  ngOnInit(): void {}
}
