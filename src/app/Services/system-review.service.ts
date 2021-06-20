import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SystemReview } from '../Models/Review/SystemReview';
@Injectable({
  providedIn: 'root'
})
export class SystemReviewService {

  constructor(private http: HttpClient) { }



  getAll() {
    return this.http.get<SystemReview[]>("https://localhost:44311/api/SystemReviews")
  }

  getbyid(id: number) {

    return this.http.get<SystemReview>("https://localhost:44311/api/SystemReviews/" + id)
  }
  add(SystemReview: SystemReview) {
    return this.http.post<SystemReview>("https://localhost:44311/api/SystemReviews", SystemReview)
  }

  edit(id: Number, data: any) {
    this.http
      .post<SystemReview>("https://localhost:44311/api/SystemReviews" + id, data)
      .subscribe((a) => {
        console.log(a);

      });
  }

}
