import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InputComponent } from '@components/input/input.component';
import { TranslateModule } from '@ngx-translate/core';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { FileUploadComponent } from "@components/file-upload/file-upload.component";
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-expense-form',
  imports: [
    TranslateModule,
    SelectModule,
    InputComponent,
    DatePickerModule,
    FileUploadComponent,
    ButtonModule
  ],
  templateUrl: './expense-form.component.html',
  styleUrl: './expense-form.component.scss'
})
export class ExpenseFormComponent {
  categories = [];
  isLoading = false;
  isSubmitted = false;

  expenseForm = new FormGroup({
    category: new FormControl('', [Validators.required]),
    amount: new FormControl(0, [Validators.required]),
    date: new FormControl('', [Validators.required]),
    receipt: new FormControl('', [Validators.required]),
  })
}
