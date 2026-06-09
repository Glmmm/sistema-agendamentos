package com.agendamento.fema.features.admin.models.dtos;

import com.agendamento.fema.shared.enums.DiasSemana;
import java.time.LocalTime;
import java.util.List;

public record CargaHorariaDTO(
        Long profissionalId,
        List<DiasSemana> diasSemana,
        LocalTime horaInicio,
        LocalTime horaFim,
        Integer intervaloAtendimento
) {}