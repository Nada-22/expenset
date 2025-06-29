import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@services/auth.service';

export const httpReqInterceptor: HttpInterceptorFn = (req, next) => {
   const authService = inject(AuthService);
  const token = authService.getToken();

  const Request = token ? req.clone({
    
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  

  }) : req;

  return next(Request);
};
