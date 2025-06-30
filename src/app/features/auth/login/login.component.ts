import { Component, DestroyRef, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from "../../../shared/components/input/input.component";
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { ToastService } from '@services/toast.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-login',
  imports: [
    InputComponent,
    TranslateModule,
    ButtonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  authService = inject(AuthService);
  router = inject(Router);
  toastService = inject(ToastService);
  destroyRef = inject(DestroyRef);
  isSubmitted = false;
  isLoading = false;
  //login form

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)])
  })


  onLogin() {
    this.isSubmitted = true;
    console.log(this.loginForm.value);

    if (this.loginForm.invalid) return;

    this.isLoading = true;
    this.authService.onLogin(this.loginForm.value.email!, this.loginForm.value.password!)
      .pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: (res) => {
          // localStorage.setItem('auth_token', res.token);
          this.authService.storeToken(res.token);
          localStorage.setItem('userEmail', this.loginForm.get('email')?.value as string)
          this.router.navigate(['/expense']);
        },
        error: () => {

          this.isLoading = false;
          this.toastService.showErrorToast('invalidate email or password')

        }
      });
  }
}
