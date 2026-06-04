import { DiasSemana } from '../../../shared/models/dias-semana.enum';

export interface ICargaHorariaResponse {
  id: number;
  profissionalId: number;
  profissionalNome: string;
  diaSemana: DiasSemana;
  horaInicio: string;
  horaFim: string;
  intervaloAtendimento: number;
}
