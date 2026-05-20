package com.agendamento.fema.features.auth.models.dtos;

import com.agendamento.fema.shared.models.enums.Roles;

public record RegisterDTO(String login, String password, Long roleId) {
}
