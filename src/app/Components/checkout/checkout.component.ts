
import { LocalStorageService } from 'ngx-webstorage';
import { Product } from '../../Models/Product';

import { MapsAPILoader, LatLngLiteral } from '@agm/core';
import { Component, ElementRef, NgZone, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { GooglemapService } from 'src/app/Services/google-map.service';

import { Order } from 'src/app/Models/Order';
import { Store } from './../../Models/Store';
import { StoreprofileService } from 'src/app/Services/Stores/store-profile.service';
import { VoucherService } from 'src/app/Services/voucher.service';
import { Client } from 'src/app/Models/Client';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormsModule,
} from '@angular/forms';

import { NavbarService } from 'src/app/Services/Home/navbar.service';
import { CartServiceService } from 'src/app/Services/cart-service.service';
import { OrderItem } from 'src/app/Models/order-item';
import { OrderSubmitData } from 'src/app/Models/OrderSubmitData';

import { MatRadioChange } from "@angular/material/radio";
import { MatExpansionPanel } from "@angular/material/expansion";


interface Coordinates {
  address: string;
  latitude: string;
  longitude: string;
}
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  coordinates: Coordinates;
  bsModalRef?: BsModalRef;

  latitude!: number;
  longitude!: number;
  zoom!: number;
  address!: string;
  private geoCoder!: google.maps.Geocoder;

  @ViewChild('search')
  public searchElementRef!: ElementRef;

  @ViewChild('pop')
  public LocationsearchElementRef!: ElementRef;

  @ViewChild('template', { static: true })
  public templateRef!: TemplateRef<any>;



  //store
  //objects to store
  sub: any;
  store!: Store;
  id: any;
  arr: any = { itemId: 0, itemName: '', itemPrice: 0, count: 0, value: 0 };
  //order
  numcount?: number;
  itemarr: number[] = [];

  //voucher
  couponId?: number;
  client: any;
  voucherkey: any;
  arraylist: number[] = [];
  speciall: any = "non";
  //form inputs

  Discount: any = 0;
  public msg = false;
  public msg2 = false;



  ordersub: OrderSubmitData | undefined;
  btnDisabled = false;

  itemList: OrderItem[] = [];


  //occardion works 
  panelOpenState = false;


  onChange(radio: MatRadioChange, panel: MatExpansionPanel) {
    panel.open();
  }


  constructor(
    private locals: LocalStorageService,
    private _Activatedroute: ActivatedRoute,
    private _router: Router,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private modalService: BsModalService,
    private _googlemapservice: GooglemapService,
    public nav: NavbarService,

    private _StoreprofileService: StoreprofileService,
    private formBuilder: FormBuilder,
    private voucherservice: VoucherService,
    public cartservice: CartServiceService,
  ) {
    this.coordinates = {} as Coordinates;
  }







  centerLatitude = this.latitude;
  centerLongitude = this.longitude;

  // initialZoom = 5;

  public centerChanged(coords: LatLngLiteral) {
    this.centerLatitude = coords.lat;
    this.centerLongitude = coords.lng;
  }

  public mapReady(map: { addListener: (arg0: string, arg1: () => void) => void; }) {
    map.addListener("dragend", () => {
      console.log(this.centerLatitude, this.centerLongitude);
    });
  }


  closeModal() {
    this.modalService.hide();
  };



  config = {

    animated: true,
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: true,
  };



  openAddressModalOnClick() {
    this.bsModalRef = this.modalService.show(this.templateRef, this.config)

  }
  //ngOnInit
  ngOnInit(): void {



    this.nav.show();
    this.bsModalRef = this.modalService.show(this.templateRef, this.config);

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder();

      let autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement
      );
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });

    // order works
    this.sub = this._Activatedroute.paramMap.subscribe((params) => {
      console.log(params);
      this.id = params.get('storeid');
      this.id = +this.id;
      console.log('StoreID', params.get('storeid'));
    });

    this._StoreprofileService.getStoreById(this.id).subscribe((store) => {
      console.log('theStore', store);
      this.store = store;
    });
    console.log('memmm', localStorage.getItem('ngx-webstorage|cart'));

    this.arr = JSON.parse(this.locals.retrieve('cart'));
    console.log('tanyarrr', this.arr);

    //get item array to subscribe 
    for (let item of this.arr) {
      this.itemarr.push(item.itemId);
    }
    console.log("this items", this.itemarr);

    //get clint id
    this.client = sessionStorage.getItem('clientId');
    console.log('el client bta3na', this.client);

    //calc total 
    let mycount: number = 0;
    for (let item of this.arr) {
      mycount += item.count;
    }
    this.numcount = mycount;




    //submited order obj


    for (let item of this.arr) {

      this.itemList.push
        ({
          OrderId: 0,
          ItemId: item.itemId,
          OrderItemQty: item.count

        })

    }

  }//end of ngOnInt

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }

  getAddress(latitude: number, longitude: number) {
    this.geoCoder.geocode(
      { location: { lat: latitude, lng: longitude } },
      (results, status) => {
        console.log(results);
        console.log(status);
        if (status === 'OK') {
          if (results[0]) {
            this.zoom = 12;
            this.address = results[0].formatted_address;
          } else {
            console.log('No results found');
            // window.alert('No results found');
          }
        } else {
          console.log('Geocoder failed due to: ' + status);
          // window.alert('Geocoder failed due to: ' + status);
        }
      }


    );

  }




  voucher() {
    this.msg = false;
    this.msg2 = false;
    this.voucherservice.GetVoucher(this.voucherkey, this.itemarr, 1).subscribe((data) => {

      if (data != null) {
        this.Discount = data;
        this.msg = true;

        // console.log(data);
        // console.log("elvoucherrrrrrr", this.voucherkey);
        // console.log("client id bta3 el voucher", this.client)

      }
      else if (data == null) {
        this.msg2 = true;
      }

    },
      (error) => {
        console.log('ghalatattattattaa');
        this.msg2 = true;
      }
    );

  }

  placeOrder() {


    this.ordersub = {
      order: {
        orderCost: this.cartservice.totalPrice - this.Discount,
        orderSpecialRequest: this.speciall,
        orderTime: new Date(),
        addressDetails: "text",
        clientId: 1,
        storeId: this.id,
        isDelivered: 0,

      },
      orderItemsList: this.itemList

    }
    console.log(this.ordersub);
    this.voucherservice.postOrder(this.ordersub).subscribe((data) => {

      console.log(data);


    },
      (e) => {
        this._router.navigate(['/Thankyou']);
      }
    );

  }


};

