package de.brightslearning.boersebackend.repository;

import de.brightslearning.boersebackend.model.Portfolio;
import de.brightslearning.boersebackend.model.PortfolioAktie;
import de.brightslearning.boersebackend.model.Aktie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface PortfolioAktieRepository extends JpaRepository<PortfolioAktie, UUID> {
    Optional<PortfolioAktie> findByPortfolioAndAktie(Portfolio portfolio, Aktie aktie);
}
