import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { LoginService } from './login.service';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  let login = inject(LoginService);
  // if (login.logado()) {
  //   return true;
  // } else {
  //   let router = inject(Router);
  //   router.navigate(['home']);
  //   return false;
  // }
  return true;
};
