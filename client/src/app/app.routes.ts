import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { ERoles } from './shared/models/roles';

export const routes: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: 'register',
        loadComponent: () =>
          import('./features/auth/components/register').then((m) => m.RegisterComponent),
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./features/auth/components/login').then((m) => m.LoginComponent),
      },
    ],
  },

  {
    path: 'admin',
    canActivate: [authGuard, roleGuard],
    loadComponent: () => import('./features/admin/admin').then((m) => m.AdminComponent),
    data: { expectedRole: ERoles.ADMIN },
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/admin/components/dashboard/dashboard').then(
            (m) => m.DashboardComponent,
          ),
      },
      {
        path: 'profissionais',
        loadComponent: () =>
          import('./features/admin/components/profissionais/profissionais').then(
            (m) => m.ProfissionaisComponent,
          ),
      },
      {
        path: 'perfil',
        loadComponent: () =>
          import('./features/admin/components/perfil/perfil').then((m) => m.PerfilComponent),
      },
    ],
  },

  {
    path: 'client',
    data: { expectedRole: ERoles.CLIENTE },
    children: [
      {
        path: '',
        canActivate: [authGuard, roleGuard],
        loadComponent: () =>
          import('./features/client/components/catalogo/catalogo').then((m) => m.CatalogoComponent),
      },
      {
        path: 'agendamento',
        canActivate: [authGuard, roleGuard],
        loadComponent: () =>
          import('./features/client/components/agendamento/agendamento').then(
            (m) => m.AgendamentoComponent,
          ),
      },
    ],
  },
  {
    path: 'home',
    loadComponent: () => import('./features/home/home').then((m) => m.HomeComponent),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./core/errors/page-not-found').then((m) => m.PageNotFoundComponent),
  },
];
