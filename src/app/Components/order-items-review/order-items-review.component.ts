import { OrderItemReview } from './../../Models/OrderItemReview';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/Services/order.service';

interface IorderItemReview {
  id: number,
  name: string;
  rating: number;

}
@Component({
  selector: 'app-order-items-review',
  templateUrl: './order-items-review.component.html',
  styleUrls: ['./order-items-review.component.css']
})
export class OrderItemsReviewComponent implements OnInit {

  constructor(
    private _Activatedroute: ActivatedRoute,
    private _router: Router,
    private _OrderService: OrderService) {
  }
  sub: any;
  orderId !: any;
  orderItemReview: OrderItemReview = new OrderItemReview(0, 0, 0);
  orderItemReviewId !: any;
  comment: string = "";
  ratingClicked !: number;
  itemIdRatingClicked !: string;
  items!: any[];
  i!: number;
  getOrder() {
    return this._OrderService.getOrder(this.orderId).subscribe((data: any) => {
      this.items = data;
      console.log("ccc", this.items);
      this.display();
    })
  }
  itemsReview: IorderItemReview[] = [];

  ngOnInit(): void {
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      console.log(params);
      this.orderId = params.get('orderId');
      this.orderItemReviewId = params.get('orderReviewId');
      this.orderId = + this.orderId;
      this.orderItemReviewId = + this.orderItemReviewId;
      this.getOrder();
    })
  }

  display() {


    for (this.i = 0; this.i < this.items.length; this.i++) {
      var row = { "id": this.i + 1, "name": this.items[this.i]["itemName"], "rating": 0 }
      console.log("row", row);
      this.itemsReview.push(row);
    }
    console.log("nnnn", this.itemsReview);
  }

  ratingComponentClick(clickObj: any): void {
    const _itemReview = this.itemsReview.find(((i: any) => i.id === clickObj.itemId));
    if (!!_itemReview) {
      _itemReview.rating = clickObj.rating;
      this.ratingClicked = clickObj.rating;
    }
  }
  onSubmit() {
    for (this.i = 0; this.i < this.items.length; this.i++) {
      this.orderItemReview["itemId"] = this.items[this.i]["itemId"];
      this.orderItemReview["orderReviewId"] = + this.orderItemReviewId;
      this.orderItemReview["rate"] = this.itemsReview[this.i]["rating"];
      this._OrderService.addOrderItemsReview(this.orderItemReview).subscribe();
      this._router.navigate(['Thankyou']);
    };
  }

}
