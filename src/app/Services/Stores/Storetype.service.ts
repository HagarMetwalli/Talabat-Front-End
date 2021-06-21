import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const StorType_API = "https://localhost:44311/api/StoreTypes";

@Injectable({
  providedIn: 'root'
})
export class StoretypeService {

  constructor(private httpClient: HttpClient) { }

  getStoreTypes() {
    return this.httpClient.get(StorType_API);
  }

  getStoreTypeById(typeid: number) {
    return this.httpClient.get(StorType_API + '/' + typeid);
  }

}
