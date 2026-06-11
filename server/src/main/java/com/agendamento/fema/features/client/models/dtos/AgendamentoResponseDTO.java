package com.agendamento.fema.features.client.models.dtos;


import java.time.LocalDate;
import java.time.LocalTime;

public record AgendamentoResponseDTO(
        Long id,
        String observacao,
        String nomeEmpresa,
        String nomeServico,
        String nomeProfissional,
        String status,
        LocalDate data,
        LocalTime horaInicio,
        LocalTime horaFim,
        String precoRegistrado
) {}