package de.brightslearning.boersebackend.repository;

import de.brightslearning.boersebackend.model.Benutzer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface BenutzerRepository extends JpaRepository<Benutzer, UUID> {
    Optional<Benutzer> findByBenutzername(String benutzername);
    Optional<Benutzer> findBenutzerById(UUID id);
    Boolean existsBenutzerByBenutzername(String benutzername);
}
