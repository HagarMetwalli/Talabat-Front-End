
import { Component, Input, OnInit} from '@angular/core';

import {MatTabsModule} from '@angular/material/tabs';

import { StoreService } from './../../Services/Stores/store.service';
import { Store } from './../../Models/Store';
import { Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css'],
  // encapsulation: ViewEncapsulation.None,
})
export class OffersComponent implements OnInit {

  stores : Store[] = [];
  page !: number;
  constructor(  private StoresService:StoreService , private router : Router , private avtive : ActivatedRoute) {}

  ngOnInit(): void {

    // this.StoresService.getstores().subscribe(
    //   _store =>{
    //     console.log(_store);
    //     this.stores = _store;
    //   }
    // )
  }
}
