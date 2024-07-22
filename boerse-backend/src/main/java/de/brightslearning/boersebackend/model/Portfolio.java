package de.brightslearning.boersebackend.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "portfolios")
@Data
public class Portfolio {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "benutzer_id", nullable = false)
    private Benutzer benutzer;

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
