package de.brightslearning.boersebackend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.UUID;

@Entity
@Table(name = "transaktionen")
@Data
public class Transaktion {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "auftrag_id", nullable = false)
    private Auftrag auftrag;

    @ManyToOne
    @JoinColumn(name = "benutzer_id", nullable = false)
    private Benutzer benutzer;

    @ManyToOne
    @JoinColumn(name = "aktie_id", nullable = false)
    private Aktie aktie;

    @Enumerated(EnumType.STRING)
    @Column(name = "transaktionstyp", nullable = false)
    private Transaktionstyp transaktionstyp;

    @Column(nullable = false)
    private Integer menge;

    @Column(nullable = false)
    private BigDecimal preis;

    @Column(name = "zeitstempel")
    private ZonedDateTime zeitstempel;

    @PrePersist
    protected void onCreate() {
        zeitstempel = ZonedDateTime.now();
    }
}