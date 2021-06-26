import { Router } from '@angular/router';
import { OrderReview } from './../Models/OrderReview';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderItemReview } from '../Models/OrderItemReview';
import { Observable } from 'rxjs';

const API ="https://localhost:44311/api/OrderReviews";
const API_Items ="https://localhost:44311/api/Orders/GetItemsInOrder";
const API_orderItemsReview ="https://localhost:44311/api/ItemReviews";
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  
  constructor(private http:HttpClient,private router:Router) {}
  
  orderId !:number;

  getOrder(id:number) 
  {
   
    return this.http.get<[any]>(API_Items+"/"+id) ;
  }
  addOrderReview(_orderReviw:OrderReview)
  {
    try { 
      return this.http.post(API,_orderReviw);
      // this.router.navigate(['home']);
     
    } catch (error) {
      console.log("error",error);
      return error;
    }
  }
  addOrderItemsReview(_orderItemReviw:OrderItemReview)
  {
    try { 
      console.log("_orderItemReviw",_orderItemReviw)
      return this.http.post(API_orderItemsReview,_orderItemReviw);
      // this.router.navigate(['home']);
     
    } catch (error) {
      console.log("error",error);
      return error;
    }
  }

  storecomments(id : number): Observable<any>{
    return this.http.get(`${API}/allStoreReview/${id}`);
  }


}
