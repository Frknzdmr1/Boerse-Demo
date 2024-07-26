package de.brightslearning.boersebackend.repository;

import de.brightslearning.boersebackend.model.UserRolle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRolleRepository extends JpaRepository<UserRolle, UUID> {
    Optional<UserRolle> findByBezeichnung(String bezeichnung);
}
