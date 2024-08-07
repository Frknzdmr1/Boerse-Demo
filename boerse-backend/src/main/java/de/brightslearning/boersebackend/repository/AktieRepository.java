package de.brightslearning.boersebackend.repository;

import de.brightslearning.boersebackend.model.Aktie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface AktieRepository extends JpaRepository<Aktie, UUID> {

    Optional<Aktie> findBySymbol(String symbol);
}
