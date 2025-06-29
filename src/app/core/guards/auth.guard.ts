import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@services/auth.service';

export const authGuard: CanActivateChildFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const isLoginPage = state.url.startsWith('/auth');
  if (authService.isLoggedIn() || isLoginPage) {
    console.log('✅ Authenticated');
    
    return true;
  }

  console.log('Not authenticated');
  return router.createUrlTree(['/auth/login']);
};
