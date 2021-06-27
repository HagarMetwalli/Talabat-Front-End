import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/Services/Home/navbar.service';
import { SystemReview } from '../../../Models/Review/SystemReview';
import { SystemReviewService } from '../../../Services/system-review.service';



@Component({
  selector: 'app-system-review',
  templateUrl: './system-review.component.html',
  styleUrls: ['./system-review.component.css']
})



export class SystemReviewComponent implements OnInit {


  public nSystemReview!: SystemReview;
  client: any;
  clientid?: number;


  constructor(private SystemReviewService: SystemReviewService, private router: Router, public nav: NavbarService) { }

  ngOnInit(): void {
    this.nav.show();
    this.client = JSON.parse(sessionStorage.client);
    console.log('el client bta3na', this.client);
    this.clientid = this.client.clientId;
    console.log("this.clientid", this.clientid);


    this.nSystemReview = {
      rateTalabatExperience: 0,
      effortMadeToOrderFood: 0,
      recommendToFriend: 0,
      systemReviewComment: "text",
      clientId: this.clientid
    };

  }

  save() {

    this.SystemReviewService.add(this.nSystemReview).subscribe(
      a => {
        console.log(this.nSystemReview);
        this.router.navigate(['/Thankyou']);
      },
      e => {
        console.log(this.nSystemReview);
        this.router.navigate(['/NotFound']);
      }


    )
  }

}
