package com.agendamento.fema.features.admin.controllers;

import com.agendamento.fema.features.admin.models.dtos.DashboardResponseDTO;
import com.agendamento.fema.features.admin.services.DashboardService;
import com.agendamento.fema.shared.entities.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/dashboard")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping
@PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<DashboardResponseDTO> listarDashboard(@AuthenticationPrincipal Usuario usuario) {

        DashboardResponseDTO dashboardDados = dashboardService.obterMetricasPainel(usuario.getId());

        return ResponseEntity.ok(dashboardDados);
    }
}