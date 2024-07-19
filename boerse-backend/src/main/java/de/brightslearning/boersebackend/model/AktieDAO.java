package de.brightslearning.boersebackend.model;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface AktieDAO extends JpaRepository<Aktie, UUID> {
}
