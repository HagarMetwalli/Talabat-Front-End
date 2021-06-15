import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { StoreprofileService } from '../../../Services/Stores/store-profile.service';

@Component({
  selector: 'app-store-profile',
  templateUrl: './resturant-profile.component.html',
  styleUrls: ['./resturant-profile.component.css']
})
export class ResturantProfileComponent implements OnInit {
  constructor(private _Activatedroute: ActivatedRoute,
    private _router: Router,
    private _StoreprofileService: StoreprofileService) { }
  sub: any;
  _store: any;

  id: any;
  ngOnInit() {
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      console.log(params);
      this.id = params.get('storeid');
      this.id = + this.id;
      console.log("IIIID", params.get('storeid'));

    });

    this._StoreprofileService.getStoreById(this.id).subscribe(
      store => {
        console.log(store);
        this._store = store;
      }
    )

  }
  showmenu(_id?: number) {
    this._router.navigate(['storemenu/', _id]);
  }

}
