import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Client } from '../Models/Client';
const CoupApi='https://localhost:44311/api/Coupons/GetCouponDiscount/';

@Injectable({
  providedIn: 'root'
})

export class VoucherService {
 
  constructor(private http: HttpClient) {}
  GetVoucher( couponKey:string ,clientId?:number){
    let params = new HttpParams();
    params.set('itemsIdList', 2);
    params.set('itemsIdList', 3);
    return this.http.get(CoupApi+ couponKey+'/'+clientId,{params: params});
    }
  

}
