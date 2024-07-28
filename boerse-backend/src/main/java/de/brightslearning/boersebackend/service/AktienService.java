package de.brightslearning.boersebackend.service;

import de.brightslearning.boersebackend.response_model.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Objects;

@Service
public class AktienService {

    private final WebClient webClient = WebClient.create();

    @Value("${POLYGON_API_KEY}")
    private String polygonApiKey;

    public PreviousClose getPreviousDay(String ticker) {
        String url = "https://api.polygon.io/v2/aggs/ticker/" + ticker.toUpperCase() + "/prev?apiKey=" + polygonApiKey;

        PreviousClose previousClose = Objects.requireNonNull(
                webClient
                        .get()
                        .uri(url)
                        .retrieve()
                        .toEntity(PreviousClose.class)
                        .block()
        ).getBody();

        return previousClose;
    }

    public BigDecimal getCurrentPrice(String symbol) {
        LocalDate yesterday = LocalDate.now().minusDays(1); // Get yesterday's date
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String date = yesterday.format(formatter);
        String url = "https://api.polygon.io/v1/open-close/" + symbol + "/" + date + "?adjusted=true&apiKey=" + polygonApiKey;

        OpenClose response = Objects.requireNonNull(
                webClient
                        .get()
                        .uri(url)
                        .retrieve()
                        .toEntity(OpenClose.class)
                        .block()
        ).getBody();


        return BigDecimal.valueOf(response.close());
    }

public TickerDetailsResponse getTickerDetails(String symbol) {
        String url = "https://api.polygon.io/v3/reference/tickers/" + symbol.toUpperCase() + "?apiKey=" + polygonApiKey;

        ResponseEntity<TickerDetailsResponse> entity = webClient
                .get()
                .uri(url)
                .retrieve()
                .toEntity(TickerDetailsResponse.class)
                .block();

        if (entity != null && entity.getBody() != null) {
            return entity.getBody();
        } else {
            throw new RuntimeException("Ticker details not found for symbol: " + symbol);
        }
    }
}
