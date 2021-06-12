import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Stores } from 'src/app/Models/Store';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
const API ="https://localhost:44311/api/Stores";
@Injectable({
  providedIn: 'root'
})
export class FooterService {

  _Stores = Stores;
  constructor(private http:HttpClient) {}
  
  getstores():Observable<any>{
    return this.http.get(API , { observe: 'response' })
        .pipe(
          map( res => {
          if (res) {
            if (res.status === 200) {
              this._Stores != res.body ;
              console.log(this._Stores);
                return [{ status: res.status, _Stores: res.body }]
            }
          }
          return this._Stores;

        }),catchError((error: any) => {
            if (error.status < 400 ||  error.status ===500) {
                return Observable.throw(new Error(error.status));
            }
            return status;

          })

      )
    }
}
