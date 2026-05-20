package com.agendamento.fema.shared.models.entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Feedback {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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