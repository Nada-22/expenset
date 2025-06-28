import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Avatar, AvatarModule } from 'primeng/avatar';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-expense-list',
  imports: [
    Avatar,
    AvatarModule,
    SelectModule,
    FormsModule,
    TranslateModule,
    CurrencyPipe
  ],
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.scss'
})
export class ExpenseListComponent {
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
  selectedOption = 1;
}
