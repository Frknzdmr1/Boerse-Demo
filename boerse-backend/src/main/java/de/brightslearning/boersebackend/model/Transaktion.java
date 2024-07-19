package de.brightslearning.boersebackend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.UUID;

@Entity
@Table(name = "transaktionen")
public class Transaktion {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "auftrag_id", nullable = false)
     private Auftrag auftrag;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "benutzer_id", nullable = false)
    private Benutzer benutzer;

    @Column(name = "aktie_id", nullable = false)
    private UUID aktieId;

    @Column(name = "transaktionstyp", nullable = false)
    @Setter
    @Getter
    private String transaktionstyp;

    @Column(nullable = false)
    @Setter
    @Getter
    private Integer menge;

    @Column(nullable = false, precision = 10, scale = 2)
    @Setter
    @Getter
    private BigDecimal preis;

    @Column(name = "zeitstempel", nullable = false)
    @Setter
    @Getter
    private ZonedDateTime zeitstempel;


    // Constructors
    public Transaktion() {

    }

    public Transaktion(Auftrag auftrag, Benutzer benutzer, UUID aktieId, String transaktionstyp,
                       Integer menge, BigDecimal preis, ZonedDateTime zeitstempel) {
        this.auftrag = auftrag;
        this.benutzer = benutzer;
        this.aktieId = aktieId;
        this.transaktionstyp = transaktionstyp;
        this.menge = menge;
        this.preis = preis;
        this.zeitstempel = zeitstempel;
    }


}
