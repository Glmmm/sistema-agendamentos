package com.agendamento.fema.shared.enums;

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

