// import { StoreTypes } from './../../../Models/Store/StoreType';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { GoogleMapComponent } from './../../Maps/google-map/google-map.component';
import { Component, OnInit } from '@angular/core';
import { StoreTypesService } from '../../../Services/Stores/store-types.service';
import { ViewChild, ElementRef, NgZone, ViewEncapsulation } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import {FormsModule} from '@angular/forms';

interface Coordinates {
  address: string,
  latitude: string
  longitude: string,
}
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  coordinates: Coordinates;

  bsModalRef?: BsModalRef;

  title: string = 'AGM project';
  latitude!: number;
  longitude!: number;
  zoom!: number;
  address!: string;
  private geoCoder!: google.maps.Geocoder;

  @ViewChild('search')
  public searchElementRef!: ElementRef;

  @ViewChild('pop') public staticModal : TooltipModule | undefined;

  currentLoc: string | undefined;

  txtValue: string | undefined;
  mapMarkactive = true;
  closeMarkactive = false;
  _StoreTypes !: any;
  constructor(
    
    private mapsAPILoader: MapsAPILoader,
    private _StoreTypesService : StoreTypesService ,
    private ngZone: NgZone,
    private modalService: BsModalService
    ) {
      this.coordinates = {} as Coordinates;
     }
     onTextChange(value: string)
    {
      this.txtValue = value;
      if(this.txtValue != '')
      {
        this.closeMarkactive = true;
        //this.message="Textbox is empty !!!";
      }
        this.mapMarkactive = true;
    } 

    clearInputControl() {
      this.searchElementRef.nativeElement.value = ' ';
    }
   
    config = {
      animated: true,
      keyboard: false,
      backdrop: true,
      ignoreBackdropClick: true,
    };
    openGoogleMapsModal() {
      
    this.bsModalRef =this.modalService.show(GoogleMapComponent, this.config);

    // this.bsModalRef.componentInstance.fromParent = data;
    // this.bsModalRef.result.then((result: Coordinates) => {
    //   this.coordinates = result;
    // }, () => {
    // });
  };

  openGoogleMapsModalOnClick(){
    this.bsModalRef =this.modalService.show(GoogleMapComponent, this.config);
  }

  ngOnInit(): void {
    this._StoreTypesService.getstoreTypes().subscribe(
      res => {
        console.log("result",res);
        this._StoreTypes = res;
      }
    )
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
        console.log('Geocoder failed due to: ' + status)
        // window.alert('Geocoder failed due to: ' + status);
      }

    });
  }
}
