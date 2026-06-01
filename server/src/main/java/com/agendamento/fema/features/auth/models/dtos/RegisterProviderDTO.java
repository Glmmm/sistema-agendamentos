package com.agendamento.fema.features.auth.models.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.hibernate.validator.constraints.br.CNPJ;

public record RegisterProviderDTO(
        @NotBlank(message = "O formulário não pode ser vazio") @Email(message = "O login deve ser um e-mail válido") String email,
        @NotBlank(message = "A senha não pode ser vazia") @Size(min = 8, message = "A senha deve ter no mínimo 8 caracteres") String password,
        @NotNull(message = "O ID do cargo (role) é obrigatório") Long roleId,
        @CNPJ(message = "O cnpj não pode ser vazio") String cnpj,
        @NotBlank(message = "O endereco não pode ser vazio") String endereco,
        @NotBlank(message = "O telefone não pode ser vazio") String telefone,
        @NotBlank(message = "O nome não pode ser vazio") String nome
) implements RegisterDTO {}