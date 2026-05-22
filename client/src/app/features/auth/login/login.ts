import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { AuthHelper } from '../auth.helper';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { loginForm } from './models/login.form';
import { AuthService } from '../../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, DialogModule, InputTextModule, ButtonModule, RouterLink],
  template: `
    <div class="card flex justify-center">
      <form [formGroup]="form">
        <div class="flex flex-col gap-2 mb-2">
          <label for="email" class="font-semibold w-24">E-mail</label>
          <input pInputText type="email" formControlName="email" placeholder="examplo@email.com" />
        </div>
        <div class="flex flex-col gap-2 mb-2">
          <label for="pass" class="font-semibold w-24">Senha</label>
          <input pInputText type="password" formControlName="pass" placeholder="*******" />
        </div>
        <p class="text-center text-sm text-neutral-300 mb-8">
          não tem conta?
          <a class="text-primary cursor-pointer hover:underline" routerLink="auth/register"
            >clica aqui :)</a
          >
        </p>
        <div class="flex justify-end gap-2">
          <p-button label="Entrar" [disabled]="form.invalid" (click)="login(form.value)" />
        </div>
      </form>
    </div>
  `,
})
export class LoginComponent {
  service = inject(AuthService);
  auth = inject(AuthHelper);
  router = inject(Router);
  toast = inject(MessageService);

  form = loginForm();

  login(form: any) {
    if (form.valid) {
      this.service.login(form).subscribe({
        next: (res: any) => {
          cookieStore.set('token', res.token);
          this.auth.setUser(res.user);
          this.router.navigate(['dashboard']);
        },
        error: (err) => {
          this.toast.add({
            severity: 'error',
            summary: 'Erro',
            detail: err.error.message,
          });
        },
      });
    } else {
      this.toast.add({ severity: 'error', summary: 'Erro', detail: 'Preencha todos os campos' });
    }
  }
}
