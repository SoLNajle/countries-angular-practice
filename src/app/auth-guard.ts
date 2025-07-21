import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { LoginService } from './services/login';

export const authGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);
  if (loginService.isAuthenticatedUser()) {
    return true;
  }
  return router.createUrlTree(['/not-authorized']);
};
