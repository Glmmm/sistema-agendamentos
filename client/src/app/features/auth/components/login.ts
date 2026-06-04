import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { AuthHelper } from '../auth.helper';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { loginForm } from '../models/forms/login.form';
import { AuthService } from '../../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, DialogModule, InputTextModule, ButtonModule, RouterLink],
  template: `
    <div class="w-full flex flex-col items-center justify-center">
      <div>
        <form [formGroup]="form" (ngSubmit)="login()" class="flex flex-col gap-4">
          <div class="w-full flex flex-col">
            <label for="login" class="font-semibold">E-mail</label>
            <input
              pInputText
              type="login"
              formControlName="login"
              placeholder="exemplo@email.com"
            />
          </div>
          <div class="w-full flex flex-col">
            <label for="password" class="font-semibold">Senha</label>
            <input pInputText type="password" formControlName="password" placeholder="*******" />
          </div>
          <p class="text-center text-sm text-neutral-400  ">
            não tem conta?
            <a class="text-primary cursor-pointer hover:underline" [routerLink]="['/auth/register']"
              >cadastre-se aqui :)</a
            >
          </p>
          <div class="flex justify-end gap-2">
            <p-button label="Entrar" type="submit" [disabled]="form.invalid" />
          </div>
        </form>
      </div>
    </div>
  `,
})
export class LoginComponent {
  auth = inject(AuthHelper);

  form = loginForm();

  login() {
    this.auth.login(this.form);
  }
}
