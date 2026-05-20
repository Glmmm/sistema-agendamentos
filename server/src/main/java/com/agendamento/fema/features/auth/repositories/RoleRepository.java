package com.agendamento.fema.features.auth.repositories;

import com.agendamento.fema.shared.models.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
}
