import { inject, Injectable, signal } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { IUserInfo } from './models/user.model';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { AuthStore } from './auth.store';

@Injectable({ providedIn: 'root' })
export class AuthHelper {
  store = inject(AuthStore);
  service = inject(AuthService);
  toast = inject(MessageService);
  router = inject(Router);

  user = signal<IUserInfo | null>(null);

  login(form: FormGroup) {
    if (form.valid && this.store.token == null) {
      this.service.login(form.value).subscribe({
        next: (res: any) => {
          this.store.token = res.token;
          this.router.navigate(['/']);
          this.getUserInfo();
        },
        error: (err) => {
          this.toast.add({ severity: 'error', summary: 'Erro', detail: err.error });
        },
      });
    } else {
      this.toast.add({ severity: 'error', summary: 'Erro', detail: 'Preencha todos os campos' });
    }
  }

  logout() {
    this.user.set(null);
    this.store.clearToken();
    this.router.navigate(['/auth/login']);
  }

  register(form: FormGroup) {
    if (form.valid) {
      this.service.register(form.value).subscribe({
        next: (res) => {
          this.toast.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Usuário cadastrado com sucesso!',
          });
          this.router.navigate(['/auth/login']);
        },
        error: (err) => {
          this.toast.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao registrar usuário.',
          });
        },
      });
    } else {
      form.markAllAsTouched();
    }
  }

  getUserInfo() {
    this.service.getUserInfo().subscribe({
      next: (res: any) => {
        this.user.set(res);
      },
      error: (err) => {
        this.logout();
      },
    });
  }
}
