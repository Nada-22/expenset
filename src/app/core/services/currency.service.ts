import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  http = inject(HttpClient);
  API_URL = environment.currency_conversion;
  constructor() { }


  getCurrencyTypes(): Observable<any> {
    return this.http.get(this.API_URL);

  }
}
