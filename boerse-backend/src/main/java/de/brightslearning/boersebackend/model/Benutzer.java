package de.brightslearning.boersebackend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.ZonedDateTime;
import java.util.UUID;

@Entity
@Table(name = "benutzer")
@Data
public class Benutzer {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(nullable = false, unique = true)
    private String benutzername;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String passwort;

    private String kontotyp;

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