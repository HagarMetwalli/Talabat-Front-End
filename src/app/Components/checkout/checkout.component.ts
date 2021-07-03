
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



import { AddressesService } from 'src/app/Services/Profile/Addresses.service';
import Swal from 'sweetalert2';
import { ClientAddress } from 'src/app/Models/ClientAddress';
import { stringify } from '@angular/compiler/src/util';


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

  store!: Store;
  id: any;
  arr: any = { itemId: 0, itemName: '', itemPrice: 0, count: 0, value: 0 };
  //order
  numcount?: number;
  itemarr: number[] = [];

  //voucher
  couponId?: number;
  client: any;
  clientid?: number;
  voucherkey: any;
  arraylist: number[] = [];
  speciall: any = "non";
  //form inputs

  Discount: any = 0;
  public msg = false;
  public msg2 = false;
  public ordermsg = false;



  ordersub: OrderSubmitData | undefined;


  itemList: OrderItem[] = [];


  //occardion works 
  panelOpenState = false;


  onChange(radio: MatRadioChange, panel: MatExpansionPanel) {
    panel.open();
  }


  subtotalPrice = 0;
  VoucherDiscount = 0;
  DeliverFees = 0;
  totalPrice = 0;
  sub: any;
  storeid!: any;
  secondAddressFormGroup!: FormGroup;
  btnDisabled = true;

  clientAddress: any = {

    clientAddressMobileNumber: '',
    clientAddressLandLine: 0,
    clientAddressAddressTitle: "string",
    clientAddressStreet: '',
    clientAddressBuilding: 0,
    clientAddressFloor: 0,
    clientAddressApartmentNumber: 0,
    clientAddressTypeId: 1,
    CityName: "",
    clientId: 0,
    RegionName: "",
    clientAddressOptionalDirections: ''
  };

  Address: ClientAddress[] = [];


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

    private AddressesService: AddressesService,
    public fb: FormBuilder

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
      this.btnDisabled = true;
      console.log("Sorry, Your Address Out Store Zone !");
      // Swal.fire({
      //   icon: 'error',
      //   title: 'OutZone...',
      //   text: 'Sorry, Your Address Out Store Zone !', });
      console.log(this.centerLatitude, this.centerLongitude);
      this._googlemapservice.getstoreMenu(this.id, this.centerLatitude, this.centerLongitude).subscribe(
        _res => {
          console.log("vvvv", _res);
          if (_res[0].status == 200) {
            this.btnDisabled = false;
            console.log("Good, Your Address In Store Zone !");

          }
        }
      )
    });
  }


  closeModal() { this.modalService.hide(); };
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
    this.reactiveForm();
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
    this.client = JSON.parse(sessionStorage.client);
    console.log('el client bta3na', this.client);
    this.clientid = this.client.clientId;
    console.log("this.clientid", this.clientid);

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

    this.clientAddress.clientId = this.clientid;


    //get address
    this.AddressesService.getALLAddresses().subscribe(
      (data) => {
        let parsdata = JSON.stringify(data);
        let p = JSON.parse(parsdata);
        console.log("____data______", p[0]);
        for (let i = 0; i < p.length; i++) {

          this.Address.push(p[i]);

        }
        //console.log("ooooo", this.Address);
      }
    );


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
      { location: { lat: latitude, lng: longitude } }, (results, status) => {
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
    )
  }

  CheckAddressInZone() {
    this._googlemapservice.getstoreMenu(this.storeid, this.latitude, this.longitude).subscribe(
      _res => {
        console.log("vvvv", _res);
        if (_res[0].status == 200) {
          this.btnDisabled = false;
          console.log("Good, Your Address In Store Zone !");
        } else {
          this.btnDisabled = true;
          console.log("Sorry, Your Address Out Store Zone !");
          Swal.fire({
            icon: 'error',
            title: 'OutZone...',
            text: 'Sorry, Your Address Out Store Zone !',
          })
        }
      }
    )
  }

  reactiveForm() {
    this.secondAddressFormGroup = this.fb.group({

      mobileNumber: ['', [Validators.required]],
      city: ['', [Validators.required]],
      Region: ['', [Validators.required]],
      streetName: ['', [Validators.required]],
      buildingNo: ['', [Validators.required]],
      floorNo: ['', [Validators.required]],
      apartmentNo: ['', [Validators.required]],

    })
  }

  voucher() {
    this.msg = false;
    this.msg2 = false;
    this.voucherservice.GetVoucher(this.voucherkey, this.itemarr, this.clientid).subscribe((data) => {

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
        clientId: this.clientid,
        storeId: this.id,
        isDelivered: 0,

      },
      orderItemsList: this.itemList

    }
    this.ordermsg = false;
    console.log(this.ordersub);
    this.voucherservice.postOrder(this.ordersub).subscribe((data) => {

      console.log(data);


    },
      (e) => {
        console.log(e.status);
        if (e.status == 200) { this._router.navigate(['/Thankyou']); }
        this.ordermsg = true;
      }
    );

  }





  submitAddress() {
    // console.log(this.reactiveForm.value)
  }


  getClientAddress(address: ClientAddress) {
    address = this.clientAddress;
    console.log("addreeeeeeee", address);
    this.AddressesService.addspicalAddress(address).subscribe(
      (res) => {
        console.log("Address Result: ", res);
        Swal.fire({
          icon: 'success',
          title: 'success...',
          text: 'Greate, Your adress is added !',
        });
        this.modalService.hide();

      }
    )
  }


};

