import { Router } from '@angular/router';
import { StoretypeService } from './../../../Services/Stores/Storetype.service';
import { GoogleMapsComponent } from './../../google-maps/google-maps.component';
import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NavbarService } from 'src/app/Services/Home/navbar.service';


interface Coordinates {
  address: string,
  latitude: string
  longitude: string,
}

@Component({
  selector: 'app-homepage',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomepageComponent implements OnInit {

  coordinates: Coordinates;

  bsModalRef?: BsModalRef;
  loading!: false;
  title: string = 'AGM project';
  latitude!: number;
  longitude!: number;
  zoom!: number;
  address!: string;
  private geoCoder!: google.maps.Geocoder;

  @ViewChild('search')
  public searchElementRef!: ElementRef;

  @ViewChild('pop')
  public LocationsearchElementRef!: ElementRef;

  currentLoc: string | undefined;

  txtValue: string | undefined;
  mapMarkactive = true;
  closeMarkactive = false;

  StoreTypes: any = [];

  constructor(
    // private modalService: NgbModal,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private modalService: BsModalService,
    private toolTipModule: TooltipModule,
    private storeTypeService: StoretypeService,
    private _router: Router,
    public nav: NavbarService
  ) {
    this.coordinates = {} as Coordinates;
  }

  onTextChange(value: string) {

    this.txtValue = value;
    if (this.txtValue != '') {
      this.mapMarkactive = false;
      this.closeMarkactive = true;
      // this.mapMarkactive = false;
      //this.message="Textbox is empty !!!";
    } else {
      this.mapMarkactive = true;
    }

  }

  clearInputControl() {
    this.searchElementRef.nativeElement.value = ' ';
    this.closeMarkactive = false;
    this.mapMarkactive = true;
  }

  config = {
    animated: true,
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: true,
  };
  openGoogleMapsModal() {

    this.bsModalRef = this.modalService.show(GoogleMapsComponent, this.config);

    // this.bsModalRef.componentInstance.fromParent = data;
    // this.bsModalRef.result.then((result: Coordinates) => {
    //   this.coordinates = result;
    // }, () => {
    // });
  };

  openGoogleMapsModalOnClick() {
    this.bsModalRef = this.modalService.show(GoogleMapsComponent, this.config);
  }

  ngOnInit() {
    this.nav.show();
    this.storeTypeService.getStoreTypes().subscribe(
      type => {
        console.log(type);
        this.StoreTypes = type;
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

  public getAllStoreIn(event: any, type: any) {
    this.storeTypeService.getStoreTypeById(type.storeTypeId).subscribe(
      res => {
        console.log(res);
        // this._router.navigate(['/all-resturants/', type.storeTypeName])
        this._router.navigate(['/all-resturant'])
      }
    )
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
