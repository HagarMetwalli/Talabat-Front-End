import { Router } from '@angular/router';
import { GooglemapService } from '../../Services/google-map.service';
import { Component, Input, OnInit, Output } from '@angular/core';
import { ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { LatLngLiteral } from '@agm/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Store } from './../../Models/Store';


@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.css']
})
export class GoogleMapsComponent implements OnInit {
  title: string = 'AGM project';
  latitude: number = 30.0444;
  longitude: number = 31.2357;
  zoom!: number;
  address !: string;
  private geoCoder !: google.maps.Geocoder;

  bsmodalRef?: BsModalRef;

  @ViewChild('search')
  public searchElementRef!: ElementRef;

  @Input() fromParent: any;

  config = {
    animated: true,
    backdrop: 'static'
  };

  btnText = "Sorry, we don't deliver here";
  btnDisabled = true;
  loading = false;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    // public activeModal: NgbActiveModal
    private modalService: BsModalService,
    private _googlemapservice: GooglemapService,
    private router: Router,


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
      this.loading = true;
      this.btnDisabled=true;
      this.btnText = "Sorry, we don't deliver here";
      console.log(this.centerLatitude, this.centerLongitude);
      //-----------------------------------------------------
       this._googlemapservice.getstores(this.centerLatitude, this.centerLongitude).subscribe(

         _stores => {
          console.log("the stut", _stores[0].status);
         if(_stores[0].status==200)
          {
            //console.log("EEE");
            this.loading = false;
            this.btnDisabled = false;
            this.btnText = 'Deliver here';
          }

           

         })
    });
  }
  // this.loading = false;

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

  // markerDragEnd($event: any) {
  //   console.log($event);
  //   this.latitude = $event.coords.lat;
  //   this.longitude = $event.coords.lng;
  //   this.getAddress(this.latitude, this.longitude);
  // }

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

  @Output() stores: Store[] = [];

  GetAllNearStores() {

    this._googlemapservice.getstores(this.latitude,this.longitude).subscribe(
      _stores => {
        console.log("<<<<<", _stores);
        this.stores = _stores;
        console.log(">>>>>", this.stores);

        this.btnDisabled = false;
        this.btnText = 'Deliver here';
        this.router.navigate(['/RestInArea/',this.centerLatitude,this.centerLongitude]);
        this.modalService.hide();

      })

  }
}
