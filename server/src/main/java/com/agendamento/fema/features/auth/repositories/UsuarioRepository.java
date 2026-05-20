package com.agendamento.fema.features.auth.repositories;

import com.agendamento.fema.shared.models.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

public interface UsuarioRepository extends JpaRepository<Usuario, String> {
    UserDetails findByLogin(String login);

}
