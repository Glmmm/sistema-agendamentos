package com.agendamento.fema.features.admin.controllers;


import com.agendamento.fema.features.admin.models.dtos.CargaHorariaDTO;
import com.agendamento.fema.features.admin.models.dtos.CargaHorariaResponseDTO;
import com.agendamento.fema.features.admin.services.CargaHorariaService;
import com.agendamento.fema.shared.entities.CargaHoraria;
import com.agendamento.fema.shared.entities.Usuario;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/cargas-horarias")
@RequiredArgsConstructor
public class CargaHorariaController {

    private final CargaHorariaService cargaHorariaService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'CLIENTE')")
    public ResponseEntity<?> listarTodas(@AuthenticationPrincipal Usuario usuarioLogado) {
        List<CargaHorariaResponseDTO> cargas = cargaHorariaService.listarTodas(usuarioLogado.getId());
        return ResponseEntity.ok(cargas);
    }

    @GetMapping("/profissional/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'CLIENTE')")
    public ResponseEntity<?> listarPorProfissionalId(@AuthenticationPrincipal Usuario usuarioLogado, Long id) {
        List<CargaHorariaResponseDTO> cargas = cargaHorariaService.listarPorProfissional(id);
        return ResponseEntity.ok(cargas);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'CLIENTE')")
    public ResponseEntity<?> buscarPorId(@AuthenticationPrincipal Usuario usuarioLogado, @PathVariable Long id) {
        try {
            CargaHorariaResponseDTO carga = cargaHorariaService.buscarPorId(usuarioLogado.getId(), id);
            return ResponseEntity.ok(carga);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        }
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> cadastrar(@AuthenticationPrincipal Usuario usuarioLogado, @RequestBody CargaHorariaDTO dto) {
        try {
            CargaHorariaResponseDTO novaCarga = cargaHorariaService.cadastrar(usuarioLogado.getId(), dto);
            return ResponseEntity.status(HttpStatus.CREATED).body(novaCarga);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> atualizar(@AuthenticationPrincipal Usuario usuarioLogado, @PathVariable Long id, @RequestBody CargaHorariaDTO dto) {
        try {
            CargaHorariaResponseDTO atualizada = cargaHorariaService.atualizar(usuarioLogado.getId(), id, dto);
            return ResponseEntity.ok(atualizada);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deletar(@AuthenticationPrincipal Usuario usuarioLogado, @PathVariable Long id) {
        try {
            cargaHorariaService.deletar(usuarioLogado.getId(), id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        }
    }
}