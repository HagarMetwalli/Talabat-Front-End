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
    let arr=[2,3];
    arr.forEach((itemsIdList:number) =>{
      params = params.append(`itemsIdList`, itemsIdList);
    });
    return this.http.get(CoupApi+ couponKey+'/'+clientId,{ params: params });
    }
  

}
