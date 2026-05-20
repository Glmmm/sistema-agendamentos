package com.agendamento.fema.features.agendamento.services;

import com.agendamento.fema.features.agendamento.models.dtos.AgendamentosDTO;
import com.agendamento.fema.features.agendamento.repositories.AgendamentosRepository;
import com.agendamento.fema.shared.models.entities.Agendamento;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AgendamentosService {

    private final AgendamentosRepository agendamentosRepository;

    public AgendamentosService(AgendamentosRepository agendamentosRepository) {
    this.agendamentosRepository = agendamentosRepository;
    }

    public List<AgendamentosDTO> listarAgendamentos(Long idCliente) {
        List<Agendamento> agendamentos = agendamentosRepository.findAllByClienteId(idCliente);
        if(agendamentos.isEmpty()){
            return null;
        }
        return AgendamentosDTO.converter(agendamentos);
    }

    
}
