package com.agendamento.fema.features.agendamento.controllers;

import com.agendamento.fema.features.agendamento.models.dtos.AgendamentosDTO;
import com.agendamento.fema.features.agendamento.services.AgendamentosService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/agendamentos")
public class AgendamentosController {

    @Autowired
    private AgendamentosService agendamentosService;

    @GetMapping( "/listar")
    public List<AgendamentosDTO> listarAgendamentos(@RequestParam Long idCliente){
    return  agendamentosService.listarAgendamentos(idCliente);
    }

//    @PostMapping("/criar")
//    public void criarAgendamentos(@RequestBody AgendamentosDTO agendamentoDTO){
//         agendamentosService.criarAgendamento(agendamentoDTO);
//    }
}
