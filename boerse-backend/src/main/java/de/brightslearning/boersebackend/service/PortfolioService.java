package de.brightslearning.boersebackend.service;

import de.brightslearning.boersebackend.Dto.AktieDTO;
import de.brightslearning.boersebackend.Dto.PortfolioAktienPost;
import de.brightslearning.boersebackend.Dto.PortfolioDTO;
import de.brightslearning.boersebackend.model.Aktie;
import de.brightslearning.boersebackend.model.Portfolio;
import de.brightslearning.boersebackend.model.PortfolioAktie;
import de.brightslearning.boersebackend.repository.AktieRepository;
import de.brightslearning.boersebackend.repository.PortfolioRepository;
import de.brightslearning.boersebackend.repository.PortfolioAktieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class PortfolioService {

    @Autowired
    private PortfolioRepository portfolioRepository;

    @Autowired
    private PortfolioAktieRepository portfolioAktieRepository;

    @Autowired
    private AktieRepository aktieRepository;


    public PortfolioAktie addStockToPortfolio(UUID portfolioId, PortfolioAktienPost portfolioAktie) {

        Portfolio portfolio = portfolioRepository.findById(portfolioId).orElseThrow(() -> new RuntimeException("Portfolio not found"));
        Aktie aktie = aktieRepository.findBySymbol(portfolioAktie.symbol()).orElseThrow(() -> new RuntimeException("Aktie not found"));
        PortfolioAktie portfolioAktie1 = new PortfolioAktie(UUID.randomUUID(),portfolio, aktie, portfolioAktie.menge(), portfolioAktie.durchschnittlicherKaufpreis());

        return portfolioAktieRepository.save(portfolioAktie1);
    }

    public PortfolioDTO getPortfolioByUserId(UUID userId) {
        Portfolio portfolio = portfolioRepository.findById(userId).orElseThrow(() -> new RuntimeException("Portfolio not found"));

        return new PortfolioDTO(portfolio.getPortfolioAktien().stream().map(portfolioAktie -> new AktieDTO(portfolioAktie.getAktie().getSymbol(), portfolioAktie.getAktie().getAktuellerPreis(), portfolioAktie.getMenge(), portfolioAktie.getDurchschnittlicherKaufpreis()
        )).toList());
    }
}
