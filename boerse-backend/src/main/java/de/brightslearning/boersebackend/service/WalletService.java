package de.brightslearning.boersebackend.service;

import de.brightslearning.boersebackend.exception.InsufficientFundsException;
import de.brightslearning.boersebackend.model.Benutzer;
import de.brightslearning.boersebackend.model.Wallet;
import de.brightslearning.boersebackend.repository.WalletRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class WalletService {
    @Autowired
    private WalletRepository walletRepository;

    public BigDecimal deposit(Benutzer benutzer, BigDecimal amount) {
        Wallet wallet = walletRepository.findByBenutzer(benutzer);
        wallet.setBalance(wallet.getBalance().add(amount));
        walletRepository.save(wallet);
        return wallet.getBalance();
    }

    public BigDecimal withdraw(Benutzer benutzer, BigDecimal amount) {
        Wallet wallet = walletRepository.findByBenutzer(benutzer);
        if (wallet.getBalance().compareTo(amount) < 0) {
            throw new InsufficientFundsException("Insufficient funds for withdrawal");
        }
        wallet.setBalance(wallet.getBalance().subtract(amount));
        walletRepository.save(wallet);
        return wallet.getBalance();
    }

    public BigDecimal getBalance(Benutzer benutzer) {
        Wallet wallet = walletRepository.findByBenutzer(benutzer);
        return wallet.getBalance();
    }
}
