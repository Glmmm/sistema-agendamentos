import { inject, Injectable, signal } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class LoginService {
  router = inject(Router);
  displayDialog = signal(false);
  logado = signal(false);

  loginForm = new FormGroup({
    name: new FormControl(''),
    pass: new FormControl(''),
  });

  login(form: any) {
    if (form.name == 'admin' && form.pass == 'admin') {
      localStorage.setItem('logado', this.logado.toString());
      this.logado.set(true);
      this.router.navigate(['dashboard']);
      this.changeDialogState();
    } else {
      alert('Login ou senha incorretos');
    }
  }

  logout() {
    this.logado.set(false);
    localStorage.removeItem('logado');
    this.router.navigate(['']);
  }

  changeDialogState() {
    this.displayDialog.set(!this.displayDialog());
  }
}
