import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment.development';
import { ExpenseI } from '@interfaces/expense';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  http = inject(HttpClient);
  API_URL = environment.API_URL;
  constructor() { }


  getAllExpenses() {
    return this.http.get(this.API_URL + '/expenses');

  }

  addExpense(expense: ExpenseI) {
    return this.http.post(this.API_URL + '/expenses', expense);

  }
  
  getExpenseCategories(): Observable<any> {

    return this.http.get(this.API_URL + '/categories');
  }
}
