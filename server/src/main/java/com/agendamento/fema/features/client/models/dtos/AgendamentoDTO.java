package com.agendamento.fema.features.client.models.dtos;


public record AgendamentoDTO(
        Long clienteId,
        Long profissionalId,
        Long servicoId,
        String dataSelecionada,
        String horaInicio,
        String observacao,
        String precoRegistrado
) {}