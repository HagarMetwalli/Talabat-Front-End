
import { LocalStorageService } from 'ngx-webstorage';
import { Product } from '../../Models/Product';

import { MapsAPILoader, LatLngLiteral } from '@agm/core';
import { Component, ElementRef, NgZone, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { GooglemapService } from 'src/app/Services/google-map.service';
import { NavbarService } from 'src/app/Services/Home/navbar.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AddressesService } from 'src/app/Services/Profile/Addresses.service';
import Swal from 'sweetalert2';
import { ClientAddress } from 'src/app/Models/ClientAddress';

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
  sub:any;
  storeid!: any;
  secondAddressFormGroup!: FormGroup;
  btnDisabled = true;

  clientAddress: ClientAddress = {
    clientAddressId: 0,
    clientAddressMobileNumber: '',
    clientAddressLandLine: 0,
    clientAddressAddressTitle: '',
    clientAddressStreet: '',
    clientAddressBuilding: 0,
    clientAddressFloor: 0,
    clientAddressApartmentNumber: 0,
    clientAddressTypeId: 0,
    cityId: 0,
    clientId: 0,
    regionId: 0,
    clientAddressOptionalDirections: ''
  };

  constructor(
    private locals: LocalStorageService,
    private _Activatedroute: ActivatedRoute,
    private _router: Router,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private modalService: BsModalService,
    private _googlemapservice: GooglemapService,
    public nav: NavbarService,
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
      console.log(this.centerLatitude, this.centerLongitude);
    });
  }


  closeModal() { this.modalService.hide();};
  config = {
    animated: true,
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: true,
  };

  openAddressModalOnClick() {
    this.bsModalRef = this.modalService.show(this.templateRef, this.config)
  }

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

    this.sub = this._Activatedroute.paramMap.subscribe((params) => {
      console.log(params);
      this.storeid = params.get('storeid');
    });

  }

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
      { location: { lat: latitude, lng: longitude } },(results, status) => {
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
    )}

  CheckAddressInZone() {
    this._googlemapservice.getstoreMenu(this.storeid, this.latitude, this.longitude).subscribe(
      _res => {
        if(_res[0].status==200){
          this.btnDisabled = false;
          console.log("Good, Your Address In Store Zone !");
        }else{
          this.btnDisabled = true;
          console.log("Sorry, Your Address Out Store Zone !");
          Swal.fire({
            icon: 'error',
            title: 'OutZone...',
            text: 'Sorry, Your Address Out Store Zone !',
        })
      }
    }
  )}

  reactiveForm() {
    this.secondAddressFormGroup = this.fb.group({

      mobileNumber: ['', [Validators.required]],
      city: ['', [Validators.required]],
      streetName: ['', [Validators.required]],
      buildingNo: ['', [Validators.required]],
      floorNo: ['', [Validators.required]],
      apartmentNo: ['', [Validators.required]],

    })
}

  submitForm() {
    // console.log(this.reactiveForm.value)
  }


  getClientAddress(address: ClientAddress ){
    address= this.clientAddress;
    this.AddressesService.addAddress(address).subscribe(
      (res) => {
        console.log("Address Result: ", res);
      }
    )}


}
