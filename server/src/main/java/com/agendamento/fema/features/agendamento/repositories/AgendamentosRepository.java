package com.agendamento.fema.features.agendamento.repositories;

import com.agendamento.fema.shared.models.entities.Agendamento;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AgendamentosRepository extends JpaRepository<Agendamento, Long> {
    List<Agendamento> findAllByClienteId(Long idCliente);
}
