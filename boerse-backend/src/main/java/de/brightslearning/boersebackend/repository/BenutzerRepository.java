package de.brightslearning.boersebackend.repository;

import de.brightslearning.boersebackend.model.Benutzer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface BenutzerRepository extends JpaRepository<Benutzer, UUID> {
    Benutzer findBenutzerByBenutzername(String benutzername);
}
