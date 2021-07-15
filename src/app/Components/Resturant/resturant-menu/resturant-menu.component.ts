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
import { OrderService } from 'src/app/Services/order.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { LoginComponent } from 'src/app/Components/login/login.component';


@Component({
  selector: 'app-resturant-menu',
  templateUrl: './resturant-menu.component.html',
  styleUrls: ['./resturant-menu.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ResturantMenuComponent implements OnInit {
  panelOpenState = false;
  cartItems: Array<any> = [];
  //checkout guard
  click: boolean = true;
  //login modal
  bsmodalRef?: BsModalRef;


  constructor(
    private _Activatedroute: ActivatedRoute,
    private _router: Router,
    private cartServ: CartServiceService,
    public nav: NavbarService,
    private modalService: BsModalService,
    private OrderService: OrderService,
    private _StoreprofileService: StoreprofileService
  ) { }

  sub: any;

  categories: any[] = [];
  _store: Store | undefined;

  id: any;
  display: boolean = false;
  displayimg: boolean = true;
  menu: any;
  _item !: Product;
  _comment: any = [];
  _bestselling: any;

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


    this.OrderService.storecomments(this.id).subscribe(
      comment => {
        console.log(comment);
        this._comment = comment;
        console.log("_comment", this._comment);
      });

    this._StoreprofileService.gettopitem(this.id).subscribe(bestselling => {
      console.log("the best", bestselling);
      this._bestselling = bestselling;
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

  checkout(id?: number) {
    this._router.navigate(['/checkout/', id]);
  }

  // checkout guard
  loggedIn() {
    let token =
      sessionStorage.getItem('token') && localStorage.getItem('token');
    if (token != '' && token != null) {

      return true;
    } else {
      return false;
    }
  }
  //toOpenLoginModal
  openModal() {
    this.bsmodalRef = this.modalService.show(LoginComponent);
  }


};