package de.brightslearning.boersebackend.model;


import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.UUID;

@Entity
@Table(name = "guthaben")
@Data
public class Guthaben {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;


    @Column(name = "kontostand")
    private BigDecimal kontostand;

    @Column(name = "zuletzt_aktualisiert")
    private ZonedDateTime zuletztAktualisiert;

    @OneToOne
    @JoinColumn(name = "benutzer_id", nullable = false)
    private Benutzer benutzer;




    public Guthaben(){

    }

    public Guthaben(BigDecimal kontostand, Benutzer benutzer){
        this.kontostand = BigDecimal.valueOf(50000.00); // Startkapital
        this.zuletztAktualisiert = ZonedDateTime.now();
        this.benutzer = benutzer;
    }



}

