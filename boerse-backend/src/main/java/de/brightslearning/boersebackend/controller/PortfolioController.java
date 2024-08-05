package de.brightslearning.boersebackend.controller;

import de.brightslearning.boersebackend.dto.PortfolioAktienPost;
import de.brightslearning.boersebackend.dto.PortfolioDTO;
import de.brightslearning.boersebackend.model.PortfolioAktie;

import de.brightslearning.boersebackend.service.PortfolioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/portfolio")
public class PortfolioController {


    private final PortfolioService portfolioService;

    @Autowired
    public PortfolioController(PortfolioService portfolioService){
        this.portfolioService = portfolioService;
    }

    @PostMapping("/{portfolioId}/add-stock")
    public PortfolioAktie addStockToPortfolio(@PathVariable UUID portfolioId, @RequestBody PortfolioAktienPost portfolioAktie) {
        return portfolioService.addStockToPortfolio(portfolioId, portfolioAktie);
    }

    @PostMapping("/{portfolioId}/remove-stock")
    public void removeStockFromPortfolio(@PathVariable UUID portfolioId, @RequestBody String symbol) {
        portfolioService.removeStockFromPortfolio(portfolioId, symbol);
    }

    @GetMapping("/{userId}")
    public PortfolioDTO getPortfolioByUserId(@PathVariable UUID userId) {
        return portfolioService.getPortfolioByUserId(userId);
    }
}
