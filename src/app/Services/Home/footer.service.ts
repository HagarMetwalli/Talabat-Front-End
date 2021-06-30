import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '../../Models/Store';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class FooterService {
  constructor(private http: HttpClient) {}

  getStores() {
    return this.http.get('https://localhost:44311/api/Stores/MostCommonStores');
  }
  getCuisines() {
    return this.http.get(
      'https://localhost:44311/api/Cuisines/MostCommonCuisine'
    );
  }
}
