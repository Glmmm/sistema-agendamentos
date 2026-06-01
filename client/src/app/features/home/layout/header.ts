import { Component, inject, signal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Menu, MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { DrawerModule } from 'primeng/drawer';
import { AccordionModule } from 'primeng/accordion';
import { AuthHelper } from '../../auth/auth.helper';
import { LoginComponent } from '../../auth/login/login';
@Component({
  selector: 'app-header',
  imports: [CardModule, ButtonModule, MenuModule, DrawerModule, AccordionModule, LoginComponent],
  template: `
    <p-card class="fixed top-8 left-25 right-25 border border-neutral-500 backdrop-blur-xl z-100">
      <main class="flex justify-between">
        <div>
          @if (auth.user()) {
            <p>Olá, {{ auth.user()!.dados.nome }}</p>
          } @else {
            <p>Olá, visitante</p>
          }
        </div>
        <p-button type="button" outlined="true" (click)="visible.set(true)" icon="pi pi-bars" />
      </main>
    </p-card>

    <div class="card flex justify-center">
      <p-drawer [(visible)]="visible" closable="false" position="right">
        <ng-template #header>
          @if (auth.user()) {
            <p class="font-bold">{{ auth.user()!.dados.nome }}</p>
            <p-button
              icon="pi pi-sign-out"
              label="Sair"
              (click)="logout()"
              severity="danger"
              outlined="true"
              size="small"
              class="border-0"
            />
          } @else {
            <span class="font-bold">Bem-vindo!</span>
          }
        </ng-template>
        <div>
          <p-accordion value="0">
            @if (!auth.user()) {
              <p-accordion-panel value="0">
                <p-accordion-header>Header I</p-accordion-header>
                <p-accordion-content>
                  <app-login></app-login>
                </p-accordion-content>
              </p-accordion-panel>
            }
            <p-accordion-panel value="1">
              <p-accordion-header>Header II</p-accordion-header>
              <p-accordion-content> </p-accordion-content>
            </p-accordion-panel>
            <p-accordion-panel value="2">
              <p-accordion-header>Header III</p-accordion-header>
              <p-accordion-content> </p-accordion-content>
            </p-accordion-panel>
          </p-accordion>
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
