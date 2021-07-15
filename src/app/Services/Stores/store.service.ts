// import { OffersComponent } from './../../Components/offers/offers.component';
import { Store } from '../../Models/Store';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
const API = "https://localhost:44311/api/Stores";
const CUISINES_API= "https://localhost:44311/api/Cuisines";


@Injectable({
  providedIn: 'root'
})
export class StoreService {
  constructor(private http: HttpClient) { }

  getstores() {
    return this.http.get<Store[]>(API);
  }

  //pagination
  getAll(params: any): Observable<any> {
    return this.http.get<any>(API, { params });
  }

 
getAllCuisines(){

return this.http.get(CUISINES_API);

}

}
