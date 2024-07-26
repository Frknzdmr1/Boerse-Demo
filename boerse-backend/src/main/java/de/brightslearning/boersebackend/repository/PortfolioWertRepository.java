package de.brightslearning.boersebackend.repository;

import de.brightslearning.boersebackend.model.PortfolioWert;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PortfolioWertRepository extends JpaRepository<PortfolioWert, UUID> {
}
