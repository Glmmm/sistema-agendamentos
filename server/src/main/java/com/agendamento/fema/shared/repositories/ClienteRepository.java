package com.agendamento.fema.shared.repositories;

import com.agendamento.fema.shared.entities.Cliente;
import com.agendamento.fema.shared.entities.Usuario;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    Optional<Cliente> findByUsuario(Usuario usuario);
}
