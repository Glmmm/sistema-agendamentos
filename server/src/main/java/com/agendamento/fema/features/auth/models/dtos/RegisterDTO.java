package com.agendamento.fema.features.auth.models.dtos;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

@JsonTypeInfo(
        use = JsonTypeInfo.Id.NAME,
        include = JsonTypeInfo.As.EXISTING_PROPERTY,
        property = "roleId",
        visible = true
)

@JsonSubTypes({
        @JsonSubTypes.Type(value = RegisterClientDTO.class, name = "3"),
        @JsonSubTypes.Type(value = RegisterProviderDTO.class, name = "2")
})
public interface RegisterDTO {
    String email();
    String password();
    Long roleId();
}