import { Component, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../Models/Product';
import { StoreprofileService } from '../../../Services/Stores/store-profile.service';
import { CartServiceService } from '../../../Services/cart-service.service';

@Component({
  selector: 'app-resturant-menu',
  templateUrl: './resturant-menu.component.html',
  styleUrls: ['./resturant-menu.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ResturantMenuComponent implements OnInit {
  panelOpenState = false;
  cartItems: Array<any> = [];
  constructor(private _Activatedroute: ActivatedRoute,
    private cartServ: CartServiceService,

    private _StoreprofileService: StoreprofileService) { }
  sub: any;
  _store: any;
  id: any;
  display: boolean = false;
  displayimg: boolean = true;
  menu: any;
  _item !: Product;
  myitem: Product[] = [
    { itemId: 1, itemName: 'item 1', itemPrice: 1, discount: 5 },
    { itemId: 2, itemName: 'item 2', itemPrice: 2, discount: 5 },
    { itemId: 3, itemName: 'item 3', itemPrice: 3, discount: 4 },
  ];
  cart!: Product;
  ngOnInit() {
    this.getCartItems();
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
      }
    )

    this._StoreprofileService.getmenu(this.menu).subscribe(
      item => {
        console.log(item);
        this._item = item;
      }
    )

  }
  itemincart !: Product;
  onpress(cartitem: Product) {
    this.display = true;
    // this.displayimg = ! this.displayimg;
    this.itemincart = cartitem;
    this.cartServ.addProduct(cartitem);
    this.getCartItems();
    console.log(this.itemincart);
  }

  //  get all cart items
  getCartItems() {
    this.cartItems = this.cartServ.getProducts()
  }

  removeItem(id: any){
    this.cartServ.deleteProduct(id);
    this.getCartItems()
  }
}
