package com.agendamento.fema.features.admin.models.dtos;

import com.agendamento.fema.shared.enums.DiasSemana;
import java.time.LocalTime;

public record CargaHorariaResponseDTO(
        Long id,
        Long profissionalId,
        String profissionalNome,
        DiasSemana diaSemana,
        LocalTime horaInicio,
        LocalTime horaFim,
        Integer intervaloAtendimento
) {}