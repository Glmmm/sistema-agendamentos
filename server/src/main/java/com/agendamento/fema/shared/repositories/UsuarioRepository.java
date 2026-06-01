package com.agendamento.fema.shared.repositories;

import com.agendamento.fema.shared.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

public interface UsuarioRepository extends JpaRepository<Usuario, String> {
    UserDetails findByLogin(String login);

}
