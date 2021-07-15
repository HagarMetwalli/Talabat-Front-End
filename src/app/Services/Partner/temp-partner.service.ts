import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const AUTH_API = 'https://localhost:44311/api/TempPartnerRegisterationDetails';
import { TemPartner } from '../../Models/Partner/TempPartner';

@Injectable({
  providedIn: 'root',
})
export class TempPartnerService {
  constructor(private http: HttpClient) {}

  register(partner: TemPartner) {
    return this.http.post(AUTH_API, partner);
  }
}
