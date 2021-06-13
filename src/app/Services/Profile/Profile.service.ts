import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Router } from '@angular/router';
import { Client } from 'src/app/Models/Client';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private url: string = "https://localhost:44311/api/Clients";
  private currentUser!: any;
  private loginStatus!: boolean;

  constructor(private http: HttpClient, private router: Router) {
    this.loginStatus = false;
  }

  getClient(id: number) {
    return this.http.get(`${this.url}/${id}`);
  }

  deleteClient(client: Client) {
    return this.http.delete(`${this.url}/${client.clientId}`);
  }

  updateClient(client: Client) {
    return this.http.patch(`${this.url}/${client.clientId}`, client);
  }

}
