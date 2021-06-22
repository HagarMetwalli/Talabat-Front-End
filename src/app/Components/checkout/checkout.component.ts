
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

  subtotalPrice = 0;
  VoucherDiscount = 0;
  DeliverFees = 0;
  totalPrice = 0;

  //store
  //objects to store
  sub: any;
  store!: Store;
  id: any;
  arr: any = { itemId: 0, itemName: '', itemPrice: 0, count: 0, value: 0 };
//voucher
couponId?:number;
client?:Client;
voucherForm!: FormGroup;
  //form inputs
  order: Order = {
    orderId: 0,
    orderCost: 0,
    orderSpecialRequest: '',
    orderTime: '',
    addressDetails: '',
    clientId: 0,
    storeId: 0,
    isDelivered: '',
    deliveryStatusInString: '',
  };




  btnDisabled = false;



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
    private voucherservice:VoucherService,
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
    // this.myarr = localStorage.getItem('ngx-webstorage|cart');
    this.arr = JSON.parse(this.locals.retrieve('cart'))[0];

    // console.log('array', this.myarr);
    console.log('tanyarrr', this.arr);

   this.voucherForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

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

  get fieldget() {
    return this.voucherForm.controls;
  }

//  voucher(){
//    this.voucherservice.GetVoucher(this.couponId,this.client.clientId,).subscribe((data) => {
//      console.log(data);
//   });
//  }


  
};

