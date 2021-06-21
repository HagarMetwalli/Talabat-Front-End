import { Component, OnInit } from '@angular/core';
import { render } from 'creditcardpayments/creditCardPayments';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent  {

  value:number=1;
  constructor() { 
    render(
      {
      id:"#paymentbottons",
      currency:"USD",
      value:`${this.value}`,
      onApprove:(details)=>{
        alert("Payment success");
        console.log("ok");
      }
     }
  )
  }
  // paymentbottons

}
