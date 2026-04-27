import {
  Empresa,
  TiposServicos,
  Profissional,
  CargaHoraria,
  Cliente,
  Agendamento,
  Feedback,
} from '../models/cadastros.model';
import { DiaDaSemana, StatusAgendamento } from '../models/enums';

// 1. Empresa
export const MOCK_EMPRESA: Empresa = {
  id: 'emp-001',
  nome: 'Barbearia do Dev Moderno',
  cnpj: '12.345.678/0001-99',
  telefone: '(11) 98888-7777',
  endereco: 'Rua das Techs, 128, São Paulo - SP',
};

// 2. Tipos de Serviços
export const MOCK_SERVICOS: TiposServicos[] = [
  { id: 'srv-1', nome: 'Corte de Cabelo', preco: 50.0, descricao: 'Corte moderno com degradê' },
  {
    id: 'srv-2',
    nome: 'Barba Completa',
    preco: 35.0,
    descricao: 'Barba com toalha quente e navalha',
  },
  { id: 'srv-3', nome: 'Combo Premium', preco: 75.0, descricao: 'Cabelo + Barba + Sobrancelha' },
];

// 3. Profissionais
export const MOCK_PROFISSIONAIS: Profissional[] = [
  {
    id: 'prof-1',
    empresaId: 'emp-001',
    nome: 'Anderson Silva',
    email: 'anderson@barbearia.com',
    telefone: '(11) 91111-2222',
    ativo: true,
  },
  {
    id: 'prof-2',
    empresaId: 'emp-001',
    nome: 'Juliana Costa',
    email: 'juliana@barbearia.com',
    telefone: '(11) 93333-4444',
    ativo: true,
  },
];

// 4. Cargas Horárias
export const MOCK_CARGAS_HORARIAS: CargaHoraria[] = [
  {
    id: 'ch-1',
    profissionalId: 'prof-1',
    diaSemana: DiaDaSemana.SEGUNDA,
    horaInicio: '09:00',
    horaFim: '18:00',
    intervaloAtendimento: 30,
  },
  {
    id: 'ch-2',
    profissionalId: 'prof-2',
    diaSemana: DiaDaSemana.TERCA,
    horaInicio: '10:00',
    horaFim: '19:00',
    intervaloAtendimento: 60,
  },
];

// 5. Clientes
export const MOCK_CLIENTES: Cliente[] = [
  {
    id: 'cli-1',
    atendimentoId: 'ag-1',
    nome: 'Carlos Oliveira',
    telefone: '(11) 95555-6666',
    email: 'carlos.oli@email.com',
    senha: 'hashed_password_123',
    dataCadastro: new Date('2023-10-01'),
  },
  {
    id: 'cli-2',
    atendimentoId: 'ag-2',
    nome: 'Fernanda Lima',
    telefone: '(11) 97777-8888',
    email: 'fer.lima@email.com',
    senha: 'hashed_password_456',
    dataCadastro: new Date('2023-11-15'),
  },
];

// 6. Agendamentos
export const MOCK_AGENDAMENTOS: Agendamento[] = [
  {
    id: 'ag-1',
    cargaHorariaId: 'ch-1',
    tipoServicoId: 'srv-1',
    profissionalId: 'prof-1',
    clienteId: 'cli-1',
    horaInicio: '10:00',
    horaFim: '10:30',
    status: StatusAgendamento.CONFIRMADO,
    descricao: 'Cliente prefere corte tesoura',
  },
  {
    id: 'ag-2',
    cargaHorariaId: 'ch-2',
    tipoServicoId: 'srv-3',
    profissionalId: 'prof-2',
    clienteId: 'cli-2',
    horaInicio: '14:00',
    horaFim: '15:00',
    status: StatusAgendamento.PENDENTE,
  },
];

// 7. Feedbacks
export const MOCK_FEEDBACKS: Feedback[] = [
  {
    id: 'f-1',
    agendamentoId: 'ag-1',
    clienteId: 'cli-1',
    nota: 5,
    comentario: 'Excelente atendimento, profissional muito atencioso!',
    dataAvaliacao: new Date('2023-12-20'),
  },
];
