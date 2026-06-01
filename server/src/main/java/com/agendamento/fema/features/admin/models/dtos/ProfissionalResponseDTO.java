package com.agendamento.fema.features.admin.models.dtos;

import java.util.List;

public record ProfissionalResponseDTO(
        Long id,
        String nome,
        String email,
        String telefone,
        boolean ativo,
        List<TipoServicoResponseDTO> servicos,
        List<CargaHorariaResponseDTO> cargasHorarias
) {}