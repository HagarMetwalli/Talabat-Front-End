  
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import { Paymentcard } from './../../Models/PaymentCard';

@Component({
  selector: 'app-payment-card',
  templateUrl: './payment-card.component.html',
  styleUrls: ['./payment-card.component.css']
})
export class PaymentCardComponent implements OnInit {

  paymentForm!: FormGroup;
  displayMessage!: string;
  paymentcard!:Paymentcard;
  constructor( private formBuilder: FormBuilder) { }
  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.paymentForm = this.formBuilder.group({
      nameOnCard: ['', [Validators.required,Validators.minLength(1),Validators.pattern('^[A-Za-z][A-Za-z -]*$')]],
      cardNumber: ['', [Validators.required,Validators.minLength(16),Validators.min(1111111111111111),Validators.max(9999999999999999)]],
      expirationMonth: ['', [Validators.required,Validators.minLength(1),Validators.maxLength(2),Validators.min(1),Validators.max(12)]],
      expirationYear: ['', [Validators.required,Validators.minLength(4),Validators.maxLength(4),Validators.min(1111),Validators.max(9999)]],
      cardCVVNumber: ['', [Validators.required,Validators.minLength(3),Validators.maxLength(3),Validators.min(111),Validators.max(999)]]
    });
  }

 // convenience getter for easy access to form fields
 get f() { return this.paymentForm.controls; }

 onSubmit() {
  this.submitForm();
  }

  submitForm() {
    /* Change the display message on button click / submit form */
  // stop here if form is invalid
  if (this.paymentForm.invalid) {
    this.displayMessage = "Payment Failed!";
      return;
  }
    this.displayMessage = "Payment Successful!";
    console.log('paymentcard',
    this.f.nameOnCard.value,
    this.f.cardNumber.value,
    this.f.expirationMonth.value,
    this.f.expirationYear.value,
    this.f.cardCVVNumber.value);
    
  }


}
