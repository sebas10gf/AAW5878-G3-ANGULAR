import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { loginservice } from '../services/loginservice';

export const seguridadGuardGuard: CanActivateFn = (route, state) => {
  const lService = inject(loginservice)
  const router = inject(Router)
  const rpta = lService.verificar();

  if(!rpta) {
    router.navigate(['/login']);
    return false;
  }
  return rpta;
};
