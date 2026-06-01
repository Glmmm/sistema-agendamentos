package com.agendamento.fema.features.admin.models.dtos;

import java.math.BigDecimal;

public record TipoServicoResponseDTO(
        Long id,
        String nome,
        String descricao,
        BigDecimal preco
) {}