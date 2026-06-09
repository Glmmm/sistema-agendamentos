import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DiasSemana } from '../../../../../../shared/models/dias-semana.enum';

export function cargaHorariaForms() {
  return new FormGroup({
    id: new FormControl<number | null>(null),
    profissionalId: new FormControl<number | null>(null, [Validators.required]),
    diasSemana: new FormControl<string[]>([], [Validators.required]),
    horaInicio: new FormControl<string>('', [Validators.required]),
    horaFim: new FormControl<string>('', [Validators.required]),
    intervaloAtendimento: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(1),
    ]),
  });
}
