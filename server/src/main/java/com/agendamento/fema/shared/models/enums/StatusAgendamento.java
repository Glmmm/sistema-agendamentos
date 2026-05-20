package com.agendamento.fema.shared.models.enums;

public enum StatusAgendamento {
    PENDENTE("pendente"),
    CONFIRMADO("confirmado"),
    CANCELADO("cancelado"),
    CONCLUIDO("concluido");

    private String descricao;
    StatusAgendamento(String descricao) {
        this.descricao = descricao;
    }
}

