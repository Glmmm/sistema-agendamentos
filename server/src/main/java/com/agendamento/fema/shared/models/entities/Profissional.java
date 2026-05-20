package com.agendamento.fema.shared.models.entities;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Profissional {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "empresa_id")
    private Empresa empresa;

    private String nome;
    private String email;
    private String telefone;
    private boolean ativo;

    @OneToMany(mappedBy = "profissional")
    private List<CargaHoraria> cargasHorarias;

    @OneToMany(mappedBy = "profissional")
    private List<TipoServico> servicos;
}