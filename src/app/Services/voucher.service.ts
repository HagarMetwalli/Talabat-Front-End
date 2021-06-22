import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Client } from '../Models/Client';
const CoupApi='https://localhost:44311/api/Coupons/GetCouponDiscount/';

@Injectable({
  providedIn: 'root'
})

export class VoucherService {
  constructor(private http: HttpClient) {}
  GetVoucher( couponKey:string ,clientId:number,itemIDs:Array<number>)
     {
    return this.http.get(CoupApi+ couponKey+'/'+clientId+'/'+itemIDs);
     };











}
