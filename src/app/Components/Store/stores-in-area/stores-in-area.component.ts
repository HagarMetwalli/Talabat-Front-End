import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '../../../Models/Store';
import { Component, OnInit, Input, Pipe, PipeTransform } from '@angular/core';
import { NavbarService } from 'src/app/Services/Home/navbar.service';
import { GooglemapService } from 'src/app/Services/google-map.service';
import { StoreService } from 'src/app/Services/Stores/store.service';


@Component({
  selector: 'app-stores-in-area',
  templateUrl: './stores-in-area.component.html',
  styleUrls: ['./stores-in-area.component.css']
})
export class StoresInAreaComponent implements OnInit, PipeTransform {



  // @Pipe({
  //   name: 'filter'
  // })

  @Input() nearStores: Store[] = []
  filterTerm!: string;
  page !: number;
  stores: Store[] = [];
  storesdefault: Store[] = [];

  latitude!: any;
  longitude!: any;

  cuisien: any[] = [];

  public filter = {
    Egypt: false,
    China: false,
    Muslim: false,
    Russian: false,
    KSA: false,
    Japan: false,
  }



  // stores = [
  //   {storeName:"ABLA-BLA", storeCuisine: "Italian", storeDeliveryTime: "10", storeDeliveryFee: "15",
  //   storeMinOrder: "5"},
  //   {storeName:"BBLA-BLA", storeCuisine: "Russian", storeDeliveryTime: "5", storeDeliveryFee: "5",
  //   storeMinOrder: "5"},
  //   {storeName:"CBLA-BLA", storeCuisine: "China", storeDeliveryTime: "2", storeDeliveryFee: "11",
  //   storeMinOrder: "5"},
  //   {storeName:"DBLA-BLA", storeCuisine: "Egypt", storeDeliveryTime: "11", storeDeliveryFee: "25",
  //   storeMinOrder: "5"},
  //   {storeName:"EBLA-BLA", storeCuisine: "Muslim", storeDeliveryTime: "10", storeDeliveryFee: "10",
  //   storeMinOrder: "5"},
  //   {storeName:"FBLA-BLA", storeCuisine: "Japan", storeDeliveryTime: "7", storeDeliveryFee: "45",
  //   storeMinOrder: "5"},
  //   {storeName:"GBLA-BLA", storeCuisine: "Corean", storeDeliveryTime: "17", storeDeliveryFee: "25",
  //   storeMinOrder: "5"},
  //   {storeName:"ABLA-BLA", storeCuisine: "KSA", storeDeliveryTime: "10", storeDeliveryFee: "12",
  //   storeMinOrder: "5"},
  //   {storeName:"CBLA-BLA", storeCuisine: "Italian", storeDeliveryTime: "7", storeDeliveryFee: "8",
  //   storeMinOrder: "5"},
  //   {storeName:"DBLA-BLA", storeCuisine: "Egypt", storeDeliveryTime: "22", storeDeliveryFee: "25",
  //   storeMinOrder: "5"},
  // ]

  constructor(
    private router: Router,
    private activatedroute: ActivatedRoute,
    public nav: NavbarService,
    private _googlemapservice: GooglemapService,
    public StoreS: StoreService) { }


  transform(values: Store[], filters: any): Store[] {
    if (!filters)
      return values;

    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        values = values.filter((item: { [x: string]: any; }) => item[key]);
      }
    })

    return values;

  }

  ngOnInit(): void {
    this.nav.show();
    this.activatedroute.paramMap.subscribe(params => {
      this.latitude = params.get('latitude');
      this.longitude = params.get('longitude');
    });

    this._googlemapservice.getstores(this.latitude, this.longitude).subscribe(
      _stores => {
        // console.log("<<<<<", _stores[0].nearStores.body);
        this.stores = _stores[0].nearStores.body;
        this.storesdefault = _stores[0].nearStores.body;
        console.log("st", this.stores);
      })


    this.StoreS.getAllCuisines().subscribe(
      (data: any) => {
        this.cuisien = data;
        console.log("data", data[0]);

      }
    )

  }//end

  //   getfilterTabs(filtername: string){
  //    // console.log("gg");

  //     if(filtername!=""){
  //       let filtercu =this.cuisien.filter((factor)=> factor.cuisineName == "filtername");
  //       let filterst =this.stores.filter((factor)=> factor.cuisineId == filtercu[0].cuisineId);
  //       this.stores=filterst;
  //       console.log("sst",this.stores);
  //       console.log("filrr",filtercu);



  //     }
  //     else {
  //       this.stores = this.storesdefault;;
  //     }
  //   }

}