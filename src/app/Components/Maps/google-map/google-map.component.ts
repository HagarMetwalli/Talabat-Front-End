import { GooglemapService } from './../../../Services/Map/googlemap.service';
// import { StoresInAreaComponent } from './../../Store/stores-in-area/stores-in-area.component';
import { Component, Input, OnInit, Output } from '@angular/core';
import { Stores } from '../../../Models/Store/Store'; 
import { Router } from '@angular/router';
import { ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader,LatLngLiteral } from '@agm/core';

// import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BsModalService ,BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements OnInit {

  title: string = 'AGM project';
  latitude!: number;
  longitude!: number;
  zoom!: number;
  address!: string;
  private geoCoder!: google.maps.Geocoder;

  bsmodalRef?: BsModalRef;

  @ViewChild('search')
  public searchElementRef!: ElementRef;

  @Input() fromParent: any;

  config = {
    animated: true,
    backdrop: 'static'
  };

  btnText = 'Sorry, we don deliver here';
  btnDisabled = true;
  loading = false;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    // public activeModal: NgbActiveModal
    private modalService: BsModalService,
    private _googlemapservice:GooglemapService,
    private router :Router,
  ) { }

  centerLatitude = this.latitude;
  centerLongitude = this.longitude;

  // initialZoom = 5;

  public centerChanged(coords: LatLngLiteral) {
    this.centerLatitude = coords.lat;
    this.centerLongitude = coords.lng;
  }

  public mapReady(map: { addListener: (arg0: string, arg1: () => void) => void; }) {
  map.addListener("dragend", () => {
	  this.loading = true
    console.log(this.centerLatitude, this.centerLongitude);
	  this.loading = false;
    });
  }

  closeModal() {
    this.modalService.hide();
   };


   ngOnInit() {
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
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
   }

  // Get Current Location Coordinates
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
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      // console.log(results);
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

    });
  }

  @Output() stores : Stores[] = [];

  GetAllNearStores(){

    this._googlemapservice.getstores(this.latitude, this.longitude).subscribe(
      _stores => {

        console.log("<<<<<",_stores);
        this.stores = _stores;
        console.log(">>>>>",this.stores);
        
        this.btnDisabled = false;
        this.btnText = 'Deliver here';
        this.router.navigate(['/RestInArea', this.stores]);

  })

}

}
