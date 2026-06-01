import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: 'register',
        loadComponent: () =>
          import('./features/auth/register/register').then((m) => m.RegisterComponent),
      },
      {
        path: 'login',
        loadComponent: () => import('./features/auth/login/login').then((m) => m.LoginComponent),
      },
    ],
  },

  {
    path: '',
    loadComponent: () => import('./features/home/home').then((m) => m.HomeComponent),
    canActivate: [authGuard],
    children: [],
  },

  {
    path: '**',
    loadComponent: () =>
      import('./core/errors/page-not-found').then((m) => m.PageNotFoundComponent),
  },
];
