import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./features/home/home').then((m) => m.HomeComponent),
  },
  {
    path: 'auth',
    children: [
      {
        path: 'register',
        loadComponent: () =>
          import('./features/auth/register/register').then((m) => m.RegisterComponent),
      },
    ],
  },

  {
    path: '**',
    loadComponent: () =>
      import('./core/errors/page-not-found').then((m) => m.PageNotFoundComponent),
  },
];
