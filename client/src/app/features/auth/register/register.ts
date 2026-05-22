import { Component, inject, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { AuthHelper } from '../auth.helper';
import { registerClientForm, registerProviderForm } from './models/register.form';
import { AuthService } from '../../../core/services/auth.service';
import { MessageService } from 'primeng/api';
import { InputMaskModule } from 'primeng/inputmask';

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
  ],
  template: `
    <div class="flex m-8">
      <img class="w-full h-full bg-amber-50" alt="Registro" />
      <div class="w-full">
        <div class="flex flex-col gap-4 mb-4 text-center">
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
  service = inject(AuthService);
  toast = inject(MessageService);
  userType = signal<0 | 2 | 3>(0);

  form!: FormGroup;

  setUserType(type: 2 | 3) {
    this.userType.set(type);
    this.form = type === 3 ? registerClientForm() : registerProviderForm();
    this.form.get('roleId')?.setValue(type);
  }

  register() {
    if (this.form.valid) {
      this.service.register(this.form.value).subscribe({
        next: (res) => {
          this.toast.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Usuário cadastrado com sucesso!',
          });
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
      this.form.markAllAsTouched();
    }
  }
}
