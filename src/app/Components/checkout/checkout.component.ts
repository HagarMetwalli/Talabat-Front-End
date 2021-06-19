import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { Product } from '../../Models/Product';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  subtotalPrice = 0;
  VoucherDiscount = 0;
  DeliverFees = 0;
  totalPrice = 0;
  constructor(private locals: LocalStorageService) {
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
  ngOnInit(): void {}
}
