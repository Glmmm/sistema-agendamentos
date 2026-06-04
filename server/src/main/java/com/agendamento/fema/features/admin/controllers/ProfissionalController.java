package com.agendamento.fema.features.admin.controllers;

import com.agendamento.fema.features.admin.models.dtos.ProfissionalDTO;
import com.agendamento.fema.features.admin.models.dtos.ProfissionalResponseDTO;
import com.agendamento.fema.features.admin.services.ProfissionalService;
import com.agendamento.fema.shared.entities.Usuario;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/profissionais")
@RequiredArgsConstructor
public class ProfissionalController {

    private final ProfissionalService profissionalService;

    @GetMapping("/empresa/{empresaId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'CLIENTE')")
    public ResponseEntity<?> listarPorEmpresa(@PathVariable Long empresaId) {
        try {
            List<ProfissionalResponseDTO> profissionais = profissionalService.listarPorEmpresa(empresaId);
            return ResponseEntity.ok(profissionais);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'CLIENTE')")
    public ResponseEntity<?> buscarPorId(@AuthenticationPrincipal Usuario usuarioLogado, @PathVariable Long id) {
        try {
            ProfissionalResponseDTO profissional = profissionalService.buscarPorId(usuarioLogado.getId(), id);
            return ResponseEntity.ok(profissional);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        }
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> cadastrar(@AuthenticationPrincipal Usuario usuarioLogado, @RequestBody ProfissionalDTO dto) {
        ProfissionalResponseDTO novoProfissional = profissionalService.cadastrar(usuarioLogado.getId(), dto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> atualizar(@AuthenticationPrincipal Usuario usuarioLogado, @PathVariable Long id, @RequestBody ProfissionalDTO dto) {
        try {
            ProfissionalResponseDTO atualizado = profissionalService.atualizar(usuarioLogado.getId(), id, dto);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deletar(@AuthenticationPrincipal Usuario usuarioLogado, @PathVariable Long id) {
        try {
            profissionalService.deletar(usuarioLogado.getId(), id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        }
    }
}