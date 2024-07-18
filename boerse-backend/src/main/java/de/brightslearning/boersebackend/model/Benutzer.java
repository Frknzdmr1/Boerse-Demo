package de.brightslearning.boersebackend.model;

import jakarta.persistence.*;
import java.time.ZonedDateTime;
import java.util.UUID;


@Entity
@Table(name = "benutzer")
public class Benutzer {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, unique = true)
    private String benutzername;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String passwort;

    @Column(nullable = false)
    private String kontotyp;

    @Column(name = "erstellt_am", nullable = false)
    private ZonedDateTime erstelltAm;

    @Column(name = "aktualisiert_am", nullable = false)
    private ZonedDateTime aktualisiertAm;


    // Constructors

    public Benutzer() {

    };

    public Benutzer(UUID id, String benutzername, String email, String passwort, String kontotyp, ZonedDateTime erstelltAm, ZonedDateTime aktualisiertAm) {
        this.id = id;
        this.benutzername = benutzername;
        this.email = email;
        this.passwort = passwort;
        this.kontotyp = kontotyp;
        this.erstelltAm = erstelltAm;
        this.aktualisiertAm = aktualisiertAm;
    }

    // Getters and setters

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getBenutzername() {
        return benutzername;
    }

    public void setBenutzername(String benutzername) {
        this.benutzername = benutzername;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPasswort() {
        return passwort;
    }

    public void setPasswort(String passwort) {
        this.passwort = passwort;
    }

    public String getKontotyp() {
        return kontotyp;
    }

    public void setKontotyp(String kontotyp) {
        this.kontotyp = kontotyp;
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
