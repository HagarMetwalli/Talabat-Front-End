import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Store } from '../../app/Models/Store';




const API = "https://localhost:44311/api/Stores/NearestStores/";

@Injectable({
  providedIn: 'root'
})
export class GooglemapService {
  nearStores = Store;

  constructor(private http: HttpClient) { }

  getstores(latitude: number, longitude: number): Observable<any> {

    return this.http.get<Store[]>(API + latitude + '/' + longitude, { observe: 'response' })
      .pipe(map(res => {
        if (res) {
          if (res.status === 201) {
            return [{ status: res.status, nearStores: res }]
          }
          else if (res.status === 200) {
            return [{ status: res.status, nearStores: res }]
          }
        }
        return this.nearStores;

      }), catchError((error: any) => {
        if (error.status < 400 || error.status === 500) {
          return Observable.throw(new Error(error.status));
        }
        return status;

      })

      )
  }
}
