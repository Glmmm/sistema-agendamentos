package com.agendamento.fema.features.admin.models.dtos;

import java.math.BigDecimal;

public record TipoServicoDTO(
        String nome,
        String descricao,
        BigDecimal preco,
        Long profissionalId
) {}