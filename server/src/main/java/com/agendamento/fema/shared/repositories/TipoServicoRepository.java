package com.agendamento.fema.shared.repositories;

import com.agendamento.fema.shared.entities.TipoServico;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TipoServicoRepository extends JpaRepository<TipoServico, Long> {
    List<TipoServico> findByProfissionalId(Long profissionalId);
}