import { MapsAPILoader, LatLngLiteral } from '@agm/core';
import { Component, ElementRef, NgZone, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { GooglemapService } from 'src/app/Services/google-map.service';

interface Coordinates {
  address: string,
  latitude: string
  longitude: string,
}
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
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

  @ViewChild('template')
  public templateRef!: TemplateRef<any>;

  constructor(
    private _Activatedroute: ActivatedRoute,
    private _router: Router,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private modalService: BsModalService,
    private _googlemapservice: GooglemapService
    )
    {
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

  openAddressModalOnClick(){
    this.bsModalRef = this.modalService.show(this.templateRef)
  }

  ngOnInit(): void {
    this.bsModalRef = this.modalService.show(this.templateRef);

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
