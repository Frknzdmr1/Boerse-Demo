package de.brightslearning.boersebackend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.UUID;

@Entity
@Table(name = "aktien")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Aktie {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(nullable = false, unique = true)
    private String symbol;

    @Column(nullable = false)
    private String firmenname;

    private String markt;
    private String sektor;

    @Column(name = "aktueller_preis")
    private BigDecimal aktuellerPreis;

    @Column(name = "zuletzt_aktualisiert")
    private ZonedDateTime zuletztAktualisiert;
}
