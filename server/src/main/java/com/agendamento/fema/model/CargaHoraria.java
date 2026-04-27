package com.agendamento.fema.model;

import com.agendamento.fema.model.enums.DiaDaSemana;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalTime;
import java.util.UUID;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class CargaHoraria {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "profissional_id")
    private Profissional profissional;

    @Enumerated(EnumType.STRING)
    private DiaDaSemana diaSemana;

    private LocalTime horaInicio; // LocalTime mapeia strings 'HH:mm'
    private LocalTime horaFim;
    private Integer intervaloAtendimento; // em minutos
}