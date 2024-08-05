package de.brightslearning.boersebackend.repository;

import de.brightslearning.boersebackend.model.Benutzer;
import de.brightslearning.boersebackend.model.Transaktion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface TransaktionRepository extends JpaRepository<Transaktion, UUID> {
    List<Transaktion> findAllByBenutzer(Benutzer benutzer);
}

