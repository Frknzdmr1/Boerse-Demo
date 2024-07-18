package de.brightslearning.boersebackend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.UUID;

@Entity
@Table(name = "auftraege")
public class Auftraege {

    @Setter
    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "benutzer_id", nullable = false)
    private Benutzer benutzer;

    @Column(name = "aktie_id", nullable = false)
    private UUID aktieId;

    @Column(name = "auftragstyp", nullable = false)
    private String auftragstyp;

    @Column(nullable = false)
    private Integer menge;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal preis;

    @Column(nullable = false)
    private String status;

    @Column(name = "erstellt_am", nullable = false)
    private ZonedDateTime erstelltAm;

    @Column(name = "aktualisiert_am", nullable = false)
    private ZonedDateTime aktualisiertAm;

    // Constructors

    public Auftraege() {

    }

    public Auftraege(UUID id, Benutzer benutzer, UUID aktieId, String auftragstyp, Integer menge, BigDecimal preis, String status, ZonedDateTime erstelltAm, ZonedDateTime aktualisiertAm) {
        this.id = id;
        this.benutzer = benutzer;
        this.aktieId = aktieId;
        this.auftragstyp = auftragstyp;
        this.menge = menge;
        this.preis = preis;
        this.status = status;
        this.erstelltAm = erstelltAm;
        this.aktualisiertAm = aktualisiertAm;
    }

    // Getters and setters

    public Benutzer getBenutzer() {
        return benutzer;
    }

    public void setBenutzer(Benutzer benutzer) {
        this.benutzer = benutzer;
    }

    public UUID getAktieId() {
        return aktieId;
    }

    public void setAktieId(UUID aktieId) {
        this.aktieId = aktieId;
    }

    public String getAuftragstyp() {
        return auftragstyp;
    }

    public void setAuftragstyp(String auftragstyp) {
        this.auftragstyp = auftragstyp;
    }

    public Integer getMenge() {
        return menge;
    }

    public void setMenge(Integer menge) {
        this.menge = menge;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public BigDecimal getPreis() {
        return preis;
    }

    public void setPreis(BigDecimal preis) {
        this.preis = preis;
    }

    public ZonedDateTime getErstelltAm() {
        return erstelltAm;
    }

    public void setErstelltAm(ZonedDateTime erstelltAm) {
        this.erstelltAm = erstelltAm;
    }

    public ZonedDateTime getAktualisiertAm() {
        return aktualisiertAm;
    }

    public void setAktualisiertAm(ZonedDateTime aktualisiertAm) {
        this.aktualisiertAm = aktualisiertAm;
    }

}
