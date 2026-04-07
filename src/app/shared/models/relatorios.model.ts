// src/app/shared/models/relatorios.model.ts

// Estrutura para o "Total Arrecadado (por Período, Profissional ou Serviço)" [cite: 5]
export interface ResumoArrecadacao {
  periodo: string; // ex: 'Março/2026'
  total: number;
  porProfissional?: { nome: string; valor: number }[];
  porServico?: { nome: string; valor: number }[];
}

// Estrutura para "Clientes Frequentes" e "Serviços Frequentes" [cite: 6, 7]
export interface ItemFrequente {
  id: string;
  nome: string;
  quantidadeAgendamentos: number;
  valorTotalGerado?: number;
}
