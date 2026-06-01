package com.agendamento.fema.features.admin.models.dtos;

import com.agendamento.fema.shared.enums.DiasSemana;
import java.time.LocalTime;

public record CargaHorariaDTO(
        Long profissionalId,
        DiasSemana diaSemana,
        LocalTime horaInicio,
        LocalTime horaFim,
        Integer intervaloAtendimento
) {}