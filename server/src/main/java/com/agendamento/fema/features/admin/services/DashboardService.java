package com.agendamento.fema.features.admin.services;

import com.agendamento.fema.features.admin.models.dtos.AgendamentoResumoDTO;
import com.agendamento.fema.features.admin.models.dtos.DashboardResponseDTO;
import com.agendamento.fema.shared.entities.Agendamento;
import com.agendamento.fema.shared.enums.StatusAgendamento;
import com.agendamento.fema.shared.repositories.AgendamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DashboardService {

    @Autowired
    private AgendamentoRepository agendamentoRepository;

    public DashboardResponseDTO obterMetricasPainel(Long empresaId) {
        List<Agendamento> agendamentos = agendamentoRepository.findAllByProfissionalEmpresaId(empresaId);

        long pendentes = agendamentos.stream().filter(a -> a.getStatus() == StatusAgendamento.PENDENTE).filter(a -> a.getData().isAfter(LocalDate.now()) ).count();

        long confirmados = agendamentos.stream().filter(a -> a.getStatus() == StatusAgendamento.CONFIRMADO).count();

        long concluidos = agendamentos.stream().filter(a -> a.getStatus() == StatusAgendamento.CONCLUIDO).count();

        BigDecimal faturamentoAtual = agendamentos.stream().filter(a -> a.getStatus() == StatusAgendamento.CONCLUIDO && a.getPrecoRegistrado() != null).map(a -> {
            try {
                return new BigDecimal(a.getPrecoRegistrado());
            } catch (NumberFormatException e) {
                return BigDecimal.ZERO;
            }
        }).reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal metaArrecadacao = new BigDecimal("15000.00");

        LocalDate hoje = LocalDate.now();

        List<AgendamentoResumoDTO> agendamentosDoDia = agendamentos.stream().filter(a -> a.getData() != null && a.getData().equals(hoje)).sorted(Comparator.comparing(Agendamento::getHoraInicio)).map(this::converterParaDTO).collect(Collectors.toList());

        return new DashboardResponseDTO(pendentes, confirmados, concluidos, faturamentoAtual, metaArrecadacao, agendamentosDoDia);
    }

    private AgendamentoResumoDTO converterParaDTO(Agendamento agendamento) {
        String nomeEmpresa = (agendamento.getProfissional() != null && agendamento.getProfissional().getEmpresa() != null) ? agendamento.getProfissional().getEmpresa().getNome() : null;

        String nomeProfissional = (agendamento.getProfissional() != null) ? agendamento.getProfissional().getNome() : null;

        String nomeServico = (agendamento.getTipoServico() != null) ? agendamento.getTipoServico().getNome() : null;

        String nomeCliente = (agendamento.getCliente().getNome() != null) ? agendamento.getCliente().getNome() : null;

        return new AgendamentoResumoDTO(agendamento.getId(), nomeCliente, nomeEmpresa, nomeProfissional, nomeServico, agendamento.getData(), agendamento.getHoraInicio(), agendamento.getStatus().name());
    }
}