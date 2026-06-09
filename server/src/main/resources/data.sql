-- -- drop table agendamento, carga_horaria, cliente, empresa, feedback, profissional, role, tipo_servico, usuario;

INSERT INTO role (id, name) VALUES
                                (1, 'ROLE_ADMIN'),
                                (2, 'ROLE_EMPRESA'),
                                (3, 'ROLE_CLIENTE')
ON CONFLICT (id) DO NOTHING;
