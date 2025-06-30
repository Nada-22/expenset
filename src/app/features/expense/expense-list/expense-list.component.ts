import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { Avatar, AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-expense-list',
  imports: [
    Avatar,
    AvatarModule,
    SelectModule,
    FormsModule,
    TranslateModule,
    CurrencyPipe,
    MenuModule

  ],
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.scss'
})
export class ExpenseListComponent {

  router=inject(Router);
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
      label:'Add Expense',
      command:()=>{
        this.router.navigate(['/expense','add'])
      }
    }
  ]
  selectedOption = 1;
  userName!: string;

  ngOnInit() {
    this.getUserName()
  }

  getUserName() {

    this.userName = localStorage.getItem('userEmail')?.split('@')[0] as string;

    console.log(this.userName);

  }
}
