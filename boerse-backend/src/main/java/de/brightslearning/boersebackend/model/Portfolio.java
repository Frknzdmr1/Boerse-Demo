package de.brightslearning.boersebackend.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "portfolios")
public class Portfolio {

    @OneToMany(mappedBy = "portfolio_aktien")
    List<PortfolioAktie> portfolioAktien;


    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id")
    private UUID id;

    @Column(name = "benutzer_id", nullable = false)
    private UUID benutzer_id;

    @Column(name = "erstellt_am")
    private ZonedDateTime erstelltAm;

    @Column(name = "aktualisiert_am")
    private ZonedDateTime aktualisiertAm;

    @ManyToOne
    @JoinColumn(name = "benutzer")
    private Benutzer benutzer;


    public Portfolio(UUID id, UUID benutzer_id, ZonedDateTime erstelltAm){
        this.id = id;
        this.benutzer_id = benutzer_id;
        this.erstelltAm = erstelltAm;
        aktualisiertAm = erstelltAm;
    }

    public Portfolio(UUID benutzer_id, ZonedDateTime erstelltAm){

        this.id = UUID.randomUUID();
        this.benutzer_id = benutzer_id;
        this.erstelltAm = erstelltAm;
        this.aktualisiertAm = erstelltAm;

    }

    public void setAktualisiertAm(ZonedDateTime aktualisiertAm) {
        this.aktualisiertAm = aktualisiertAm;
    }
}
