import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ClientAddress } from 'src/app/Models/ClientAddress';

@Injectable({
  providedIn: 'root'
})
export class AddressesService {
  private url: string = "https://localhost:44311/api/ClientAddresses";
  private url2: string = "https://localhost:44311/api/ClientAddresses/AddAdress";

  constructor(private http: HttpClient, private router: Router) { }

  addAddress(address: ClientAddress) {
    return this.http.post(`${this.url}`, address);
  }

  getAddressByClientId(id: number) {
    return this.http.get(`${this.url}/GetByClientId/${id}`);
  }

  getAddresses(id: number) {
    return this.http.get(`${this.url}/${id}`);
  }

  getALLAddresses() {
    return this.http.get(`${this.url}`);
  }

  deleteAddress(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  updateAddress(aaa: ClientAddress) {
    console.log("aaa: ", aaa);

    return this.http.patch(`${this.url}/${aaa.clientAddressId}`, aaa);
  }

  addspicalAddress(address: any) {
    return this.http.post(`${this.url2}`, address);
  }
}
