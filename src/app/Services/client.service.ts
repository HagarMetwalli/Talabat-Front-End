import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
const API_URL = 'https://localhost:44311/api/Clients';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private http: HttpClient) {}
  //on progress
  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getClientBoard(): Observable<any> {
    return this.http.get(API_URL + 'client', { responseType: 'text' });
  }
  getByemail(email: string): Observable<any> {
    return this.http
      .get(`${API_URL}/getClientByEmail/${email}`, { observe: 'response' })
      .pipe(
        map((res) => {
          if (res) {
            if (res.status === 201) {
              return [{ status: res.status }];
            } else if (res.status === 200) {
              return [{ status: res.status }];
            }
          }
          return res.status;
        }),
        catchError((error: any) => {
          if (error.status > 400 || error.status === 500) {
            return [{ status: error.status }];
          }
          return error.status;
        })
      );
  }
}
