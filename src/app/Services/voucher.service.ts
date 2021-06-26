import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Client } from '../Models/Client';
import { OrderSubmitData } from '../Models/OrderSubmitData';
const CoupApi = 'https://localhost:44311/api/Coupons/GetCouponDiscount/';
const API = 'https://localhost:44311/api/Orders/'

@Injectable({
  providedIn: 'root'
})

export class VoucherService {

  constructor(private http: HttpClient) { }
  GetVoucher(couponKey: string, itemarray: number[], clientId?: number) {
    let params = new HttpParams();
    //let arr = [2, 4];
    itemarray.forEach((itemsIdList: number) => {
      params = params.append(`itemsIdList`, itemsIdList);
    });
    return this.http.get(CoupApi + couponKey + '/' + clientId, { params: params });
  }
  postOrder(suborder: OrderSubmitData) {

    return this.http.post(API, suborder);
  }



}
