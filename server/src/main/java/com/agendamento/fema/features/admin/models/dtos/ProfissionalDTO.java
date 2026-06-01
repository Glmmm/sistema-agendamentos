package com.agendamento.fema.features.admin.models.dtos;

public record ProfissionalDTO(
        String nome,
        String email,
        String telefone,
        boolean ativo
) {}