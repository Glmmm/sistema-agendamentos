import { Routes } from '@angular/router';
import { authGuard } from './core/guards/login.guard';
import { NotFoundComponent } from './shared/errors/not-found.component';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./features/home/home').then((m) => m.HomeComponent),
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard').then((m) => m.DashboardComponent),
    canActivate: [authGuard],
    children: [],
  },

  { path: '**', component: NotFoundComponent },
];
