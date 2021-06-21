import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/Services/Home/navbar.service';

@Component({
  selector: 'app-partener-login',
  templateUrl: './partener-login.component.html',
  styleUrls: ['./partener-login.component.css']
})
export class PartenerLoginComponent implements OnInit {

  constructor(public nav:NavbarService) { }

  ngOnInit(): void {
    this.nav.hide();
  }

}
