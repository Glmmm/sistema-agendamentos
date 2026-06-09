package com.agendamento.fema.features.admin.models.dtos;


public record ProfissionalResponseDTO(
        Long id,
        String nome,
        String email,
        String telefone,
        boolean ativo
) {}