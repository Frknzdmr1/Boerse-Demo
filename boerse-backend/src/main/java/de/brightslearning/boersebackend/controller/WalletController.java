package de.brightslearning.boersebackend.controller;

import de.brightslearning.boersebackend.Dto.AmountDTO;
import de.brightslearning.boersebackend.exception.InsufficientFundsException;
import de.brightslearning.boersebackend.model.Benutzer;
import de.brightslearning.boersebackend.service.WalletService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/wallet")
public class WalletController {
    @Autowired
    private WalletService walletService;

    @PostMapping("/deposit")
    public ResponseEntity<BigDecimal> deposit(@Valid @RequestBody AmountDTO amountDTO, Authentication authentication) {
        Benutzer benutzer = (Benutzer) authentication.getPrincipal();
        BigDecimal newBalance = walletService.deposit(benutzer, amountDTO.getAmount());
        return ResponseEntity.ok(newBalance);
    }

    @PostMapping("/withdraw")
    public ResponseEntity<BigDecimal> withdraw(@Valid @RequestBody AmountDTO amountDTO, Authentication authentication) {
        Benutzer benutzer = (Benutzer) authentication.getPrincipal();
        try {
            BigDecimal newBalance = walletService.withdraw(benutzer, amountDTO.getAmount());
            return ResponseEntity.ok(newBalance);
        } catch (InsufficientFundsException e) {
            return ResponseEntity.badRequest().body(BigDecimal.ZERO);
        }
    }

    @GetMapping("/balance")
    public ResponseEntity<BigDecimal> getBalance(Authentication authentication) {
        Benutzer benutzer = (Benutzer) authentication.getPrincipal();
        BigDecimal balance = walletService.getBalance(benutzer);
        return ResponseEntity.ok(balance);
    }
}
