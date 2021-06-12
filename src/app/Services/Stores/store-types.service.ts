import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StoreTypes } from 'src/app/Models/Store/storetype';

const API ="https://localhost:44311/api/StoreTypes";

@Injectable({
  providedIn: 'root'
})
export class StoreTypesService {

  constructor(private http:HttpClient) {}

 getstoreTypes(){
  return this.http.get<StoreTypes[]>(API);
 }

}
