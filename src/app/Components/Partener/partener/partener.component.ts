import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { NavbarService } from 'src/app/Services/Home/navbar.service';

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

  constructor(private _formBuilder: FormBuilder, public nav: NavbarService) { }

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
