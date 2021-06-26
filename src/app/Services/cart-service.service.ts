import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { Product } from '../Models/Product';

@Injectable({
  providedIn: 'root',
})
export class CartServiceService {

  totalPrice = 0;

  constructor(private locals: LocalStorageService) {
    this.calcTotals();
  }

  clearWishList() {
    this.locals.store('cart', JSON.stringify([]));
  }
  addProduct(product: Product) {
    product.count = 1;
    product.value = product.itemPrice;
    if (this.locals.retrieve('cart')) {
      const arr: Array<any> = JSON.parse(this.locals.retrieve('cart'));
      if (arr.find(e => e.itemId === product.itemId)) {
        alert('product is already exited')
        return;
      }

      arr.push({itemId:product.itemId,itemName:product.itemName,itemPrice:product.itemPrice,value:product.value,count:product.count});

      this.locals.store('cart', JSON.stringify(arr));
    } else {
      const arr = [];
      arr.push({itemId:product.itemId,itemName:product.itemName,itemPrice:product.itemPrice,value:product.value,count:product.count});
      this.locals.store('cart', JSON.stringify(arr));
    }
  }

  isInCart(product_id: any) {
    const arr: Array<any> = JSON.parse(this.locals.retrieve('cart'));
    console.log(arr.findIndex((e) => e.itemId === product_id) === -1);
    return arr.findIndex((e) => e.itemId === product_id) === -1 ? false : true;
  }

  deleteProduct(itemId: number) {
    if (this.locals.retrieve('cart')) {
      const arr: Array<any> = JSON.parse(this.locals.retrieve('cart'));
      const index = arr.find((e) => e.itemId == itemId);
      if (index != undefined) {
        arr.splice(index, 1);
      }
      this.locals.store('cart', JSON.stringify(arr));
    }
    this.calcTotals();
  }

  updateProduct(product: Product) {
    if (this.locals.retrieve('cart')) {
      const arr: Array<any> = JSON.parse(this.locals.retrieve('cart'));
      const index = arr.findIndex((e) => e.itemId == product.itemId);
      if (index != -1) {
        arr[index] = product;
      }
      this.locals.store('cart', JSON.stringify(arr));

      this.calcTotals();
    }
  }

  calcTotals() {

    this.totalPrice = 0;
    if (this.locals.retrieve('cart')) {
      const arr: Array<Product> = JSON.parse(this.locals.retrieve('cart'));

      arr.map(e => {

        this.totalPrice += (e.itemPrice! * e.count!) || 0;

      })


    }
  }

  getProducts(): Array<any> {
    if (this.locals.retrieve('cart')) {
      const arr: Array<any> = JSON.parse(this.locals.retrieve('cart'));
      this.calcTotals();
      return arr;
    } else {
      return [];
    }
  }
}
