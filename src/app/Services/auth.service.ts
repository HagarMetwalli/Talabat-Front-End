import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Client } from '../Models/Client';

const AUTH_API = 'https://localhost:44311/api/Clients/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentClient?: Client;

  constructor(private http: HttpClient) {}

  register(client: Client) {
    return this.http.post(AUTH_API, client);
  }

  login(email: string, password: string) {
    return this.http.post<Client>(AUTH_API + 'login', {
      email,
      password,
    });
  }
}
