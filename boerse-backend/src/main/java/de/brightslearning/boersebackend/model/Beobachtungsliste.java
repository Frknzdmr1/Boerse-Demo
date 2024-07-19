package de.brightslearning.boersebackend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.ZonedDateTime;
import java.util.UUID;

@Entity
@Table(name = "beobachtungslisten")
@Data
public class Beobachtungsliste {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "benutzer_id", nullable = false)
    private Benutzer benutzer;

    @Column(nullable = false)
    private String name;

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
