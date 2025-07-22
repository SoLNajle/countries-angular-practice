import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { LoginService } from './services/login';

export const authGuard: CanActivateFn = () => {
  const loginService = inject(LoginService);
  const router = inject(Router);
  if (loginService.isAuthenticatedUser()) {
    return true;
  }
  //turn true; //  ONLY FOR TESTING PURPOSES
  return router.createUrlTree(['/not-authorized']);
};
