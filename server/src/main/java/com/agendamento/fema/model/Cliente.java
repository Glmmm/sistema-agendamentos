package com.agendamento.fema.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.UUID;
import java.util.List;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Cliente {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String nome;
    private String telefone;
    private String email;

    @Column(updatable = false)
    private LocalDateTime dataCadastro = LocalDateTime.now();

    @OneToMany(mappedBy = "cliente")
    private List<Agendamento> agendamentos;
}