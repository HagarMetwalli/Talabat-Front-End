import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { StoreprofileService } from '../../../Services/Stores/store-profile.service';
import { StoretypeService } from './../../../Services/Stores/Storetype.service';
import { GoogleMapsComponent } from './../../google-maps/google-maps.component';
import { ViewChild, ElementRef, NgZone } from '@angular/core';
import { LatLngLiteral, MapsAPILoader } from '@agm/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { GooglemapService } from 'src/app/Services/google-map.service';
import { OrderService } from 'src/app/Services/order.service';
import { ClientService } from './../../../Services/client.service';
import { OrderReview } from './../../../Models/OrderReview';
import { Commentdetails } from 'src/app/Models/commentdetails';

interface Coordinates {
  address: string,
  latitude: string
  longitude: string,
}
@Component({
  selector: 'app-store-profile',
  templateUrl: './resturant-profile.component.html',
  styleUrls: ['./resturant-profile.component.css']
})
export class ResturantProfileComponent implements OnInit {

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

  @ViewChild('pop')
  public LocationsearchElementRef!: ElementRef;

  @ViewChild('template')
  public templateRef!: TemplateRef<any>;


  currentLoc: string | undefined;

  txtValue: string | undefined;
  mapMarkactive = true;
  closeMarkactive = false;

  btnText = 'Sorry, we don deliver here';
  btnDisabled = true;
  loading = false;


  constructor(
    private _Activatedroute: ActivatedRoute,
    private _router: Router,
    private _StoreprofileService: StoreprofileService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private modalService: BsModalService,
    private toolTipModule: TooltipModule,
    private storeTypeService: StoretypeService,
    private _googlemapservice: GooglemapService,
    private OrderService :OrderService,
    private ClientService :ClientService
    )
    {
      this.coordinates = {} as Coordinates;
    }

  sub: any;
  _store: any;
  id: any;
  _comment :any=[];
  _name :any=[];
  all :Array<Commentdetails> | undefined;
  nid : any ;
  _bestselling : any;
  centerLatitude = this.latitude;
  centerLongitude = this.longitude;



  onTextChange(value: string) {

    this.txtValue = value;
    if (this.txtValue != '') {
      this.mapMarkactive = false;
      this.closeMarkactive = true;
      // this.mapMarkactive = false;
      //this.message="Textbox is empty !!!";
    }else{
    this.mapMarkactive = true;
  }

  }

  clearInputControl() {
    this.searchElementRef.nativeElement.value = ' ';
    this.closeMarkactive = false;
    this.mapMarkactive = true;
  }

  public centerChanged(coords: LatLngLiteral) {
    this.centerLatitude = coords.lat;
    this.centerLongitude = coords.lng;
  }

  public mapReady(map: { addListener: (arg0: string, arg1: () => void) => void; }) {
    map.addListener("dragend", () => {
      this.loading = true
      console.log(this.centerLatitude, this.centerLongitude);

    });
  }
  // this.loading = false;

  closeModal() {
    this.modalService.hide();
  };

  config = {
    animated: true,
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: true,
  };

  openGoogleMapsModalOnClick() {
    this.bsModalRef = this.modalService.show(this.templateRef, this.config)
  };


  ngOnInit() {

    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      console.log(params);
      this.id = params.get('storeid');
      this.id = + this.id;
      console.log("IIIID", params.get('storeid'));

    });

    this._StoreprofileService.getStoreById(this.id).subscribe(
      store => {
        console.log(store);
        this._store = store;

    });

     this.OrderService.storecomments(this.id).subscribe(
       comment=>{
         console.log(comment);
         this._comment = comment;
         console.log("_comment",this._comment);
       }); 
      
     this._StoreprofileService.gettopitem(this.id).subscribe(bestselling=>{
       console.log("the best",bestselling);
       this._bestselling = bestselling;
     });

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
        this._router.navigate(['/all-resturants/', type.storeTypeName])
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

  GetStoreMenu(id: number, storeName: string) {

    this._googlemapservice.getstoreMenu(storeName, this.latitude, this.longitude).subscribe(
      _menu => {

        console.log("<<<<<", _menu);

        this.btnDisabled = false;
        this.btnText = 'Deliver here';
        this._router.navigate(['storemenu/', id]);

      })
  }

}


