import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


const API = "https://localhost:44311/api/Stores/";
@Injectable({
  providedIn: 'root'
})
export class StoreprofileService {

  constructor(public http: HttpClient) { }
  public getStoreById(id: number) {

    return this.http.get(API + id);
  }
  public getmenu(menu?: string) {
    return this.http.get(API + menu + '/Menu');
    console.log(API+menu+'/Menu');
  }
}
