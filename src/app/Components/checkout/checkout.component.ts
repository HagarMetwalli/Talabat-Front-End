import { LocalStorageService } from 'ngx-webstorage';
import { Product } from '../../Models/Product';

import { MapsAPILoader } from '@agm/core';
import {
  Component,
  ElementRef,
  NgZone,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { GooglemapService } from 'src/app/Services/google-map.service';
import { Order } from 'src/app/Models/Order';

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

  @ViewChild('template')
  public templateRef!: TemplateRef<any>;
  subtotalPrice = 0;
  VoucherDiscount = 0;
  DeliverFees = 0;
  totalPrice = 0;

  //form inputs
  // order: Order = {
  //   //  orderId: 0,
  //   orderCost: 0,
  //   orderSpecialRequest: '',
  //   orderTime: '',
  //   addressDetails: '',
  //   clientId: 0,
  //   storeId: 0,
  //   //  isDelivered:   ,
  //   //  deliveryStatusInString: string = 'Delivered'
  // };
  constructor(
    private locals: LocalStorageService,
    private _Activatedroute: ActivatedRoute,
    private _router: Router,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private modalService: BsModalService,
    private _googlemapservice: GooglemapService
  ) {
    this.coordinates = {} as Coordinates;
    // this.calcTotals();
  }
  //calculate order
  // calcTotals() {
  //   this.VoucherDiscount = 0;
  //   this.subtotalPrice = 0;
  //   this.DeliverFees = 0;
  //   this.totalPrice = 0;
  //   if (this.locals.retrieve('cart')) {
  //     const arr: Array<Product> = JSON.parse(this.locals.retrieve('cart'));
  //     arr.map((e) => {
  //       this.subtotalPrice += e.itemPrice! * e.count!;
  //       this.VoucherDiscount += e.discount || 0;
  //       this.totalPrice += this.subtotalPrice + 19 || 0;
  //     });
  //   }
  // }
  //get items in  muenu from local storage
  // getProducts(): Array<any> {
  //   if (this.locals.retrieve('cart')) {
  //     const arr: Array<any> = JSON.parse(this.locals.retrieve('cart'));
  //     this.calcTotals();
  //     return arr;
  //   } else {
  //     return [];
  //   }
  // }

  onfig = {
    animated: true,
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: true,
  };

  openAddressModalOnClick() {
    this.bsModalRef = this.modalService.show(this.templateRef);
  }

  ngOnInit(): void {
    this.bsModalRef = this.modalService.show(this.templateRef);

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
}
