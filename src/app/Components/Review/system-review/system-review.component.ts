import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SystemReview } from '../../../Models/Review/SystemReview';
import { SystemReviewService } from '../../../Services/system-review.service';



@Component({
  selector: 'app-system-review',
  templateUrl: './system-review.component.html',
  styleUrls: ['./system-review.component.css']
})



export class SystemReviewComponent implements OnInit {

  nSystemReview: SystemReview = new SystemReview(1, 1, 1, 1, "test", 1);

  constructor(private SystemReviewService: SystemReviewService, private router: Router ) { }

  ngOnInit(): void {

  }

  save() {

    this.SystemReviewService.add(this.nSystemReview).subscribe(
      a => {
        //console.log(this.nSystemReview);
        this.router.navigate(['/Thankyou']);
      },
      e =>{
       // console.log(this.nSystemReview);
        this.router.navigate(['/NotFound']);
      }
      

    )
  }

}
