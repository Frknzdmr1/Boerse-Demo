package de.brightslearning.boersebackend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.ZonedDateTime;
import java.util.UUID;

@Entity
@Table(name = "beobachtungslisten")
public class Beobachtungsliste {
    @Getter
    @Setter
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private Integer id;

    @Setter
    @Getter
    @Column(name = "benutzer_id", nullable = false)
    private UUID benutzerId;

    @Column(name = "name", nullable = false)
    @Setter
    @Getter
    private String name;
    @Column(name = "erstellt_am", nullable = false)
    @Setter
    @Getter
    private ZonedDateTime erstelltAm;
    @Column(name = "aktualisiert_am")
    @Setter
    @Getter
    private ZonedDateTime aktualisiertAm;

    // Constructors
    public Beobachtungsliste() {
    }

    public Beobachtungsliste(UUID benutzerId, String name, ZonedDateTime erstelltAm) {
        this.benutzerId = benutzerId;
        this.name = name;
        this.erstelltAm = erstelltAm;
    }
       public Beobachtungsliste(String name, ZonedDateTime erstelltAm) {
        this.name = name;
        this.erstelltAm = erstelltAm;
    }


}

