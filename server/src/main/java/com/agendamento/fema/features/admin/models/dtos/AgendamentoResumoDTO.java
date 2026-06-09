package com.agendamento.fema.features.admin.models.dtos;

import java.time.LocalDate;
import java.time.LocalTime;

public record AgendamentoResumoDTO(
        Long id,
        String nomeCliente,
        String nomeEmpresa,
        String nomeProfissional,
        String nomeServico,
        LocalDate data,
        LocalTime horaInicio,
        String status
) {}