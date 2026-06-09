package com.agendamento.fema.shared.repositories;

import com.agendamento.fema.shared.entities.CargaHoraria;
import com.agendamento.fema.shared.enums.DiasSemana;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CargaHorariaRepository extends JpaRepository<CargaHoraria, Long> {
    List<CargaHoraria> findByProfissionalId(Long profissionalId);

    @Query("SELECT ch FROM CargaHoraria ch WHERE ch.profissional.empresa.id = :empresaId")
    List<CargaHoraria> findByEmpresaId(@Param("empresaId") Long empresaId);

    List<CargaHoraria> findByProfissionalIdAndDiaSemana(Long profissionalId, DiasSemana diaSemana);

}
