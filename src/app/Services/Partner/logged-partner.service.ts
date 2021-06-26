import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Partner } from 'src/app/Models/Partner/Partner';
const AUTH_API = 'https://localhost:44311/api/Partners/login';
@Injectable({
  providedIn: 'root',
})
export class LoggedPartnerService {
  constructor(private http: HttpClient) {}
  login(email: string, password: string) {
    return this.http.post(AUTH_API, {
      email,
      password,
    });
  }
}
