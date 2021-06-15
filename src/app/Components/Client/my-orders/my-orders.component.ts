import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientAddress } from 'src/app/Models/ClientRelated/ClientAddress';
import { Item } from 'src/app/Models/ClientRelated/Item';
import { Order } from 'src/app/Models/ClientRelated/Order';
import { ProfileService } from 'src/app/Services/Profile/Profile.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  constructor(private profService: ProfileService, private router: Router) { }

  clientOrders: Order[] = [];
  orderItems: Item[] = [];

  // OrderDeliveryStatus: string = 'Delivered';

  openCancel(orderId: number, btn: HTMLButtonElement) {
    btn.click();
    // this.orderItems=  this.getOrderItems(orderId);

    this.profService.getOrderItems(orderId).subscribe(
      (result: any) => {
        console.log("OrderItems: ", result);
        console.log("AAAA: ", this.orderItems);
        this.orderItems = result;
      },
      (error) => {
        console.log("Error From API call OrderItems[]: ", error.status);
      }
    );

  }

  opeEdit(btn: HTMLButtonElement) {
    btn.click();
  }

  candelOrder(orderId: number) {
    console.log("cancel order and all its related data...");

  }

  getOrderItems(orderId: number) {
    console.log("get order items...");

    // set list of items of order that may be deleted
  }

  reload() {
    window.location.reload();
  }

  openFeedBack() {
    //do some blabla shits
  }

  ngOnInit(): void {
    this.profService.getClientOrders(1).subscribe(
      (result: any) => {
        console.log("Result: ", result);
        this.clientOrders = result;

        // this.x = this.clientOrders.forEach(element => {
        //   if (element.isDelivered == 0) {
        //     element.deliveryStatusInString = 'Not Delivered!';
        //     console.log("AAA: ", element);

        //   } else {
        //     element.deliveryStatusInString = 'Delivered!';

        //   }
        // });

      },
      (error) => {
        console.log("Error From API call: ", error.status);
      }
    );




    // TODO: Get all stores and bind store name on order details here on init.
    // TODO: Make a condition to transform all Delivery status into string to be readable!

  }

}
