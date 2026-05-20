package com.agendamento.fema.features.agendamento.models.dtos;

import com.agendamento.fema.shared.models.entities.Agendamento;

import java.util.List;
import java.util.stream.Collectors;

public class AgendamentosDTO {

    public AgendamentosDTO(Agendamento agendamento) {

    }
    
    public static List<AgendamentosDTO> converter(List<Agendamento> agendamentos){
        return agendamentos.stream().map(AgendamentosDTO::new).collect(Collectors.toList());
    }
}
