import { FooterService } from './../../../Services/Home/footer.service';
import { Component, OnInit } from '@angular/core';
import { Store } from 'src/app/Models/Store';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  Cuisines: any;
  Stores: any;

  constructor(private _footerservice: FooterService) {}

  ngOnInit(): void {
    this._footerservice.getCuisines().subscribe((Cuisines) => {
      this.Cuisines = Cuisines;
    });
    this._footerservice.getStores().subscribe((Stores) => {
      this.Stores = Stores;
    });
  }
}
