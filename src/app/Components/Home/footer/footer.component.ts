import { FooterService } from './../../../Services/Home/footer.service';
import { Component, OnInit } from '@angular/core';
import { Stores } from 'src/app/Models/Store';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  constructor( private _footerservice:FooterService) { 
  }

  ngOnInit(): void {
    this.MostCommonStores()
  }
  stores! : Stores [];
  MostCommonStores(){
      console.log (this._footerservice.getstores());
  }
}