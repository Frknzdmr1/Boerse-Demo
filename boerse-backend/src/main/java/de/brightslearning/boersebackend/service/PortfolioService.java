package de.brightslearning.boersebackend.service;

import de.brightslearning.boersebackend.Dto.AktieDTO;
import de.brightslearning.boersebackend.Dto.PortfolioAktienPost;
import de.brightslearning.boersebackend.Dto.PortfolioDTO;
import de.brightslearning.boersebackend.model.Aktie;
import de.brightslearning.boersebackend.model.Portfolio;
import de.brightslearning.boersebackend.model.PortfolioAktie;
import de.brightslearning.boersebackend.repository.AktieRepository;
import de.brightslearning.boersebackend.repository.PortfolioAktieRepository;
import de.brightslearning.boersebackend.repository.PortfolioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Optional;
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

        // Check if the stock already exists in the portfolio
        Optional<PortfolioAktie> existingPortfolioAktie = portfolioAktieRepository.findByPortfolioAndAktie(portfolio, aktie);

        if (existingPortfolioAktie.isPresent()) {
            PortfolioAktie portfolioAktieToUpdate = existingPortfolioAktie.get();
            portfolioAktieToUpdate.setMenge(portfolioAktieToUpdate.getMenge() + portfolioAktie.menge());
            portfolioAktieToUpdate.setDurchschnittlicherKaufpreis(
                    portfolioAktieToUpdate.getDurchschnittlicherKaufpreis().add(portfolioAktie.durchschnittlicherKaufpreis()).divide(BigDecimal.valueOf(2), RoundingMode.HALF_UP)
            );
            return portfolioAktieRepository.save(portfolioAktieToUpdate);
        } else {
            PortfolioAktie newPortfolioAktie = new PortfolioAktie(UUID.randomUUID(), portfolio, aktie, portfolioAktie.menge(), portfolioAktie.durchschnittlicherKaufpreis());
            return portfolioAktieRepository.save(newPortfolioAktie);
        }
    }

    public PortfolioDTO getPortfolioByUserId(UUID userId) {
        Portfolio portfolio = portfolioRepository.findPortfolioByBenutzerId(userId);
        return new PortfolioDTO(
                portfolio.getId(),
                portfolio.getPortfolioAktien().stream().map(portfolioAktie -> new AktieDTO(
                    portfolioAktie.getAktie().getSymbol(),
                    portfolioAktie.getAktie().getAktuellerPreis(),
                    portfolioAktie.getMenge(),
                    portfolioAktie.getDurchschnittlicherKaufpreis()
            )).toList());
    }
}
