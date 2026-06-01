package com.agendamento.fema.shared.entities;

import com.agendamento.fema.features.auth.models.dtos.RegisterClientDTO;
import jakarta.persistence.*;
import lombok.*;

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

    @OneToMany(mappedBy = "cliente")
    private List<Agendamento> agendamentos;

    public Cliente(Usuario usuarioSalvo, RegisterClientDTO clientForm) {
        this.usuario = usuarioSalvo;
        this.nome = clientForm.nome();
        this.telefone = clientForm.telefone();
    }
}