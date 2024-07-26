package de.brightslearning.boersebackend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "benutzer")
@NoArgsConstructor
@Data
@AllArgsConstructor
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

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable( name = "benutzer_rollen",
            joinColumns = @JoinColumn(name = "benutzer_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn( name = "role_id", referencedColumnName = "id"))
    private List<UserRolle> userRollen = new ArrayList<>();

    @PrePersist
    protected void onCreate() {
        erstelltAm = ZonedDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        aktualisiertAm = ZonedDateTime.now();
    }
}
