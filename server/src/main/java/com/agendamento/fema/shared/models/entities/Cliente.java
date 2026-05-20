package com.agendamento.fema.shared.models.entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Cliente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;
    private String nome;
    private String telefone;

    @Column(updatable = false)
    private LocalDateTime dataCadastro = LocalDateTime.now();

    @OneToMany(mappedBy = "cliente")
    private List<Agendamento> agendamentos;
}