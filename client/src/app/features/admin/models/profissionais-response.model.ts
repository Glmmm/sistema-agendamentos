import { ICargaHorariaResponse } from './cargas.horarias-response.model';
import { ITipoServicoResponse } from './tipo-servicos-response.model';

export interface IProfissionalResponse {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  ativo: boolean;
  servicos: ITipoServicoResponse[];
  cargasHorarias: ICargaHorariaResponse[];
}
