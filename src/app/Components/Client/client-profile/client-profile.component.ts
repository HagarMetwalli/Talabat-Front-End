import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/Models/Client';
import { ProfileService } from 'src/app/Services/Profile/Profile.service';
import { NavbarService } from 'src/app/Services/Home/navbar.service';


@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.css']
})
export class ClientProfileComponent implements OnInit {
  // aaa: boolean = false;
  btnstyle: string = 'side-btns-nav'
  constructor(public nav: NavbarService) { }

  ngOnInit(): void {
    this.nav.show();
  }

  sss(btn: HTMLAnchorElement, btn2: HTMLAnchorElement, btn3: HTMLAnchorElement, btn4: HTMLAnchorElement) {
    btn.className = "nav-item nav-link has-icon nav-link-faded custom-nav";
    btn2.className = "nav-item nav-link has-icon nav-link-faded";
    btn3.className = "nav-item nav-link has-icon nav-link-faded";
    btn4.className = "nav-item nav-link has-icon nav-link-faded";

  }


}
