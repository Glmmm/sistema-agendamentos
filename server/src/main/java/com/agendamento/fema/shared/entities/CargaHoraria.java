package com.agendamento.fema.shared.entities;

import com.agendamento.fema.shared.enums.DiasSemana;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class CargaHoraria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "profissional_id")
    private Profissional profissional;

    @Enumerated(EnumType.STRING)
    private DiasSemana diaSemana;

    private LocalTime horaInicio;
    private LocalTime horaFim;
    private Integer intervaloAtendimento;
}