package com.agendamento.fema.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.UUID;
import java.util.List;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Empresa {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String nome;
    private String cnpj;
    private String telefone;
    private String endereco;

    @OneToMany(mappedBy = "empresa")
    private List<Profissional> profissionais;
}