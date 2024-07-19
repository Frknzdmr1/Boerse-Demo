package de.brightslearning.boersebackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface PortfolioAktieRepository extends JpaRepository<PortfolioAktieRepository, UUID> {
}