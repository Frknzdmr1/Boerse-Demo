package de.brightslearning.boersebackend.repository;

import de.brightslearning.boersebackend.model.Beobachtungsliste;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface BeobachtungslistRepository extends JpaRepository<Beobachtungsliste, UUID> {
}

