package com.agendamento.fema.shared.repositories;

import com.agendamento.fema.shared.entities.Profissional;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProfissionalRepository extends JpaRepository<Profissional, Long> {
    List<Profissional> findByEmpresaId(Long empresaId);

    List<Profissional> findByEmpresaIdAndAtivoTrue(Long empresaId, boolean ativo);
}

