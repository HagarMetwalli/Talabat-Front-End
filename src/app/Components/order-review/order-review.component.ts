import { OrderReview } from './../../Models/OrderReview';
import { OrderService } from '../../Services/order.service';
import { Client } from '../../Models/Client';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

interface IQuest {
  id: number,
  Quest: string;
  rating: number;

}

@Component({
  selector: 'app-order-review',
  templateUrl: './order-review.component.html',
  styleUrls: ['./order-review.component.css']
})
export class OrderReviewComponent implements OnInit {

  flag: boolean = true;
  ratingClicked !: number;
  itemIdRatingClicked !: string;
  _client: Client = {
    clientFname: "Hagar",
    clientLname: "Metwalli",
    clientEmail: "Hagarmetwalli011@gmail.com",
    clientDateOfBirth: 8 / 3 / 1997,
    clientPassword: "Elhamd@@@@Llh83",
    clientGenderIsMale: 0,
    clientNewsletterSubscribe: 1,
    clientSmsSubscribe: 1,
    clientId: 1
  };

  client !: Client;

  orderReview: OrderReview = new OrderReview(0, 0, 0, 0, 0, "", 0, 0);

  comment: string = "";
  sub: any;
  orderId: any;
  orderReviewId: any;
  constructor(
    private _Activatedroute: ActivatedRoute,
    private _router: Router,
    private _OrderService: OrderService) {
    const jsonData = JSON.stringify(this._client)
    localStorage.setItem('Client', jsonData)
  }
  ngOnInit(): void {
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      console.log(params);
      this.orderId = params.get('id');
      this.client = JSON.parse(sessionStorage.client);
      // this.client = JSON.parse(localStorage.getItem('Client') || "");
      console.log(this.client.clientLname);
      //this.getOrder(1) ;
    })
  }
  items: IQuest[] = [
    { "id": 1, "Quest": "OrderPackaging", "rating": 0 },
    { "id": 2, "Quest": "ValueForMoney", "rating": 0 },
    { "id": 3, "Quest": "DeliveryTime", "rating": 0 },
    { "id": 4, "Quest": "QualityOfFood", "rating": 0 },
  ];


  ratingComponentClick(clickObj: any): void {
    const _orderReview = this.items.find(((i: any) => i.id === clickObj.itemId));
    if (!!_orderReview) {
      _orderReview.rating = clickObj.rating;
      this.ratingClicked = clickObj.rating;
    }

  }
  onSubmit() {

    this.orderReview["clientId"] = this.client.clientId;
    this.orderReview["orderPackaging"] = this.items[0]["rating"];
    this.orderReview["valueForMoney"] = this.items[1]["rating"];
    this.orderReview["deliveryTime"] = this.items[2]["rating"];
    this.orderReview["orderId"] = +this.orderId;
    this.orderReview["orderReviewComment"] = this.comment;
    this.orderReview["qualityOfFood"] = this.items[3]["rating"];
    this.orderReview["orderReviewId"] = 0;
    // this.orderReview["IsDelivered"] = 1;
    this._OrderService.addOrderReview(this.orderReview).subscribe(
      (orderReview: OrderReview) => {
        this.orderReviewId = orderReview.orderReviewId;
        console.log("orderReviewId", this.orderReviewId);
        this.flag = false;
      }

    );
    this.items.forEach(element => {
      element.rating = 0
    });
    this.comment = "";

  }

}

