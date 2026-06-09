package com.agendamento.fema.shared.repositories;

import com.agendamento.fema.shared.entities.Agendamento;
import com.agendamento.fema.shared.enums.StatusAgendamento;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface AgendamentoRepository extends JpaRepository<Agendamento, Long> {

    List<Agendamento> findByClienteIdOrderByDataDescHoraInicioDesc(Long clienteId);

    List<Agendamento> findByProfissionalIdAndDataAndStatusNot(Long profissionalId, LocalDate data, StatusAgendamento status);

    List<Agendamento> findAllByProfissionalEmpresaId(Long profissionalEmpresaId);

}