import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


const API =  "https://localhost:44311/api/Stores/";
@Injectable({
  providedIn: 'root'
})
export class StoreprofileService {

  constructor(public http: HttpClient) { }
   getStoreById(id: number) {

    return this.http.get(API + id);
  }
   getItemsByCategory(store: string, cat: string): Observable<any> {
    return this.http.get(`${API}${store}/${cat}`);
  }

  getAllCategory(store: string): Observable<any> {
    return this.http.get(`${API}${store}/Categories`);
  }

  gettopitem(id : number): Observable<any>{
    return this.http.get(`${API}GetTopItemsBystoreId/${id}`);
  }

}
