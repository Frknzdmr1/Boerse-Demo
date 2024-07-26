package de.brightslearning.boersebackend.model;


import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "rollen")
@AllArgsConstructor
public class UserRolle {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String bezeichnung;

}
