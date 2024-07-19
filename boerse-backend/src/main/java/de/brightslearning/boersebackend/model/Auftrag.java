package de.brightslearning.boersebackend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.UUID;

@Entity
@Table(name = "auftraege")
@Data
public class Auftrag {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "benutzer_id", nullable = false)
    private Benutzer benutzer;

    @ManyToOne
    @JoinColumn(name = "aktie_id", nullable = false)
    private Aktie aktie;

    @Enumerated(EnumType.STRING)
    @Column(name = "auftragstyp", nullable = false)
    private Auftragstyp auftragstyp;

    @Column(nullable = false)
    private Integer menge;

    @Column(nullable = false)
    private BigDecimal preis;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Auftragsstatus status;

    @Column(name = "erstellt_am")
    private ZonedDateTime erstelltAm;

    @Column(name = "aktualisiert_am")
    private ZonedDateTime aktualisiertAm;

    @PrePersist
    protected void onCreate() {
        erstelltAm = ZonedDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        aktualisiertAm = ZonedDateTime.now();
    }
}