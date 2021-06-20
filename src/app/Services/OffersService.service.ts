import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OffersServiceService {
  constructor(private http: HttpClient) {}
  PromotionStores() {
    return this.http.get(
      'https://localhost:44311/api/Promotions/GetAllStoresHavePromotions'
    );
  }

  CoupousStores() {
    return this.http.get(
      'https://localhost:44311/api/Coupons/GetAllStoresHaveCoupns'
    );
  }
  CouponItems(storeid: number) {
    return this.http.get(
      'https://localhost:44311/api/Coupons/GetStoreCouponItems/' + storeid
    );
  }
  PromotionItems(storeid: number) {
    return this.http.get(
      'https://localhost:44311/api/Promotions/GetStorePromotionItems/' + storeid
    );
  }
}
