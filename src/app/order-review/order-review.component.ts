import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgxFeedbackService, FeedbackData } from 'ngx-feedback';

interface ICompany {
  id: number;
  rating: number;
  contact: string;
  company: string;
}

@Component({
  selector: 'app-order-review',
  templateUrl: './order-review.component.html',
  styleUrls: ['./order-review.component.css']
})
export class OrderReviewComponent  {

  ratingClicked !: number;
  itemIdRatingClicked !: string;
  items: ICompany[] = [
    { 'id': 0, 'rating': 0, 'contact': 'Dennis Phillips', 'company': 'PROFLEX' },
    { 'id': 1, 'rating': 0, 'contact': 'Morgan Mccarthy', 'company': 'CENTREXIN' },
    { 'id': 2, 'rating': 0, 'contact': 'Brady Craft', 'company': 'JIMBIES' },
    { 'id': 3, 'rating': 0, 'contact': 'Alvarado Roman', 'company': 'TERRAGO' },
    { 'id': 4, 'rating': 0, 'contact': 'Clark Daugherty', 'company': 'ISOTRONIC' }
  ];
  ratingComponentClick(clickObj: any): void {
    const item = this.items.find(((i: any) => i.id === clickObj.itemId));
    if (!!item) {
      item.rating = clickObj.rating;
      this.ratingClicked = clickObj.rating;
      this.itemIdRatingClicked = item.company;
    }

  }
  // onSubmit(){
  //   console.log(this.comment);
  // }
  
}

