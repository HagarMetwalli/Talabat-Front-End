import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Stores } from 'src/app/Models/Store';
import { Observable } from 'rxjs';
const API ="https://localhost:44311/api/Stores";
@Injectable({
  providedIn: 'root'
})
export class FooterService {

  _Stores = Stores;
  constructor(private http: HttpClient) {}
  
  getstores(){
    console.log(API)
    return this.http.get(API);
   }

      
}
