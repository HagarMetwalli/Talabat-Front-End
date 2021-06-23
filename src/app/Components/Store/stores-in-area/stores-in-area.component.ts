import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '../../../Models/Store';
import { Component, OnInit, Input } from '@angular/core';
import { NavbarService } from 'src/app/Services/Home/navbar.service';
import { GooglemapService } from 'src/app/Services/google-map.service';

@Component({
  selector: 'app-stores-in-area',
  templateUrl: './stores-in-area.component.html',
  styleUrls: ['./stores-in-area.component.css']
})
export class StoresInAreaComponent implements OnInit {

  @Input() nearStores: Store[] = []
  filterTerm?: string;
  page !: number;
  store!: Store;
  latitude!: any;
  longitude!: any;

    constructor(
      private router: Router,
      private activatedroute: ActivatedRoute,
      public nav: NavbarService,
      private _googlemapservice: GooglemapService) { }

  ngOnInit(): void {
    this.nav.show();
    this.activatedroute.paramMap.subscribe(params => {
      this.latitude= params.get('latitude');
      this.longitude= params.get('longitude');
    });

    this._googlemapservice.getstores(this.latitude,this.longitude).subscribe(
      _stores => {
        console.log("<<<<<", _stores);
        this.store = _stores;
        console.log(">>>>>", this.store);
      })


  }

}
