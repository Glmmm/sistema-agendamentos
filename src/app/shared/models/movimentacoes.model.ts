// src/app/shared/models/movimentacoes.model.ts
import { StatusAgendamento } from './enums';

// Reserva de Horários / Movimentações
export interface Agendamento {
  id: string;
  clienteId: string;
  profissionalId: string;
  descricaoProfissional: string;
  servicoId: string;
  descricaoServico: string;
  dataHoraInicio: Date; // A data e a hora exata da reserva
  dataHoraFim: Date; // Calculado com base na duração do serviço
  status: StatusAgendamento; // Confirmação/Cancelamento de Horários
  valorCobrado: number; // Necessário para calcular o "Total Arrecadado"
  observacoes?: string;
}

// Feedbacks
export interface Feedback {
  id: string;
  agendamentoId: string;
  clienteId: string;
  nota: number; // ex: 1 a 5 estrelas
  comentario?: string;
  dataAvaliacao: Date;
}

export interface ServicoPassado {
  id: string;
  clienteId: string;
  profissionalId: string;
  descricaoProfissional: string;
  servicoId: string;
  descricaoServico: string;
  dataHoraInicio: Date; // A data e a hora exata da reserva
  dataHoraFim: Date; // Calculado com base na duração do serviço
  status: StatusAgendamento; // Confirmação/Cancelamento de Horários
  valorCobrado: number; // Necessário para calcular o "Total Arrecadado"
  observacoes?: string;
  nota?: number; // ex: 1 a 5 estrelas
  comentario?: string;
  dataAvaliacao?: Date;
}

export interface LugarFamoso {
  id: string;
  nome: string;
  endereco: string;
  image?: string;
  descricao?: string;
}
