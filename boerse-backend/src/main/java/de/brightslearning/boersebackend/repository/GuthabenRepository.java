package de.brightslearning.boersebackend.repository;

import de.brightslearning.boersebackend.model.Benutzer;
import de.brightslearning.boersebackend.model.Guthaben;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface GuthabenRepository extends JpaRepository<Guthaben, UUID> {

    public List<Guthaben> findAllByBenutzer(Benutzer benutzer);
}
