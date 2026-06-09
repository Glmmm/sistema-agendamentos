import { Component, inject, signal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { DrawerModule } from 'primeng/drawer';
import { AccordionModule } from 'primeng/accordion';
import { AuthHelper } from '../auth/auth.helper';
import { LoginComponent } from '../auth/components/login';
import { RouterLink, RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-header',
  imports: [RouterLink, CardModule, ButtonModule, MenuModule, DrawerModule, AccordionModule],
  template: `
    <p-card
      class="fixed top-6 left-1/6 right-1/6 max-w-7xl backdrop-blur-xl border border-neutral-700 shadow-xl z-50"
    >
      <main class="flex items-center justify-between w-full px-2">
        <div
          class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-800/40 border border-neutral-700/50 text-xs md:text-sm text-neutral-200"
        >
          <i class="pi pi-user text-neutral-400 text-xs"></i>
          @if (auth.store.user()) {
            <div class="flex flex-col">
              <p class="text-xs text-neutral-400">Conectado como</p>

              <p>
                Olá, <span class="font-bold">{{ auth.store.user()!.data.nome }}</span>
              </p>
            </div>
          } @else {
            <span class="text-neutral-400">Olá, visitante</span>
          }
        </div>

        <p-button
          type="button"
          [outlined]="true"
          severity="secondary"
          (click)="visible.set(true)"
          icon="pi pi-bars"
          class="border-neutral-700 text-neutral-200 hover:bg-neutral-800 transition-all"
        />
      </main>
    </p-card>

    <div class="card flex justify-center">
      <p-drawer
        [(visible)]="visible"
        [closable]="false"
        position="right"
        class="w-full sm:w-80 bg-neutral-900 border-l border-neutral-800 text-neutral-100"
      >
        <ng-template #header>
          <div class="flex items-center justify-between w-full pr-2">
            @if (auth.store.user()) {
              <div class="flex flex-col">
                <span class="font-bold text-sm text-neutral-100">{{
                  auth.store.user()!.data.nome
                }}</span>
              </div>
              <p-button
                icon="pi pi-sign-out"
                label="Sair"
                (click)="logout()"
                severity="danger"
                [outlined]="true"
                size="small"
                class="border-neutral-700/60 text-xs"
              />
            } @else {
              <span class="font-bold text-neutral-200 flex items-center gap-2">
                <i class="pi pi-bars text-indigo-500"></i> Navegação
              </span>
            }
          </div>
        </ng-template>

        <div class="flex flex-col gap-6 mt-4">
          @if (!auth.store.user()) {
            <a routerLink="/auth/login" (click)="visible.set(false)"
              ><i class="pi pi-sign-in"></i> login</a
            >
          } @else {
            <a routerLink="/admin"><i class="pi pi-home"></i> home</a>
          }
        </div>
      </p-drawer>
    </div>
  `,
  styles: `
    p-card {
      background-color: transparent;
    }
  `,
})
export class HeaderComponent {
  auth = inject(AuthHelper);

  visible = signal(false);

  logout() {
    this.auth.logout();
    this.visible.set(false);
  }
}
