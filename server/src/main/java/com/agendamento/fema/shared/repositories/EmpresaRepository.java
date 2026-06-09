package com.agendamento.fema.shared.repositories;

import com.agendamento.fema.features.client.models.dtos.EmpresaPopularidadeDTO;
import com.agendamento.fema.shared.entities.Empresa;
import com.agendamento.fema.shared.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface EmpresaRepository extends JpaRepository<Empresa, Long> {
    Optional<Empresa> findByUsuario(Usuario usuario);

    @Query("SELECT DISTINCT p.empresa FROM Agendamento a JOIN a.profissional p WHERE a.cliente.id = :clienteId")
    List<Empresa> findEmpresasOndeClienteAgendou(@Param("clienteId") Long clienteId);

    @Query("SELECT new com.agendamento.fema.features.client.models.dtos.EmpresaPopularidadeDTO(e.id, e.nome, COUNT(a)) " + "FROM Agendamento a " + "JOIN a.profissional p " + "JOIN p.empresa e " + "WHERE a.status = com.agendamento.fema.shared.enums.StatusAgendamento.CONCLUIDO " + "GROUP BY e.id, e.nome " + "ORDER BY COUNT(a) DESC")
    List<EmpresaPopularidadeDTO> findEmpresasMaisPopulares();

}
