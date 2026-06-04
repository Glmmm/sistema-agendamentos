import { FormControl, FormGroup, Validators } from '@angular/forms';

export const registerClientForm = () => {
  return new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    roleId: new FormControl(3, [Validators.required]),
    nome: new FormControl('', [Validators.required]),
    telefone: new FormControl('', [Validators.required]),
  });
};

export const registerProviderForm = () => {
  return new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    roleId: new FormControl(2, [Validators.required]),
    nome: new FormControl('', [Validators.required]),
    cnpj: new FormControl('', [Validators.required]),
    telefone: new FormControl('', [Validators.required]),
    endereco: new FormControl('', [Validators.required]),
  });
};
