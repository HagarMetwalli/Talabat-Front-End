import { Component, OnInit, Inject, HostListener } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { NavbarService } from 'src/app/Services/Home/navbar.service';
import { DOCUMENT } from '@angular/common';

declare var OnNextClick: any;
// declare var Onload: any;
declare var OnPrevious: any;

@Component({
  selector: 'app-partener',
  templateUrl: './partener.component.html',
  styleUrls: ['./partener.component.css']
})
export class PartenerComponent implements OnInit {
  isLinear = true;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;

  windowScrolled!: boolean;

  constructor(
    private _formBuilder: FormBuilder,
    public nav: NavbarService,
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
    this.nav.hide();

    this.firstFormGroup = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      emailAddress: ['', Validators.required],

    });
    this.secondFormGroup = this._formBuilder.group({
      storeName: ['', Validators.required],
      numBranchNo: ['', Validators.required],
      contacts: ['', Validators.required],
      storeAddress: ['', Validators.required],

    });

  }
    submit(){
      console.log(this.firstFormGroup.value);
      console.log(this.secondFormGroup.value);
  }
}
