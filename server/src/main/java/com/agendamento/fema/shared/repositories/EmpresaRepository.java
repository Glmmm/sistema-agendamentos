package com.agendamento.fema.shared.repositories;

import com.agendamento.fema.shared.entities.Empresa;
import com.agendamento.fema.shared.entities.Usuario;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface EmpresaRepository extends JpaRepository<Empresa, Long> {
    Optional<Empresa> findByUsuario(Usuario usuario);
}
