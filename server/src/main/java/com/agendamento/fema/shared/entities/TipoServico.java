package com.agendamento.fema.shared.entities;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class TipoServico {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String descricao;
    private BigDecimal preco;

    @ManyToOne
    @JoinColumn(name = "profissional_id")
    private Profissional profissional;

}