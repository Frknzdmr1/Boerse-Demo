package de.brightslearning.boersebackend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "aktien")
public class Aktie {

//    // Welche von denen brauchen wir hier?
//    @OneToMany(mappedBy = "portfolio_aktien")
//    List<PortfolioAktie> portfolioAktien;
//
//    // Welche von denen brauchen wir hier?
//    @OneToMany(mappedBy = "transaktionen")
//    List<Transaktion> transaktionen;
//
//    // Welche von denen brauchen wir hier?
//    @OneToMany( mappedBy = "beobachtungslisten_aktie")
//    List<BeobachtunsListenAktie> beobachtunsListenAktien;


    @Id
    @Column(name = "id")
    private UUID id;

    @NotNull
    @Column(name = "symbol")
    private String symbol;

    @NotNull
    @Column(name = "firmenname")
    private String firmenname;

    @Column(name = "markt")
    private String markt;

    @Column(name = "sektor")
    private String sektor;

    @Column(name = "aktueller_preis")
    private BigDecimal bigDecimal;


    public Aktie(UUID id, String symbol, String firmenname){
        this.id = id;
        this.symbol = symbol;
        this.firmenname = firmenname;
    }


    public Aktie(String symbol, String firmenname){
        this.id = UUID.randomUUID();
        this.symbol = symbol;
        this.firmenname = firmenname;
    }

    public Aktie(String symbol, String firmenname, String markt, String sektor, BigDecimal bigDecimal) {
        this.id = UUID.randomUUID();
        this.symbol = symbol;
        this.firmenname = firmenname;
        this.markt = markt;
        this.sektor = sektor;
        this.bigDecimal = bigDecimal;
    }
}
