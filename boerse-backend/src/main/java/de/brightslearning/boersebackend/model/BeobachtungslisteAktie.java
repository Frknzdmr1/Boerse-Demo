package de.brightslearning.boersebackend.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.ZonedDateTime;
import java.util.UUID;

@Entity
@Table(name = "beobachtungslisten_aktien")
@Data
public class BeobachtungslisteAktie {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "beobachtungsliste_id", nullable = false)
    private Beobachtungsliste beobachtungsliste;

    @ManyToOne
    @JoinColumn(name = "aktie_id", nullable = false)
    private Aktie aktie;

    @Column(name = "hinzugefuegt_am")
    private ZonedDateTime hinzugefuegtAm;

    @PrePersist
    protected void onCreate() {
        hinzugefuegtAm = ZonedDateTime.now();
    }
}

