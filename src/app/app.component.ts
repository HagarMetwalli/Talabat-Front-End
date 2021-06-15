import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Talabat';
  constructor(private router:Router){

  }
  showOrderReview(id ?: number){
    this.router.navigate(['order-review/',id]);
  }
  showOrderReview2(id ?: number){
    this.router.navigate(['review-orderitems/',id]);
  }
}
