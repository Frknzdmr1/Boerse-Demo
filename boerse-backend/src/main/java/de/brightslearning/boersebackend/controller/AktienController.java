package de.brightslearning.boersebackend.controller;


import de.brightslearning.boersebackend.response_model.PreviousClose;
import de.brightslearning.boersebackend.response_model.TickerDetailsResponse;
import de.brightslearning.boersebackend.service.AktienService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/aktie")

public class AktienController {
    @Value("${POLYGON_API_KEY}")
    private String polygonApiKey;

    private final AktienService service;

    public AktienController(AktienService service) {
        this.service = service;
    }

    @GetMapping(value = "/prev/{ticker}")
    public PreviousClose getPreviousClose(@PathVariable String ticker) {
        return service.getPreviousDay(ticker);
    }

    @GetMapping("/current-price/{symbol}")
    public BigDecimal getCurrentPrice(@PathVariable String symbol) {
        return service.getCurrentPrice(symbol);
    }

    @GetMapping("/ticker-details/{symbol}")
    public TickerDetailsResponse getTickerDetails(@PathVariable String symbol) {
        return service.getTickerDetails(symbol);
    }

    @GetMapping("/stock-price/{symbol}")
    public PreviousClose getStockPriceRecords(@PathVariable String symbol) {
        return service.getStockPriceRecords(symbol);
    }
}
