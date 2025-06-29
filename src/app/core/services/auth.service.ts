import { inject, Injectable } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  cookieService = inject(CookieService)
  private trustedUser = {

    email: 'admin@inovola.com',
    password: '123456'
  }
  constructor() { }


  onLogin(email: string, password: string): Observable<{ token: string, status: number }> {
    return of({ email, password }).pipe(
      delay(3000),
      map(credentials => {
        if (
          credentials.email === this.trustedUser.email &&
          credentials.password === this.trustedUser.password
        ) {
          return {
            token: 'inovola-mock-token-123456',
            status: 200
          };
        } else {
          throw new Error('Invalid credentials');
        }
      })
    );
  }

  isLoggedIn() {
    return !!this.cookieService.get('authToken');
  }

  storeToken(token: string) {
    this.cookieService.set('authToken', token, 1, '/', '', true, 'Strict'); // Store for 1 day, Secure, SameSite Strict
  }

  getToken(): string {
    return this.cookieService.get('authToken');
  }

  deleteToken() {
    this.cookieService.delete('authToken', '/');
  }
}
