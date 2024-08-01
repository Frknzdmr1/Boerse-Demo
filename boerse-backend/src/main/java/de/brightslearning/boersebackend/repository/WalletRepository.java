package de.brightslearning.boersebackend.repository;

import de.brightslearning.boersebackend.model.Benutzer;
import de.brightslearning.boersebackend.model.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WalletRepository extends JpaRepository<Wallet, Long> {
    Wallet findByBenutzer(Benutzer benutzer);
}
