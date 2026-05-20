package com.agendamento.fema.shared.models.entities;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Empresa {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    private String nome;
    private String cnpj;
    private String telefone;
    private String endereco;

    @OneToMany(mappedBy = "empresa")
    private List<Profissional> profissionais;
}