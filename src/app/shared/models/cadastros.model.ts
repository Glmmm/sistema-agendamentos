// src/app/shared/models/cadastros.model.ts

// Informações do Negócio
export interface Empresa {
  id: string;
  nomeFantasia: string;
  cnpj?: string;
  telefone: string;
  endereco: string;
  horarioAbertura: string; // ex: '08:00'
  horarioFechamento: string; // ex: '18:00'
}

// Serviços Oferecidos
export interface Servico {
  id: string;
  nome: string;
  descricao?: string;
  preco: number;
  duracaoMinutos: number;
  ativo: boolean;
}

// Profissionais Disponíveis
export interface Profissional {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  servicosIds: string[]; // IDs dos serviços que este profissional realiza
  ativo: boolean;
}

// Horários Disponíveis
export interface HorarioTrabalho {
  id: string;
  profissionalId: string;
  diaSemana: number; // Referência ao enum DiaDaSemana
  horaInicio: string; // ex: '09:00'
  horaFim: string; // ex: '17:00'
  intervaloInicio?: string; // ex: '12:00'
  intervaloFim?: string; // ex: '13:00'
}

// Representa os clientes (necessário para "Clientes Frequentes"
export interface Cliente {
  id: string;
  nome: string;
  telefone: string;
  email?: string;
  dataCadastro: Date;
}
