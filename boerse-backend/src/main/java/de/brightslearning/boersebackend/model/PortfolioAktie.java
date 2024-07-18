package de.brightslearning.boersebackend.model;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.util.UUID;

@Entity
@Table(name = "portfolio_aktien")
@Data
public class PortfolioAktie {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    //@ManyToOne
    //@JoinColumn(name = "portfolio_id", nullable = false)
    //private Portfolio portfolio;

    //@ManyToOne
    //@JoinColumn(name = "aktie_id", nullable = false)
    //private Aktie aktie;

    @Column(nullable = false)
    private Integer menge;

    @Column(name = "durchschnittlicher_kaufpreis", nullable = false)
    private BigDecimal durchschnittlicherKaufpreis;
}
