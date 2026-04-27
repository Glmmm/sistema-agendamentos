package com.agendamento.fema.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Feedback {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @OneToOne
    @JoinColumn(name = "agendamento_id")
    private Agendamento agendamento;

    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;

    private Integer nota; // 1 a 5
    private String comentario;
    private LocalDateTime dataAvaliacao = LocalDateTime.now();
}