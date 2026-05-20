package com.agendamento.fema.features.auth.models.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record RegisterDTO(@NotBlank(message = "O login não pode ser vazio")
    @Email(message = "O login deve ser um e-mail válido")
    String login,

    @NotBlank(message = "A senha não pode ser vazia")
    @Size(min = 8, message = "A senha deve ter no mínimo 8 caracteres")
    String password,

    @NotNull(message = "O ID do cargo (role) é obrigatório")
    Long roleId) {

}
