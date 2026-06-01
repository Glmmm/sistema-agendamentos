package com.agendamento.fema.features.admin.controllers;

import com.agendamento.fema.features.admin.models.dtos.TipoServicoDTO;
import com.agendamento.fema.features.admin.models.dtos.TipoServicoResponseDTO;
import com.agendamento.fema.features.admin.services.TipoServicoService;
import com.agendamento.fema.shared.entities.Usuario;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/servicos")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
public class TipoServicoController {

    private final TipoServicoService tipoServicoService;

    @GetMapping("/profissional/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'CLIENTE')")
    public ResponseEntity<?> listarPorProfissional(@AuthenticationPrincipal Usuario usuarioLogado, @PathVariable Long id) {
        List<TipoServicoResponseDTO> servicos = tipoServicoService.listarPorProfissional(id);
        return ResponseEntity.ok(servicos);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'CLIENTE')")
    public ResponseEntity<?> buscarPorId(@AuthenticationPrincipal Usuario usuarioLogado, @PathVariable Long id) {
        try {
            TipoServicoResponseDTO servico = tipoServicoService.buscarPorId(usuarioLogado.getId(), id);
            return ResponseEntity.ok(servico);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        }
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<?> cadastrar(@AuthenticationPrincipal Usuario usuarioLogado, @RequestBody TipoServicoDTO dto) {
        try {
            TipoServicoResponseDTO novoServico = tipoServicoService.cadastrar(usuarioLogado.getId(), dto);
            return ResponseEntity.status(HttpStatus.CREATED).body(novoServico);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<?> atualizar(@AuthenticationPrincipal Usuario usuarioLogado, @PathVariable Long id, @RequestBody TipoServicoDTO dto) {
        try {
            TipoServicoResponseDTO atualizado = tipoServicoService.atualizar(usuarioLogado.getId(), id, dto);
            return ResponseEntity.ok(atualizado);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<?> deletar(@AuthenticationPrincipal Usuario usuarioLogado, @PathVariable Long id) {
        try {
            tipoServicoService.deletar(usuarioLogado.getId(), id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        }
    }
}
