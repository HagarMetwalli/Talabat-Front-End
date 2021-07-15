import { Router } from '@angular/router';
import { RegisterationComponent } from './../../registeration/registeration.component';
import { LoginComponent } from './../../login/login.component';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SocialUser, SocialAuthService } from 'angularx-social-login';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NavbarService } from 'src/app/Services/Home/navbar.service';
import { LocalStorageService } from 'ngx-webstorage';

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
  @ViewChild('menu')
  public searchElementRef!: ElementRef;
  bsmodalRef?: BsModalRef;
  user?: SocialUser;
  arr: any = { itemId: 0, itemName: '', itemPrice: 0, count: 0, value: 0 };
  //order
  numcount?: number;
  cartFlag = false;


  constructor(
    private authService: SocialAuthService,
    private modalService: BsModalService,
    private router: Router,
    public nav: NavbarService,
    private locals: LocalStorageService,
  ) { }

  config = {
    animated: true,
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: true,
  };

  openModal() {
    this.bsmodalRef = this.modalService.show(LoginComponent, this.config);
  }

  register() {
    this.router.navigate(['register']);
  }
  loggedIn() {
    let token = sessionStorage.getItem('token') && localStorage.getItem('token');
    if (token != '' && token != null) {
      //console.log('from nav bar token here', token);

      return true;
    } else {
      // console.log('from nav bar no token ');

      return false;
    }
  }

  logout() {
    console.log('clear all');
    sessionStorage.setItem('token', '');
    localStorage.setItem('token', '');
    sessionStorage.clear();


  }
  ngOnInit(): void {
    this.arr = JSON.parse(this.locals.retrieve('cart'));
    console.log('tanyarrr', this.arr);

    //calc total
    let mycount: number = 0;
    for (let item of this.arr) {
      mycount += item.count;
    }
    this.numcount = mycount;

    if (this.numcount > 0) {
      this.cartFlag = true;
    } else {
      this.cartFlag = false;
    }

  }
}


