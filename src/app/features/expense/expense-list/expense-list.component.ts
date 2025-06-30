import { CurrencyPipe } from '@angular/common';
import { Component, DestroyRef, HostListener, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ExpenseI } from '@interfaces/expense';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ExpenseService } from '@services/expense.service';
import { AppState } from '@state/app.state';
import { MenuItem } from 'primeng/api';
import { Avatar, AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { SelectModule } from 'primeng/select';
import { ExpenseItemComponent } from "./expense-item/expense-item.component";
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ButtonModule } from 'primeng/button';
import { LangE } from 'src/app/core/enums/lang.enum';
import { TranslationService } from '@services/translation.service';

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
    ProgressSpinnerModule,
    ButtonModule

  ],
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.scss'
})
export class ExpenseListComponent {

  router = inject(Router);
  expenseService = inject(ExpenseService);
  destroyRef = inject(DestroyRef);
  appState = inject(AppState);
  _translation = inject(TranslationService);
  _translate = inject(TranslateService);

  expenses!: ExpenseI[];
  uiExpenses: ExpenseI[] = [];
  filteredExpenses: ExpenseI[] = [];

  pageSize = 10;
  currentPage = 0;
  isLoadingMore = false;

  selectedFilter!: number;

  filterOptions = [
    {
      label: 'general.this_month',
      key: 1
    },
    {
      label: 'general.last_7_days',
      key: 2
    },
  ]

  items: MenuItem[] = [

    {
      label: 'expense.add_expense',
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
        this.currentPage = 0;
        this.uiExpenses = []; // reset view
        this.loadMoreExpenses();
        this.totalUsdAmount = this.calculateTotalUsd(res);
        this.onFilter();

      },
      error: err => {
        this.appState.setAppLoading(false);
        console.error(err);
      }
    });
  }

  loadMoreExpenses() {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    const chunk = this.filteredExpenses.slice(start, end);
    this.uiExpenses = [...this.uiExpenses, ...chunk];
    this.currentPage++;
    this.isLoadingMore = false;
  }

  hasMoreExpenses(): boolean {
    return this.uiExpenses.length < this.filteredExpenses.length;
  }


  calculateTotalUsd(expenses: ExpenseI[]): number {
    return expenses.reduce((sum, item) => sum + (item.usdAmount || 0), 0);
  }


  onFilter() {

    this.appState.setAppLoading(true);
    const today = new Date();

    let filtered: ExpenseI[] = [];

    //This month
    if (this.selectedFilter === 1) {

      const currentMonth = today.getMonth();
      const currentYear = today.getFullYear();

      filtered = this.expenses.filter(exp => {
        const expDate = new Date(exp.date);
        return expDate.getMonth() === currentMonth && expDate.getFullYear() === currentYear;
      });

    }

    // Last 7 days
    else if (this.selectedFilter === 2) {

      const last7Days = new Date(today);
      last7Days.setDate(today.getDate() - 7);

      filtered = this.expenses.filter(exp => {
        const expDate = new Date(exp.date);
        return expDate >= last7Days && expDate <= today;
      });
    }

    // All
    else {
      filtered = this.expenses;
    }

    this.filteredExpenses = filtered;
    this.resetPagination(); // important
    setTimeout(() => {

      this.appState.setAppLoading(false);
    }, 1000);
  }

  resetPagination() {
    this.currentPage = 0;
    this.uiExpenses = [];
    this.loadMoreExpenses(); // restart pagination
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;

    if (nearBottom && !this.isLoadingMore && this.hasMoreExpenses()) {
      this.isLoadingMore = true;

      setTimeout(() => {
        this.loadMoreExpenses();
        // this.isLoadingMore = false;
      }, 2000);
    }
  }

  changeLang() {
    console.log(this._translation.defaultLang());

    switch (this._translation.defaultLang()) {
      case LangE.AR:
        this._translation.changeLang(LangE.EN)
        break;
      case LangE.EN:
        this._translation.changeLang(LangE.AR)
        break;
    }

  }
}
