import { Empresa } from '../models/cadastros.model';
import { StatusAgendamento } from '../models/enums';
import { Agendamento, LugarFamoso, ServicoPassado } from '../models/movimentacoes.model';

export const mockServicosPassados: ServicoPassado[] = [
  {
    id: 'sp-001',
    clienteId: 'cli-101',
    profissionalId: 'prof-01',
    descricaoProfissional: 'Guilherme Papa',
    servicoId: 'srv-01',
    descricaoServico: 'Corte de Cabelo + Barba',
    dataHoraInicio: new Date('2026-03-25T14:00:00Z'),
    dataHoraFim: new Date('2026-03-25T15:00:00Z'),
    status: StatusAgendamento.CONCLUIDO,
    valorCobrado: 85.0,
    observacoes: 'Cliente solicitou degradê navalhado.',
    nota: 5,
    comentario: 'Excelente atendimento, profissional muito detalhista!',
    dataAvaliacao: new Date('2026-03-25T18:30:00Z'),
  },
  {
    id: 'sp-002',
    clienteId: 'cli-102',
    profissionalId: 'prof-02',
    descricaoProfissional: 'Amanda Costa',
    servicoId: 'srv-03',
    descricaoServico: 'Limpeza de Pele Profunda',
    dataHoraInicio: new Date('2026-03-26T10:00:00Z'),
    dataHoraFim: new Date('2026-03-26T11:30:00Z'),
    status: StatusAgendamento.CONCLUIDO,
    valorCobrado: 120.0,
    nota: 4,
    comentario: 'Gostei muito do resultado, mas o horário atrasou 10 minutos.',
    dataAvaliacao: new Date('2026-03-27T09:00:00Z'),
  },
  {
    id: 'sp-003',
    clienteId: 'cli-103',
    profissionalId: 'prof-01',
    descricaoProfissional: 'Guilherme Papa',
    servicoId: 'srv-02',
    descricaoServico: 'Design de Sobrancelha',
    dataHoraInicio: new Date('2026-03-28T16:00:00Z'),
    dataHoraFim: new Date('2026-03-28T16:30:00Z'),
    status: StatusAgendamento.CANCELADO,
    valorCobrado: 0.0,
    observacoes: 'Cliente cancelou com 2h de antecedência por motivo de saúde.',
    // Nota e comentário ficam undefined para serviços cancelados
  },
  {
    id: 'sp-004',
    clienteId: 'cli-104',
    profissionalId: 'prof-02',
    descricaoProfissional: 'Amanda Costa',
    servicoId: 'srv-01',
    descricaoServico: 'Corte Feminino',
    dataHoraInicio: new Date('2026-04-01T14:00:00Z'),
    dataHoraFim: new Date('2026-04-01T15:30:00Z'),
    status: StatusAgendamento.CONCLUIDO,
    valorCobrado: 150.0,
    // Atendimento concluído mas ainda sem avaliação do cliente
  },
  {
    id: 'sp-005',
    clienteId: 'cli-101',
    profissionalId: 'prof-01',
    descricaoProfissional: 'Guilherme Papa',
    servicoId: 'srv-04',
    descricaoServico: 'Pintura de Cabelo',
    dataHoraInicio: new Date('2026-04-05T13:00:00Z'),
    dataHoraFim: new Date('2026-04-05T15:00:00Z'),
    status: StatusAgendamento.CONCLUIDO,
    valorCobrado: 200.0,
    nota: 5,
    comentario: 'Cor ficou exatamente como eu queria.',
    dataAvaliacao: new Date('2026-04-05T16:00:00Z'),
  },
];

// 2. Movimentações (Usando datas próximas ao contexto de Março de 2026)
export const mockAgendamentos: Agendamento[] = [
  {
    id: 'agd-001',
    clienteId: 'cli-001',
    profissionalId: 'prof-001',
    descricaoProfissional: 'Guilherme', // Adicionado
    servicoId: 'srv-001',
    descricaoServico: 'Corte de Cabelo', // Adicionado
    dataHoraInicio: new Date('2026-03-31T14:00:00Z'),
    dataHoraFim: new Date('2026-03-31T14:45:00Z'),
    status: StatusAgendamento.CONFIRMADO,
    valorCobrado: 45.0,
    observacoes: 'Cliente prefere corte na tesoura',
  },
  {
    id: 'agd-002',
    clienteId: 'cli-002',
    profissionalId: 'prof-002',
    descricaoProfissional: 'Amanda', // Adicionado
    servicoId: 'srv-003',
    descricaoServico: 'Limpeza de Pele', // Adicionado
    dataHoraInicio: new Date('2026-04-01T10:00:00Z'),
    dataHoraFim: new Date('2026-04-01T11:00:00Z'),
    status: StatusAgendamento.PENDENTE,
    valorCobrado: 90.0,
  },
  {
    id: 'agd-003',
    clienteId: 'cli-001',
    profissionalId: 'prof-001',
    descricaoProfissional: 'Guilherme', // Adicionado
    servicoId: 'srv-002',
    descricaoServico: 'Barba Terapia', // Adicionado
    dataHoraInicio: new Date('2026-03-28T16:00:00Z'),
    dataHoraFim: new Date('2026-03-28T16:30:00Z'),
    status: StatusAgendamento.CONCLUIDO,
    valorCobrado: 35.0,
  },
];

export const mockEmpresas: Empresa[] = [
  {
    id: 'emp-001',
    nomeFantasia: 'Studio G - Estética e Bem-Estar',
    cnpj: '12.345.678/0001-90',
    telefone: '(18) 99999-0000',
    endereco: 'Avenida Rui Barbosa, 1200 - Centro, Assis - SP',
    horarioAbertura: '09:00',
    horarioFechamento: '19:00',
  },
  {
    id: 'emp-002',
    nomeFantasia: 'Clínica de Fisioterapia Vital',
    cnpj: '98.765.432/0001-21',
    telefone: '(18) 3322-1100',
    endereco: 'Rua José Nogueira, 450 - Vila Operária, Assis - SP',
    horarioAbertura: '07:30',
    horarioFechamento: '21:00',
  },
  {
    id: 'emp-003',
    nomeFantasia: 'Barbearia do Papa', // Exemplo de profissional autônomo
    cnpj: undefined, // CNPJ opcional conforme a interface
    telefone: '(18) 98888-7777',
    endereco: 'Rua das Palmeiras, 89 - Jardim Europa',
    horarioAbertura: '10:00',
    horarioFechamento: '20:00',
  },
];
export const mockLugares: LugarFamoso[] = [
  { id: '1', nome: 'Barbearia Redentor', endereco: 'Rua Brasil 123, Brasil' },
  { id: '2', nome: 'Barbearia Eiffel', endereco: 'Rua Brasil 123, França' },
  { id: '3', nome: 'Barbearia', endereco: 'Rua Brasil 123, Itália' },
  { id: '4', nome: 'Barbearia de Assis', endereco: 'Rua Brasil 123, Brasil' },
];
