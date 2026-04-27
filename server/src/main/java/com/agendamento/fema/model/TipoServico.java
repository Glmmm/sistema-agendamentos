package com.agendamento.fema.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.util.UUID;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class TipoServico {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String nome;
    private String descricao;
    private BigDecimal preco;

    @ManyToOne
    @JoinColumn(name = "profissional_id")
    private Profissional profissional;

}