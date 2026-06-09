package com.agendamento.fema.features.client.models.dtos;


import java.util.List;

public record HomeResponseDTO(
        List<AgendamentoResponseDTO> agendamentosRealizados,
        List<EmpresaResumoDTO> empresasQueAgendou,
        List<EmpresaPopularidadeDTO> empresasMaisPopulares
) {}