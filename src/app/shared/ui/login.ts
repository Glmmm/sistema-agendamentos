import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { LoginService } from '../../core/guards/login.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, DialogModule, InputTextModule, ButtonModule],
  template: `
    <p-dialog [(visible)]="auth.displayDialog" [modal]="true">
      <form [formGroup]="auth.loginForm">
        <h1>Realize o login</h1>
        <input pInputText formControlName="name" placeholder="examplo@email.com" />
        <br />
        <input pInputText formControlName="pass" placeholder="*****" />
        <p-button label="Login" (click)="auth.login(auth.loginForm.value)"></p-button>
      </form>
    </p-dialog>
  `,
})
export class LoginComponent {
  auth = inject(LoginService);
}
