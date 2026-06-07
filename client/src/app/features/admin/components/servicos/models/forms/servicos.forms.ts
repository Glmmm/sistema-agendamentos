import { FormControl, FormGroup, Validators } from '@angular/forms';

export function servicosForms() {
  return new FormGroup({
    id: new FormControl<number | null>(null),
    nome: new FormControl<string>('', [Validators.required]),
    descricao: new FormControl<string>(''),
    preco: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
    profissionalId: new FormControl<number | null>(null, [Validators.required]),
  });
}
