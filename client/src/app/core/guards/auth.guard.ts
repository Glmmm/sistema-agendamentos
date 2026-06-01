import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { AuthHelper } from '../../features/auth/auth.helper';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const auth = inject(AuthHelper);

  if (!auth.store.token) {
    auth.router.navigate(['/auth/login']);
    return false;
  }

  if (auth.user()) {
    return true;
  } else {
    auth.getUserInfo();
    return true;
  }
};
