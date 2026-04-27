// src/app/shared/models/cadastros.model.ts

import { DiaDaSemana, StatusAgendamento } from './enums';

// Informações do Negócio
export interface Empresa {
  id: string;
  nome: string;
  cnpj: string;
  telefone: string;
  endereco: string;
}

export interface TiposServicos {
  id: string;
  nome: string;
  descricao?: string;
  preco: number;
}

// Serviços Oferecidos
export interface Agendamento {
  id: string;
  cargaHorariaId: string; // Relaciona o agendamento à carga horária do profissional
  tipoServicoId: string; // Relaciona o agendamento ao tipo de serviço solicitado
  profissionalId: string; // Relaciona o agendamento ao profissional que irá realizar o serviço
  clienteId: string; // Relaciona o agendamento ao cliente que solicitou o serviço
  horaInicio: string; // ex: '10:00'
  horaFim: string; // ex: '10:30 com base no intervaloAtendimento da carga horária do profissional'
  status: StatusAgendamento;
  descricao?: string;
}

// Profissionais Disponíveis
export interface Profissional {
  id: string;
  empresaId: string;
  nome: string;
  email: string;
  telefone: string;
  ativo: boolean;
}

export interface Feedback {
  id: string;
  agendamentoId: string;
  clienteId: string;
  nota: number; // ex: 1 a 5 estrelas
  comentario?: string;
  dataAvaliacao: Date;
}

export interface CargaHoraria {
  id: string;
  profissionalId: string;
  diaSemana: DiaDaSemana;
  horaInicio: string; // ex: '09:00'
  horaFim: string; // ex: '17:00'
  intervaloAtendimento: number; // em minutos, ex: 30
}

// Representa os clientes (necessário para "Clientes Frequentes"
export interface Cliente {
  id: string;
  atendimentoId: string; // Relaciona o cliente ao atendimento que ele solicitou
  nome: string;
  telefone: string;
  email: string;
  senha: string;
  dataCadastro: Date;
}
