import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { ExpenseI } from '@interfaces/expense';

@Component({
  selector: 'app-expense-item',
  imports: [
    CurrencyPipe,
    DatePipe
  ],
  templateUrl: './expense-item.component.html',
  styleUrl: './expense-item.component.scss'
})
export class ExpenseItemComponent {

  expense = input<ExpenseI>();
}
