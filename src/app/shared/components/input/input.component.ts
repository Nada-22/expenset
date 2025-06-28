import { CommonModule } from '@angular/common';
import { Component, Input, Optional, ViewEncapsulation, inject } from '@angular/core';
import { ControlContainer, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    FormsModule,
    PasswordModule,
    TranslateModule,
    InputNumberModule
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  encapsulation: ViewEncapsulation.None,

})
export class InputComponent {
  @Input() control!: FormControl | any;
  @Input() inputType = 'text';
  @Input() inputLabel = '';
  @Input() inputValue = '';
  @Input() inputClass = '';
  @Input() labelClass = '';
  @Input() placeholder = '';

  @Input() isLoading = false;
  @Input() isSubmitted = false;

  controlName: string | null = null;

  constructor(@Optional() private controlContainer: ControlContainer) { }

  ngOnInit(): void {
    if (this.control && this.controlContainer && this.controlContainer.control) {
      const formGroup = this.controlContainer.control as FormGroup;
      this.controlName = Object.keys(formGroup.controls).find(name => this.control === formGroup.get(name)) || null;

    }
  }

  // get control() {

  //   return this.formControl || this.controlContainer!.control!.get(this.formControlName);

  // }
}
