import { Component, inject, signal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Menu, MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthHelper } from '../../features/auth/auth.helper';
import { DrawerModule } from 'primeng/drawer';
import { LoginComponent } from '../../features/auth/login/login';
@Component({
  selector: 'app-header',
  imports: [CardModule, ButtonModule, MenuModule, DrawerModule, LoginComponent],
  template: `
    <p-card class="border border-neutral-500 backdrop-blur-xl">
      <main class="flex justify-between">
        <div>
          <p>Olá, Guilherme</p>
          <a class="text-neutral-600">visualizar perfil ></a>
        </div>
        <p-button type="button" outlined="true" (click)="visible.set(true)" icon="pi pi-bars" />
      </main>
    </p-card>

    <p-drawer header="Menu" [(visible)]="visible" position="right">
      <app-login></app-login>
    </p-drawer>
  `,
  styles: `
    p-card {
      background-color: transparent;
    }
  `,
})
export class HeaderComponent {
  router = inject(Router);
  auth = inject(AuthHelper);
  items: MenuItem[] = [];

  visible = signal(false);

  menuToggle(event: any, menu: Menu) {
    menu.toggle(event);
    this.items = [
      {
        label: 'Menu',
        items: [
          {
            label: this.auth.user() ? 'Logout' : 'Login',
            icon: this.auth.user() ? 'pi pi-sign-out' : 'pi pi-user',
          },
          {
            label: 'Home',
            icon: 'pi pi-home',
            routerLink: ['/home'],
          },
          {
            label: 'Dashboard',
            icon: 'pi pi-chart-bar',
            routerLink: ['/dashboard'],
          },
        ],
      },
    ];
  }

  logout() {
    this.auth.setUser(null);
    cookieStore.delete('token');
    this.router.navigate(['']);
  }
}
