package com.agendamento.fema.features.client.controllers;

import com.agendamento.fema.features.client.models.dtos.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.agendamento.fema.features.client.services.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RequestMapping("/catalogo")
@RestController
public class CatalogoController {

    @Autowired
    private CatalogoService catalogoService;

    @GetMapping("/{clienteId}")
    public ResponseEntity<HomeResponseDTO> getHomeData(@PathVariable Long clienteId) {
        return ResponseEntity.ok(catalogoService.getHomeDados(clienteId));
    }

    @GetMapping("/empresas")
    public ResponseEntity<List<EmpresaResumoDTO>> getEmpresas() {
        return ResponseEntity.ok(catalogoService.listarEmpresas());
    }

    @GetMapping("/empresas/{empresaId}/profissionais")
    public ResponseEntity<List<ProfissionalResumoDTO>> getProfissionaisByEmpresa(@PathVariable Long empresaId) {
        return ResponseEntity.ok(catalogoService.listarProfissionaisPorEmpresa(empresaId));
    }

    @GetMapping("/profissionais/{profissionalId}/disponibilidade")
    public ResponseEntity<List<LocalTime>> getHorariosDisponiveis(
            @PathVariable Long profissionalId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate data) {
        return ResponseEntity.ok(catalogoService.calcularHorariosDisponiveis(profissionalId, data));
    }

    @GetMapping("/profissionais/{profissionalId}/servicos")
    public ResponseEntity<List<TipoServicoResumoDTO>> getServicosByProfissional(@PathVariable Long profissionalId) {
        return ResponseEntity.ok(catalogoService.listarServicosPorProfissional(profissionalId));
    }

    @PostMapping("/agendamento")
    public ResponseEntity<AgendamentoResponseDTO> realizarAgendamento(@RequestBody AgendamentoDTO agendamentoDTO) {
        AgendamentoResponseDTO response = catalogoService.realizarAgendamento(agendamentoDTO);
        return ResponseEntity.ok(response);
    }
}