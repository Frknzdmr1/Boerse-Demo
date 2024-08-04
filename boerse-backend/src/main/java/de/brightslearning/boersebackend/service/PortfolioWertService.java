package de.brightslearning.boersebackend.service;

import de.brightslearning.boersebackend.model.Portfolio;
import de.brightslearning.boersebackend.model.PortfolioAktie;
import de.brightslearning.boersebackend.model.PortfolioWert;
import de.brightslearning.boersebackend.repository.PortfolioRepository;
import de.brightslearning.boersebackend.repository.PortfolioWertRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.List;

@Service
public class PortfolioWertService {


    private final PortfolioRepository portfolioRepository;


    private final PortfolioWertRepository portfolioWertRepository;


    private final AktienService aktienService;

    @Autowired
    public PortfolioWertService(
            PortfolioRepository portfolioRepository,
            PortfolioWertRepository portfolioWertRepository,
            AktienService aktienService
    ){
        this.portfolioRepository = portfolioRepository;
        this.portfolioWertRepository = portfolioWertRepository;
        this.aktienService = aktienService;
    }

    @Scheduled(cron = "0 0 16 * * MON-FRI", zone = "America/New_York")
    public void calculateAndSavePortfolioWerte() {
        List<Portfolio> portfolios = portfolioRepository.findAll();

        for (Portfolio portfolio : portfolios) {
            for (PortfolioAktie portfolioAktie : portfolio.getPortfolioAktien()) {
                BigDecimal aktieWert = aktienService.getCurrentPrice(portfolioAktie.getAktie().getSymbol())
                        .multiply(new BigDecimal(portfolioAktie.getMenge()));

                PortfolioWert portfolioWert = new PortfolioWert();
                portfolioWert.setPortfolio(portfolio);
                portfolioWert.setDatum(ZonedDateTime.now());
                portfolioWert.setAktieMenge(portfolioAktie.getMenge());
                portfolioWert.setAktieWert(aktieWert);

                portfolioWertRepository.save(portfolioWert);
            }
        }
    }
}

// Den aktienwert und die menge die der user hat am ende des tages brauchen wir und es im DB abspeichern. Zeitliche entwicklung
