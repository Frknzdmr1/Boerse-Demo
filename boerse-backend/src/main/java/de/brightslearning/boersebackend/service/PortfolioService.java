package de.brightslearning.boersebackend.service;

import de.brightslearning.boersebackend.dto.AktieDTO;
import de.brightslearning.boersebackend.dto.PortfolioAktienPost;
import de.brightslearning.boersebackend.dto.PortfolioDTO;
import de.brightslearning.boersebackend.model.Aktie;
import de.brightslearning.boersebackend.model.Benutzer;
import de.brightslearning.boersebackend.model.Portfolio;
import de.brightslearning.boersebackend.model.PortfolioAktie;
import de.brightslearning.boersebackend.repository.AktieRepository;
import de.brightslearning.boersebackend.repository.BenutzerRepository;
import de.brightslearning.boersebackend.repository.PortfolioAktieRepository;
import de.brightslearning.boersebackend.repository.PortfolioRepository;
import de.brightslearning.boersebackend.response_model.TickerDetailsResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.ZonedDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class PortfolioService {

    private final PortfolioRepository portfolioRepository;
    private final PortfolioAktieRepository portfolioAktieRepository;
    private final AktieRepository aktieRepository;
    private final AktienService aktienService;
    private final BenutzerRepository benutzerRepository;

    @Autowired
    public PortfolioService(PortfolioRepository portfolioRepository,
                            PortfolioAktieRepository portfolioAktieRepository,
                            AktieRepository aktieRepository,
                            AktienService aktienService, BenutzerRepository benutzerRepository){
        this.portfolioRepository = portfolioRepository;
        this.portfolioAktieRepository = portfolioAktieRepository;
        this.aktieRepository = aktieRepository;
        this.aktienService = aktienService;
        this.benutzerRepository = benutzerRepository;
    }

    public void removeStockFromPortfolio(UUID portfolioId, String symbol) {
        Portfolio portfolio = portfolioRepository.findById(portfolioId)
                .orElseThrow(() -> new RuntimeException("Portfolio not found"));
        Aktie aktie = aktieRepository.findBySymbol(symbol)
                .orElseThrow(() -> new RuntimeException("Aktie not found"));

        portfolioAktieRepository.findByPortfolioAndAktie(portfolio, aktie)
                .ifPresent(portfolioAktieRepository::delete);
    }

    public PortfolioAktie addStockToPortfolio(UUID portfolioId, PortfolioAktienPost portfolioAktie) {

        Portfolio portfolio = portfolioRepository.findById(portfolioId).orElseThrow(() -> new RuntimeException("Portfolio not found"));
        String symbol = portfolioAktie.symbol();
        BigDecimal aktuellerPreis = aktienService.getCurrentPrice(symbol);
        TickerDetailsResponse tickerDetails = aktienService.getTickerDetails(symbol);
        Optional<Aktie> optionalAktie = aktieRepository.findBySymbol(symbol);
        UUID id;
        if(optionalAktie.isPresent()){
            id = optionalAktie.get().getId();
        } else {
            id = UUID.randomUUID();
        }
        Aktie aktie = new Aktie(
                id,
                portfolioAktie.symbol(),
                tickerDetails.results().name(),
                tickerDetails.results().market(),
                tickerDetails.results().sic_code(),
                aktuellerPreis,
                ZonedDateTime.now()
        );

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
        System.out.println(userId);
        Benutzer benutzer = benutzerRepository.findBenutzerById(userId).orElseThrow();

        Portfolio portfolio = portfolioRepository.findPortfolioByBenutzer(benutzer);
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
