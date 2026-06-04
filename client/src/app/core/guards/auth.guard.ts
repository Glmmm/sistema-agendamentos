import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { AuthHelper } from '../../features/auth/auth.helper';
import { jwtDecode } from 'jwt-decode';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  expectedRole?: string,
) => {
  const auth = inject(AuthHelper);

  if (!auth.store.token) {
    auth.toast.add({
      severity: 'warn',
      summary: 'Atenção',
      detail: 'Faça login para acessar esta página.',
    });
    auth.logout();
    return false;
  }

  const decoded = jwtDecode<{ exp: number }>(auth.store.token);
  if (Date.now() >= decoded.exp * 1000) {
    auth.toast.add({
      severity: 'warn',
      summary: 'Atenção',
      detail: 'Sessão expirada, faça login novamente',
    });
    auth.logout();
    return false;
  }

  return true;
};
