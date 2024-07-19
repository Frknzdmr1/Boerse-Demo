package de.brightslearning.boersebackend.model;

import jakarta.persistence.*;
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

    // Welche von denen brauchen wir hier?
    @OneToMany(mappedBy = "portfolio_aktien")
    List<PortfolioAktie> portfolioAktien;

    // Welche von denen brauchen wir hier?
    @OneToMany(mappedBy = "transaktionen")
    List<Transaktion> transaktionen;

    // Welche von denen brauchen wir hier?
    @OneToMany( mappedBy = "beobachtungslisten_aktie")
    List<BeobachtungslisteAktie> beobachtungsListeAktien;


    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id")
    private UUID id;

    @Column(name = "symbol", nullable = false)
    private String symbol;

    @Column(name = "firmenname", nullable = false)
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
