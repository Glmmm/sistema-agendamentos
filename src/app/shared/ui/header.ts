import { Component, inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { LoginService } from '../../core/guards/login.service';
import { ButtonModule } from 'primeng/button';
import { Menu, MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  imports: [CardModule, ButtonModule, MenuModule],
  template: `
    <p-card
      class="fixed container z-10 bg-transparent mt-4 border border-neutral-500 backdrop-blur-xl"
    >
      <main class="flex justify-between">
        <div>
          <p>Olá, Guilherme</p>
          <a class="text-neutral-600">visualizar perfil ></a>
        </div>
        <div class="card flex justify-center">
          <p-menu #menu [model]="items" [popup]="true" />
          <p-button (click)="menuToggle($event, menu)" icon="pi pi-bars" />
        </div>
      </main>
    </p-card>
  `,
  styles: `
    p-card {
      background-color: transparent;
    }
  `,
})
export class HeaderComponent {
  router = inject(Router);
  auth = inject(LoginService);
  items: MenuItem[] = [];

  menuToggle(event: any, menu: Menu) {
    menu.toggle(event);
    this.items = [
      {
        label: 'Menu',
        items: [
          {
            label: this.auth.logado() ? 'Logout' : 'Login',
            icon: this.auth.logado() ? 'pi pi-sign-out' : 'pi pi-user',
            command: () => {
              this.auth.logado() ? this.auth.logout() : this.auth.changeDialogState();
            },
          },
          {
            label: 'Home',
            icon: 'pi pi-home',
            command: () => {
              this.router.navigate(['/home']);
            },
          },
          {
            label: 'Dashboard',
            icon: 'pi pi-chart-bar',
            command: () => {
              this.router.navigate(['/dashboard']);
            },
          },
        ],
      },
    ];
  }
}
