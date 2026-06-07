import { FormControl, FormGroup, Validators } from '@angular/forms';

export function cargaHorariaForms() {
  return new FormGroup({
    id: new FormControl<number | null>(null),
    profissionalId: new FormControl<number | null>(null, [Validators.required]),
    diaSemana: new FormControl<string>('', [Validators.required]),
    horaInicio: new FormControl<string>('', [Validators.required]),
    horaFim: new FormControl<string>('', [Validators.required]),
    intervaloAtendimento: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(1),
    ]),
  });
}
