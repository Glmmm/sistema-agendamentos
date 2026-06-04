import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthHelper } from '../../features/auth/auth.helper';
import { ERoles } from '../../shared/models/roles';

export const roleGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthHelper);

  const expectedRole = route.data['expectedRole'];

  const routerByUserType: { [key: string]: string } = {
    [ERoles.ADMIN]: '/admin',
    [ERoles.CLIENTE]: '/client',
  };

  if (auth.store.user()?.type === expectedRole) {
    return true;
  }

  auth.router.navigate([routerByUserType[auth.store.user()?.type || ''] || '/']);
  return false;
};
