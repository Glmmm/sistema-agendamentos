package com.agendamento.fema.model;

import com.agendamento.fema.model.enums.StatusAgendamento;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalTime;
import java.util.UUID;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Agendamento {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "carga_horaria_id")
    private CargaHoraria cargaHoraria;

    @ManyToOne
    @JoinColumn(name = "tipo_servico_id")
    private TipoServico tipoServico;

    @ManyToOne
    @JoinColumn(name = "profissional_id")
    private Profissional profissional;

    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;

    private LocalTime horaInicio;
    private LocalTime horaFim;

    @Enumerated(EnumType.STRING)
    private StatusAgendamento status;

    private String descricao;

    @OneToOne(mappedBy = "agendamento")
    private Feedback feedback;
}