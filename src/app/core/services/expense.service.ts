import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment.development';
import { ExpenseCategoryI, ExpenseI } from '@interfaces/expense';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  http = inject(HttpClient);
  API_URL = environment.API_URL;
  constructor() { }


  getAllExpenses(): Observable<ExpenseI[]>  {
    return this.http.get<ExpenseI[]>(this.API_URL + '/expenses');

  }

  addExpense(expense: ExpenseI): Observable<ExpenseI> {
    return this.http.post<ExpenseI>(this.API_URL + '/expenses', expense);

  }

  getExpenseCategories(): Observable<ExpenseCategoryI[]> {

    return this.http.get<ExpenseCategoryI[]>(this.API_URL + '/categories');
  }
}
