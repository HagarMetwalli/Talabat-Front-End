import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Client } from '../Models/Client';
const CoupApi='https://localhost:44311/api/Coupons/GetCouponDiscount/1/4?itemsIdList=1';

@Injectable({
  providedIn: 'root'
})
export class VoucherService {
  constructor(private http: HttpClient) {}

  GetVoucher( couponId:number,clientId:number,itemList:[number]
    ) {
    return this.http.get(CoupApi+ couponId+clientId + itemList);
   
  }


}
