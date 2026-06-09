package com.agendamento.fema.features.client.models.dtos;

import java.math.BigDecimal;

public record TipoServicoResumoDTO(Long id, String nome, String descricao, BigDecimal preco) {}
