import {
  Component,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../Models/Product';
import { StoreprofileService } from '../../../Services/Stores/store-profile.service';
import { CartServiceService } from '../../../Services/cart-service.service';

import { Router } from '@angular/router';
import { Store } from 'src/app/Models/Store';
import { NavbarService } from 'src/app/Services/Home/navbar.service';


@Component({
  selector: 'app-resturant-menu',
  templateUrl: './resturant-menu.component.html',
  styleUrls: ['./resturant-menu.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ResturantMenuComponent implements OnInit {
  panelOpenState = false;
  cartItems: Array<any> = [];
  constructor(
    private _Activatedroute: ActivatedRoute,
    private _router: Router,
    private cartServ: CartServiceService,
    public nav: NavbarService,
    private _StoreprofileService: StoreprofileService
  ) { }
  sub: any;

  categories: any[] = [];
  _store: Store | undefined;

  id: any;
  display: boolean = false;
  displayimg: boolean = true;
  menu: any;
  _item!: Product;
  myitem: Product[] = [
    { itemId: 1, itemName: 'item 1', itemPrice: 1 },
    { itemId: 2, itemName: 'item 2', itemPrice: 2 },
    { itemId: 3, itemName: 'item 3', itemPrice: 3 },
  ];
  cart!: Product;
  ngOnInit() {
    this.nav.show();
    this.getCartItems();
    this.sub = this._Activatedroute.paramMap.subscribe((params) => {
      console.log(params);
      this.id = params.get('storeid');

      this.id = + this.id;
      console.log("IIIID", params.get('storeid'));



      this._StoreprofileService.getStoreById(this.id).subscribe(
        (store: any) => {
          console.log(store);
          this._store = store || undefined;
          this.initialize();
        }
      )
    });




  }

  initialize() {
    this._StoreprofileService.getAllCategory(this._store?.storeName || '').subscribe(res => {
      this.categories = res;
    })
  }
  chooseCat(cat: string) {
    this._StoreprofileService.getItemsByCategory(this._store?.storeName || '', cat).subscribe(
      items => {
        console.log(items);
        this._item = items;
      }
    )

  }
  itemincart!: Product;
  onpress(cartitem: Product) {
    this.display = true;
    //  this.displayimg = ! this.displayimg;
    this.itemincart = cartitem;
    this.cartServ.addProduct(cartitem);
    this.getCartItems();
    console.log(this.itemincart);
  }

  //  get all cart items
  getCartItems() {
    this.cartItems = this.cartServ.getProducts();
  }

  removeItem(id: any) {
    this.cartServ.deleteProduct(id);
    this.getCartItems();
  }

}
