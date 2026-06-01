package com.agendamento.fema.shared.repositories;

import com.agendamento.fema.shared.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
}
