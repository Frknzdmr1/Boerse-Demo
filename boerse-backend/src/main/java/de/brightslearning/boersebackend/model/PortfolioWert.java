package de.brightslearning.boersebackend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.UUID;

@Entity
@Table(name = "portfolio_werte")
@Data
public class PortfolioWert {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "portfolio_id", nullable = false)
    private Portfolio portfolio;

    @Column(name = "datum", nullable = false)
    private ZonedDateTime datum;

    @Column(name = "aktie_menge", nullable = false)
    private Integer aktieMenge;

    @Column(name = "aktie_wert", nullable = false)
    private BigDecimal aktieWert;
}
