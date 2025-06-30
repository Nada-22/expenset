import { CurrencyPipe } from '@angular/common';
import { Component, DestroyRef, HostListener, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ExpenseI } from '@interfaces/expense';
import { TranslateModule } from '@ngx-translate/core';
import { ExpenseService } from '@services/expense.service';
import { AppState } from '@state/app.state';
import { MenuItem } from 'primeng/api';
import { Avatar, AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { SelectModule } from 'primeng/select';
import { ExpenseItemComponent } from "./expense-item/expense-item.component";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-expense-list',
  imports: [
    Avatar,
    AvatarModule,
    SelectModule,
    FormsModule,
    TranslateModule,
    CurrencyPipe,
    MenuModule,
    ExpenseItemComponent,
 

  ],
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.scss'
})
export class ExpenseListComponent {

  router = inject(Router);
  expenseService = inject(ExpenseService);
  destroyRef = inject(DestroyRef);
  appState = inject(AppState);

  expenses!: ExpenseI[];
  uiExpenses: ExpenseI[] = [];
  filteredExpenses: ExpenseI[] = [];



  selectedFilter!: number;

  filterOptions = [
    {
      label: 'this month',
      key: 1
    },
    {
      label: 'last 7 days',
      key: 2
    },
  ]

  items: MenuItem[] = [

    {
      label: 'Add Expense',
      command: () => {
        this.router.navigate(['/expense', 'add'])
      }
    }
  ]

  userName!: string;
  totalUsdAmount = 0;

  ngOnInit() {
    this.getUserName();
    this.getExpenses();
  }

  getUserName() {

    this.userName = localStorage.getItem('userEmail')?.split('@')[0] as string;

  }


  getExpenses() {
    this.appState.setAppLoading(true);
    this.expenseService.getAllExpenses().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: res => {
        this.appState.setAppLoading(false);
        this.expenses = res;
        this.expenses.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    
      
      

      },
      error: err => {
        this.appState.setAppLoading(false);
        console.error(err);
      }
    });
  }


}
