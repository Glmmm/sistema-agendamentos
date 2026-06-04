import { FormControl, FormGroup, Validators } from '@angular/forms';

export function profissionaisForms() {
  return new FormGroup({
    id: new FormControl(),
    nome: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    telefone: new FormControl('', [Validators.required]),
    ativo: new FormControl(true, [Validators.required]),
  });
}
