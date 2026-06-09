import { FormControl, FormGroup, Validators } from '@angular/forms';

export function agendamentoForms(clienteId: number) {
  return new FormGroup({
    clienteId: new FormControl(clienteId, [Validators.required]),
    servicoId: new FormControl(0, [Validators.required]),
    profissionalId: new FormControl(0, [Validators.required]),
    empresaId: new FormControl(0, [Validators.required]),
    dataSelecionada: new FormControl('', [Validators.required]),
    horaInicio: new FormControl('', [Validators.required]),
    observacao: new FormControl(''),
    precoRegistrado: new FormControl(0, [Validators.required]),
  });
}
