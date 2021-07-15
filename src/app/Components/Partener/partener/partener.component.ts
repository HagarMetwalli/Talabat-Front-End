
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { TemPartner } from 'src/app/Models/Partner/TempPartner';
import { NavbarService } from 'src/app/Services/Home/navbar.service';
import { Router } from '@angular/router';
import { ViewChild, ElementRef, NgZone } from '@angular/core';
import { LatLngLiteral, MapsAPILoader } from '@agm/core';
import { TempPartnerService } from 'src/app/Services/Partner/temp-partner.service';

import { DOCUMENT } from '@angular/common';


declare var OnNextClick: any;
// declare var Onload: any;
declare var OnPrevious: any;

@Component({
  selector: 'app-partener',
  templateUrl: './partener.component.html',
  styleUrls: ['./partener.component.css'],
})
export class PartenerComponent implements OnInit {
  [x: string]: any;
  latitude: number = 30.0444;
  longitude: number = 31.2357;
  zoom!: number;
  address!: string;
  private geoCoder!: google.maps.Geocoder;
  @ViewChild('search')
  public searchElementRef!: ElementRef;
  isLinear = true;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  partner: TemPartner = {
    partnerFname: '',
    partnerLname: '',
    PartnerPhoneNo: 0,
    partnerEmail: '',
    partnerContactRole: '',
    StoreName: '',
    storeCountryId: 1,
    storeBranchesNo: 1,
    storeWebSite: '',
    storeAddress: '',
    storeTypeId: 1,
  };
  submitted = false;


  windowScrolled!: boolean;

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private partnerservice: TempPartnerService,
    public nav: NavbarService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    @Inject(DOCUMENT) private document: Document
  ) { }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
      this.windowScrolled = true;
    }
    else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
      this.windowScrolled = false;
    }
  }
  scrollToTop() {
    (function smoothscroll() {
      var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - (currentScroll / 8));
      }
    })();
  }


  ngOnInit(): void {
    // new Onload();
    // new OnNextClick();
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
    this.nav.hide();

    this.firstFormGroup = this._formBuilder.group({
      partnerFname: ['', Validators.required],
      partnerLname: ['', Validators.required],
      PartnerPhoneNo: ['', Validators.required],
      partnerEmail: ['', Validators.required],
      partnerContactRole: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      StoreName: ['', Validators.required],
      storeBranchesNo: ['', Validators.required],
      storeWebSite: ['', Validators.required],
      storeAddress: ['', Validators.required],
    });
  } //oninit end
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
    this.geoCoder.geocode(
      { location: { lat: latitude, lng: longitude } },
      (results, status) => {
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
      }
    );
  }
  get fieldgetfirstForm() {
    return this.firstFormGroup.controls;
  }

  get fieldgetsecondForm() {
    return this.secondFormGroup.controls;
  }
  submit() {
    console.log(this.firstFormGroup.value);
    console.log(this.secondFormGroup.value);
    (this.partnerFname = this.fieldgetfirstForm.partnerFname.value),
      (this.partnerLname = this.fieldgetfirstForm.partnerLname.value),
      (this.PartnerPhoneNo = this.fieldgetfirstForm.PartnerPhoneNo.value),
      (this.partnerEmail = this.fieldgetfirstForm.partnerEmail.value),
      (this.partnerContactRole =
        this.fieldgetfirstForm.partnerContactRole.value),
      (this.StoreName = this.fieldgetsecondForm.StoreName.value),
      (this.storeBranchesNo = this.fieldgetsecondForm.storeBranchesNo.value),
      (this.storeWebSite = this.fieldgetsecondForm.storeWebSite.value),
      (this.storeAddress = this.fieldgetsecondForm.storeAddress.value),
      console.log('partner', this.partner);
    this.partnerservice.register(this.partner).subscribe((a) => {
      console.log('subscribed', this.partner);
      this.router.navigate(['/partener-login']);
    });
  }
}
