package de.brightslearning.boersebackend.controller;

import de.brightslearning.boersebackend.Dto.PortfolioAktienPost;
import de.brightslearning.boersebackend.Dto.PortfolioDTO;
import de.brightslearning.boersebackend.model.Portfolio;
import de.brightslearning.boersebackend.model.PortfolioAktie;
import de.brightslearning.boersebackend.service.PortfolioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/portfolio")
public class PortfolioController {

    @Autowired
    private PortfolioService portfolioService;

    @PostMapping("/{portfolioId}/add-stock")
    public PortfolioAktie addStockToPortfolio(@PathVariable UUID portfolioId, @RequestBody PortfolioAktienPost portfolioAktie) {
        return portfolioService.addStockToPortfolio(portfolioId, portfolioAktie);
    }

    @GetMapping("/{userId}")
    public PortfolioDTO getPortfolioByUserId(@PathVariable UUID userId) {
        return portfolioService.getPortfolioByUserId(userId);
    }
}
