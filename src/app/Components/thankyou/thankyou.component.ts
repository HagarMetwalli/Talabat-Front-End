import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/Services/Home/navbar.service';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.css']
})
export class ThankyouComponent implements OnInit {
  constructor(public nav: NavbarService) { }

  ngOnInit(): void {
    this.nav.show();
  }


}
