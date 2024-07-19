package de.brightslearning.boersebackend.model;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface PortfolioDAO extends JpaRepository<Portfolio, UUID> {
}