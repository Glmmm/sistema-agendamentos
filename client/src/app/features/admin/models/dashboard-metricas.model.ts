import { IAgendamentoResumo } from '../../client/models/agendamento-resumo.model';

export interface IDashboardResponse {
  totalPendentes: number;
  totalConfirmados: number;
  totalConcluidos: number;
  faturamentoAtual: number;
  metaArrecadacao: number;
  agendamentosDoDia: IAgendamentoResumo[];
}
