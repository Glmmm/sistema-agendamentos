import {
  Cliente,
  Empresa,
  HorarioTrabalho,
  Profissional,
  Servico,
} from '../models/cadastros.model';
import { DiaDaSemana, StatusAgendamento } from '../models/enums';
import { Agendamento, Feedback } from '../models/movimentacoes.model';
import { ItemFrequente, ResumoArrecadacao } from '../models/relatorios.model';

// 1. Cadastros Básicos
export const mockEmpresa: Empresa = {
  id: 'emp-001',
  nomeFantasia: 'Studio G - Estética e Cuidado',
  cnpj: '12.345.678/0001-90',
  telefone: '(18) 99999-0000',
  endereco: 'Avenida Rui Barbosa, 1200 - Centro, Assis - SP',
  horarioAbertura: '09:00',
  horarioFechamento: '19:00',
};

export const mockServicos: Servico[] = [
  {
    id: 'srv-001',
    nome: 'Corte de Cabelo',
    descricao: 'Corte tradicional ou degradê',
    preco: 45.0,
    duracaoMinutos: 45,
    ativo: true,
  },
  {
    id: 'srv-002',
    nome: 'Barba Terapia',
    descricao: 'Alinhamento com toalha quente',
    preco: 35.0,
    duracaoMinutos: 30,
    ativo: true,
  },
  {
    id: 'srv-003',
    nome: 'Limpeza de Pele',
    descricao: 'Limpeza profunda',
    preco: 90.0,
    duracaoMinutos: 60,
    ativo: true,
  },
];

export const mockProfissionais: Profissional[] = [
  {
    id: 'prof-001',
    nome: 'Guilherme',
    email: 'guilherme@studiog.com',
    telefone: '(18) 98888-1111',
    servicosIds: ['srv-001', 'srv-002'],
    ativo: true,
  },
  {
    id: 'prof-002',
    nome: 'Amanda',
    email: 'amanda@studiog.com',
    telefone: '(18) 98888-2222',
    servicosIds: ['srv-001', 'srv-003'],
    ativo: true,
  },
];

export const mockHorariosTrabalho: HorarioTrabalho[] = [
  {
    id: 'ht-001',
    profissionalId: 'prof-001',
    diaSemana: DiaDaSemana.SEGUNDA,
    horaInicio: '09:00',
    horaFim: '19:00',
    intervaloInicio: '12:00',
    intervaloFim: '13:00',
  },
  {
    id: 'ht-002',
    profissionalId: 'prof-001',
    diaSemana: DiaDaSemana.TERCA,
    horaInicio: '09:00',
    horaFim: '19:00',
    intervaloInicio: '12:00',
    intervaloFim: '13:00',
  },
  {
    id: 'ht-003',
    profissionalId: 'prof-002',
    diaSemana: DiaDaSemana.QUARTA,
    horaInicio: '10:00',
    horaFim: '20:00',
    intervaloInicio: '14:00',
    intervaloFim: '15:00',
  },
];

export const mockClientes: Cliente[] = [
  {
    id: 'cli-001',
    nome: 'Lucas Almeida',
    telefone: '(18) 97777-3333',
    email: 'lucas@email.com',
    dataCadastro: new Date('2025-10-15T10:00:00Z'),
  },
  {
    id: 'cli-002',
    nome: 'Marina Silva',
    telefone: '(18) 97777-4444',
    dataCadastro: new Date('2026-01-20T14:30:00Z'),
  },
];

export const mockFeedbacks: Feedback[] = [
  {
    id: 'fb-001',
    agendamentoId: 'agd-003',
    clienteId: 'cli-001',
    nota: 5,
    comentario: 'Excelente atendimento como sempre!',
    dataAvaliacao: new Date('2026-03-28T17:00:00Z'),
  },
];

// 3. Relatórios e Dashboards (DTOs formatados para renderização em gráficos)
export const mockResumoArrecadacaoMensal: ResumoArrecadacao = {
  periodo: 'Março/2026',
  total: 5450.0,
  porProfissional: [
    { nome: 'Guilherme', valor: 3200.0 },
    { nome: 'Amanda', valor: 2250.0 },
  ],
  porServico: [
    { nome: 'Corte de Cabelo', valor: 2500.0 },
    { nome: 'Limpeza de Pele', valor: 1800.0 },
    { nome: 'Barba Terapia', valor: 1150.0 },
  ],
};

export const mockClientesFrequentes: ItemFrequente[] = [
  { id: 'cli-001', nome: 'Lucas Almeida', quantidadeAgendamentos: 12, valorTotalGerado: 640.0 },
  { id: 'cli-005', nome: 'Roberto Dias', quantidadeAgendamentos: 8, valorTotalGerado: 320.0 },
  { id: 'cli-008', nome: 'Fernanda Costa', quantidadeAgendamentos: 5, valorTotalGerado: 450.0 },
];
