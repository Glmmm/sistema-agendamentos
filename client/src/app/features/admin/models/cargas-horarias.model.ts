import { DiasSemana } from '../../../shared/models/dias-semana.enum';

export interface ICargaHoraria {
  profissionalId: number;
  diaSemana: DiasSemana;
  horaInicio: string;
  horaFim: string;
  intervaloAtendimento: number;
}
