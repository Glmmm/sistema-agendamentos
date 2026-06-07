package com.agendamento.fema.shared.repositories;

import com.agendamento.fema.shared.entities.TipoServico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface TipoServicoRepository extends JpaRepository<TipoServico, Long> {

    List<TipoServico> findByProfissionalId(Long profissionalId);

    List<TipoServico> findByProfissionalEmpresaId(Long empresaId);
}