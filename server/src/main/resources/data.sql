-- drop table agendamento, carga_horaria, cliente, empresa, feedback, profissional, role, tipo_servico, usuario;
-- ====================================================================
-- 1. Inserir Roles (Papéis)
-- ====================================================================
INSERT INTO role (id, name) VALUES
                                (1, 'ROLE_ADMIN'),
                                (2, 'ROLE_EMPRESA'),
                                (3, 'ROLE_CLIENTE')
ON CONFLICT (id) DO NOTHING;

-- ====================================================================
-- 2. Inserir Usuários
-- ====================================================================
INSERT INTO usuario (id, login, senha, ativo, role_id) VALUES
                                                           (1, 'barbearia_fema', 'senha123', true, 2),
                                                           (2, 'clinica_estetica', 'senha123', true, 2),
                                                           (3, 'joao_cliente', 'senha123', true, 3),
                                                           (4, 'maria_cliente', 'senha123', true, 3)
ON CONFLICT (id) DO NOTHING;

-- ====================================================================
-- 3. Inserir Empresas
-- Nota: O @MapsId faz com que a PK seja 'usuario_id'
-- ====================================================================
INSERT INTO empresa (usuario_id, nome, cnpj, telefone, endereco) VALUES
                                                                     (1, 'Barbearia Fema Tech', '12.345.678/0001-90', '(18) 3302-1000', 'Av. das Nações, 100'),
                                                                     (2, 'Estética Avançada', '98.765.432/0001-00', '(18) 3302-2000', 'Rua Floriano Peixoto, 500')
ON CONFLICT (usuario_id) DO NOTHING;

-- ====================================================================
-- 4. Inserir Clientes
-- Nota: O @MapsId faz com que a PK seja 'usuario_id'
-- ====================================================================
INSERT INTO cliente (usuario_id, nome, telefone, data_cadastro) VALUES
                                                                    (3, 'João Silva', '(18) 99700-1111', NOW()),
                                                                    (4, 'Maria Oliveira', '(18) 99800-2222', NOW())
ON CONFLICT (usuario_id) DO NOTHING;

-- ====================================================================
-- 5. Inserir Profissionais
-- ====================================================================
INSERT INTO profissional (id, empresa_id, nome, email, telefone, ativo) VALUES
                                                                            (1, 1, 'Marcos Barbeiro', 'marcos@fema.com', '(18) 99111-2222', true),
                                                                            (2, 1, 'Ricardo Cortes', 'ricardo@fema.com', '(18) 99111-3333', true),
                                                                            (3, 2, 'Dra. Ana Esteticista', 'ana@estetica.com', '(18) 99222-4444', true)
ON CONFLICT (id) DO NOTHING;

-- ====================================================================
-- 6. Inserir Tipos de Serviço
-- ====================================================================
INSERT INTO tipo_servico (id, nome, descricao, preco, profissional_id) VALUES
                                                                           (1, 'Corte de Cabelo', 'Corte masculino degradê', 45.00, 1),
                                                                           (2, 'Barba Completa', 'Barba com toalha quente', 35.00, 1),
                                                                           (3, 'Limpeza de Pele', 'Limpeza profunda com extração', 120.00, 3)
ON CONFLICT (id) DO NOTHING;

-- ====================================================================
-- 7. Inserir Carga Horária
-- ====================================================================
INSERT INTO carga_horaria (id, profissional_id, dia_semana, hora_inicio, hora_fim, intervalo_atendimento) VALUES
                                                                                                              (1, 1, 'SEGUNDA', '08:00:00', '18:00:00', 30),
                                                                                                              (2, 1, 'TERCA', '08:00:00', '18:00:00', 30),
                                                                                                              (3, 3, 'QUARTA', '13:00:00', '19:00:00', 60)
ON CONFLICT (id) DO NOTHING;

-- ====================================================================
-- 8. Inserir Agendamentos
-- ====================================================================
INSERT INTO agendamento (id, carga_horaria_id, tipo_servico_id, profissional_id, cliente_id, hora_inicio, hora_fim, status, descricao) VALUES
                                                                                                                                           (1, 1, 1, 1, 3, '09:00:00', '09:30:00', 'CONCLUIDO', 'Cliente quer corte social'),
                                                                                                                                           (2, 1, 2, 1, 4, '10:00:00', '10:30:00', 'CONFIRMADO', 'Apenas aparar')
ON CONFLICT (id) DO NOTHING;

-- ====================================================================
-- 9. Inserir Feedback
-- ====================================================================
INSERT INTO feedback (id, agendamento_id, cliente_id, nota, comentario, data_avaliacao) VALUES
    (1, 1, 3, 5, 'Excelente atendimento, recomendo!', NOW())
ON CONFLICT (id) DO NOTHING;

-- ====================================================================
-- CORREÇÃO DE SEQUENCES PARA O POSTGRESQL
-- Como inserimos IDs manuais, precisamos atualizar os contadores (sequences)
-- para que o banco não tente gerar um ID que já inserimos manualmente.
-- ====================================================================
SELECT setval(pg_get_serial_sequence('role', 'id'), COALESCE(MAX(id), 1)) FROM role;
SELECT setval(pg_get_serial_sequence('usuario', 'id'), COALESCE(MAX(id), 1)) FROM usuario;
SELECT setval(pg_get_serial_sequence('profissional', 'id'), COALESCE(MAX(id), 1)) FROM profissional;
SELECT setval(pg_get_serial_sequence('tipo_servico', 'id'), COALESCE(MAX(id), 1)) FROM tipo_servico;
SELECT setval(pg_get_serial_sequence('carga_horaria', 'id'), COALESCE(MAX(id), 1)) FROM carga_horaria;
SELECT setval(pg_get_serial_sequence('agendamento', 'id'), COALESCE(MAX(id), 1)) FROM agendamento;
SELECT setval(pg_get_serial_sequence('feedback', 'id'), COALESCE(MAX(id), 1)) FROM feedback;