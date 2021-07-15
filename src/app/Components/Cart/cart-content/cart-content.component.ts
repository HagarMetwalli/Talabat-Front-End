import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../../Models/Product';
import { CartServiceService } from '../../../Services/cart-service.service';

@Component({
  selector: 'app-cart-content',
  templateUrl: './cart-content.component.html',
  styleUrls: ['./cart-content.component.css'],
})
export class CartContentComponent implements OnInit {
  @Input('product') productItem!: Product;
  @Output('remove') remove: EventEmitter<any> = new EventEmitter();



  constructor(private cartServ: CartServiceService) { }
  ngOnInit(): void {
  }

  changecount(type: String) {
    if (type === 'ADD') {
      this.productItem.count!++;
      this.productItem.value =
        this.productItem.itemPrice! * this.productItem.count!;
    } else {
      if (!(this.productItem?.count! <= 0)) {
        this.productItem.count!--;
        this.productItem.value =
          this.productItem.value! - this.productItem.itemPrice!;
      }
    }
    this.cartServ.updateProduct(this.productItem);
  }


  removeitem(){

    this.remove.emit(this.productItem.itemId);
  }
 
}
