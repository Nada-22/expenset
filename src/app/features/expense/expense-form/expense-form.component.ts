import { Component, DestroyRef, inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InputComponent } from '@components/input/input.component';
import { TranslateModule } from '@ngx-translate/core';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { FileUploadComponent } from "@components/file-upload/file-upload.component";
import { ButtonModule } from 'primeng/button';
import { Router, RouterLink } from '@angular/router';
import { ExpenseService } from '@services/expense.service';
import { ExpenseCategoryI, ExpenseI } from '@interfaces/expense';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CurrencyService } from '@services/currency.service';
import { KeyValuePipe } from '@angular/common';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToastService } from '@services/toast.service';

@Component({
  selector: 'app-expense-form',
  imports: [
    TranslateModule,
    SelectModule,
    InputComponent,
    DatePickerModule,
    FileUploadComponent,
    ButtonModule,
    RouterLink,
    ReactiveFormsModule,
    FormsModule,
    KeyValuePipe,
    RadioButtonModule
  ],
  templateUrl: './expense-form.component.html',
  styleUrl: './expense-form.component.scss'
})
export class ExpenseFormComponent {

  expenseService = inject(ExpenseService);
  currencyService = inject(CurrencyService);
  toastService = inject(ToastService);
  destroyRef = inject(DestroyRef);
  router = inject(Router);
  isLoading = false;
  isSubmitted = false;
  categoriesLoading = false;
  categories: ExpenseCategoryI[] = [];

  currencyRates: any = {};
  currencyLoading = false;

  expenseForm = new FormGroup({
    category: new FormControl<ExpenseCategoryI | null>(null, [Validators.required]),
    currencyRate: new FormControl(0, [Validators.required]),
    currencySign: new FormControl('', [Validators.required]),
    amount: new FormControl(0, [Validators.required]),
    date: new FormControl('', [Validators.required]),
    receipt: new FormControl('', [Validators.required]),
    usdAmount: new FormControl(0, [Validators.required]),
  })

  ngOnInit() {

    this.getExpenseCategories();
    this.getCurrency();
  }

  addExpense() {

    this.isSubmitted = true;


    let currency: number = this.expenseForm.get('currencyRate')?.value as number;
    this.expenseForm.patchValue({
      usdAmount: this.expenseForm.get('amount')?.value as number / currency
    })

    if (this.expenseForm.invalid) return;
    this.isLoading = true;
    this.expenseService.addExpense(this.expenseForm.value as ExpenseI).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: res => {
        this.isLoading = false;
        this.toastService.showSuccessToast('expense created successfully');
        setTimeout(() => {

          this.router.navigate(['/expense'])
        }, 500);

      }, error: err => {
        this.toastService.showSuccessToast('something error');

      }
    })
  }

  getExpenseCategories() {
    this.categoriesLoading = true;
    this.expenseService.getExpenseCategories().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        this.categories = res;
        this.categoriesLoading = false;


      },
      error: (err) => {
        this.categoriesLoading = false;


      }
    })
  }



  onUploadFile(file: File) {
    this.expenseForm.get('receipt')?.setValue(file.name)
  }

  get controls() {
    return this.expenseForm.controls;
  }

  getCurrency() {
    this.currencyLoading = true
    this.currencyService.getCurrencyTypes().subscribe({
      next: res => {
        this.currencyRates = res.conversion_rates;
        this.currencyLoading = false;

      },
      error: err => {
        this.currencyLoading = false;

      }
    })
  }

  checkCurrency(event: any) {


    Object.keys(event.value)
    for (const key in this.currencyRates) {
      const element = this.currencyRates[key];
      if (element == event.value) {
        this.expenseForm.patchValue({

          currencySign: key
        })
        break
      }

    }
  }
}
