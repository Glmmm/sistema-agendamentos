package com.agendamento.fema.features.admin.models.dtos;

import com.agendamento.fema.features.client.models.dtos.AgendamentoResponseDTO;

import java.math.BigDecimal;
import java.util.List;

public record DashboardResponseDTO(
        long totalPendentes,
        long totalConfirmados,
        long totalConcluidos,
        BigDecimal faturamentoAtual,
        BigDecimal metaArrecadacao,
        List<AgendamentoResumoDTO> agendamentosDoDia
) {}