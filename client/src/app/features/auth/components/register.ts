import { Component, inject, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { registerClientForm, registerProviderForm } from '../models/forms/register.form';
import { InputMaskModule } from 'primeng/inputmask';
import { RouterLink } from '@angular/router';
import { AuthHelper } from '../auth.helper';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DialogModule,
    InputTextModule,
    InputMaskModule,
    ButtonModule,
    CardModule,
    RouterLink,
  ],
  template: `
    <div class="w-full flex flex-col justify-center items-center">
      <div class="w-1/2 px-8">
        <div class="flex flex-col gap-4 mb-4  text-center">
          <span>Selecione o tipo de cadastro</span>
          <div class="flex gap-4 justify-center">
            <div class="px-8">
              <p-button [outlined]="userType() !== 3" (click)="setUserType(3)"> Cliente </p-button>
            </div>
            <div class="px-8">
              <p-button [outlined]="userType() !== 2" (click)="setUserType(2)">
                Fornecedor
              </p-button>
            </div>
          </div>
        </div>

        @if (form) {
          <form [formGroup]="form" (ngSubmit)="register()">
            <div class="flex flex-col gap-2 mb-4">
              <label for="nome" class="font-semibold w-24">Nome</label>
              <input pInputText id="nome" formControlName="nome" placeholder="Seu nome completo" />
            </div>

            <div class="flex flex-col gap-2 mb-4">
              <label for="email" class="font-semibold w-24">E-mail</label>
              <input
                pInputText
                id="email"
                formControlName="email"
                placeholder="exemplo@email.com"
              />
            </div>

            <div class="flex flex-col gap-2 mb-4">
              <label for="telefone" class="font-semibold w-24">Telefone</label>
              <input
                pInputText
                pInputMask="(99) 99999-9999"
                id="telefone"
                formControlName="telefone"
                placeholder="(00) 00000-0000"
              />
            </div>

            @if (userType() === 2) {
              <div class="flex flex-col gap-2 mb-4">
                <label for="cnpj" class="font-semibold w-24">CNPJ</label>
                <input
                  pInputText
                  id="cnpj"
                  pInputMask="99.999.999/9999-99"
                  formControlName="cnpj"
                  placeholder="00.000.000/0001-00"
                />
              </div>

              <div class="flex flex-col gap-2 mb-4">
                <label for="endereco" class="font-semibold w-24">Endereço</label>
                <input
                  pInputText
                  id="endereco"
                  formControlName="endereco"
                  placeholder="Rua, Número, Bairro"
                />
              </div>
            }

            <div class="flex flex-col gap-2 mb-4">
              <label for="password" class="font-semibold w-24">Senha</label>
              <input
                pInputText
                id="password"
                type="password"
                formControlName="password"
                placeholder="*******"
              />
              @if (form.get('password')?.errors?.['required']) {
                <small class="text-red-500"> A senha é obrigatória. </small>
              }
              @if (form.get('password')?.errors?.['minlength']) {
                <small class="text-red-500"> A senha deve conter no mínimo 8 caracteres. </small>
              }
            </div>
            <p class="text-center text-sm text-neutral-400  ">
              já possui conta?
              <a class="text-primary cursor-pointer hover:underline" [routerLink]="['/auth/login']"
                >faça login aqui :)</a
              >
            </p>
            <div class="flex justify-end gap-2">
              <p-button label="Criar Conta" type="submit" [disabled]="form.invalid" />
            </div>
          </form>
        }
      </div>
    </div>
  `,
})
export class RegisterComponent {
  auth = inject(AuthHelper);
  userType = signal<2 | 3>(3);

  form: FormGroup = registerClientForm();

  setUserType(type: 2 | 3) {
    this.userType.set(type);
    this.form = type === 3 ? registerClientForm() : registerProviderForm();
  }

  register() {
    this.auth.register(this.form);
  }
}
