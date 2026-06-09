import { IAgendamentoResumo } from './agendamento-resumo.model';
import { IEmpresaPopulares } from './empresa-populares.model';
import { IEmpresaResumo } from './empresa-resumo.model';

export interface IHomeResponse {
  agendamentosRealizados: IAgendamentoResumo[];
  empresasQueAgendou: IEmpresaResumo[];
  empresasMaisPopulares: IEmpresaPopulares[];
}
