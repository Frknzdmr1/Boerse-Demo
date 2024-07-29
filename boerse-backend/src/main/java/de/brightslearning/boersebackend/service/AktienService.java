package de.brightslearning.boersebackend.service;

import de.brightslearning.boersebackend.response_model.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class AktienService {

    private final WebClient webClient = WebClient.create();

    @Value("${POLYGON_API_KEY}")
    private String polygonApiKey;

    public PreviousClose getPreviousDay(String ticker) {
        String url = "https://api.polygon.io/v2/aggs/ticker/" + ticker.toUpperCase() + "/prev?apiKey=" + polygonApiKey;

        PreviousClose previousClose = Objects
                .requireNonNull(webClient.get().uri(url).retrieve().toEntity(PreviousClose.class).block()).getBody();

        return previousClose;
    }

    //    public BigDecimal getCurrentPrice(String symbol) {
//        LocalDate yesterday = LocalDate.now().minusDays(1);
//        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
//        String date = yesterday.format(formatter);
//        String url = "https://api.polygon.io/v1/open-close/" + symbol + "/" + date + "?adjusted=true&apiKey="
//                + polygonApiKey;
//
//        OpenClose response = Objects
//                .requireNonNull(webClient.get().uri(url).retrieve().toEntity(OpenClose.class).block()).getBody();
//
//        return BigDecimal.valueOf(response.close());
//    }
    public BigDecimal getCurrentPrice(String symbol) {
        // Aktuelles Datum und Zeit ermitteln in New Yorker Zeitzone
        LocalDateTime currentDateTime = LocalDateTime.now(ZoneId.of("America/New_York"));

        // Nur den letzten Arbeitstag verwenden, wenn der aktuelle Tag noch nicht vorbei ist
        LocalDate dateToUse;
        if (currentDateTime.getDayOfWeek() == java.time.DayOfWeek.SATURDAY) {
            dateToUse = LocalDate.now(ZoneId.of("America/New_York")).minusDays(1); // Freitag
        } else if (currentDateTime.getDayOfWeek() == java.time.DayOfWeek.SUNDAY) {
            dateToUse = LocalDate.now(ZoneId.of("America/New_York")).minusDays(2); // Freitag
        } else if (currentDateTime.getDayOfWeek() == DayOfWeek.MONDAY) {
            dateToUse = LocalDate.now(ZoneId.of("America/New_York")).minusDays(3); // Freitag
        } else if (currentDateTime.getHour() < 16) { // Annahme: Börsenschluss um 16:00 Uhr ET
            dateToUse = LocalDate.now(ZoneId.of("America/New_York")).minusDays(1); // Gestern
        } else {
            dateToUse = LocalDate.now(ZoneId.of("America/New_York")); // Heute
        }

        // Formatieren des Datums im benötigten Muster für die API-Anfrage
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String date = dateToUse.format(formatter);


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

        ResponseEntity<TickerDetailsResponse> entity = webClient.get().uri(url).retrieve()
                .toEntity(TickerDetailsResponse.class).block();

        if (entity != null && entity.getBody() != null) {
            return entity.getBody();
        } else {
            throw new RuntimeException("Ticker details not found for symbol: " + symbol);
        }
    }

    public PreviousClose getStockPriceRecords(String ticker) {
        // Calculate fromDate as 6 months ago from today
        LocalDate fromDate = LocalDate.now().minusMonths(3);
        // toDate is today's date
        LocalDate heute = LocalDate.now();

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String fromDateStr = fromDate.format(formatter);
        String toDateStr = heute.format(formatter);

        String baseUrl = "https://api.polygon.io/v2/aggs";
        String apiUrl = String.format("%s/ticker/%s/range/1/day/%s/%s?adjusted=true&sort=asc&apiKey=%s", baseUrl,
                ticker, fromDateStr, toDateStr, polygonApiKey);

        PreviousClose previousClose = Objects
                .requireNonNull(webClient.get().uri(apiUrl).retrieve().toEntity(PreviousClose.class).block()).getBody();

        return previousClose;
    }

    public List<Object> getClosingPricesArray(String ticker) {
        PreviousClose previousClose = getStockPriceRecords(ticker);

        if (previousClose == null) {
            throw new IllegalArgumentException("Stock price records not available");
        }

        List<Result> results = previousClose.results();
        SimpleDateFormat sdf = new SimpleDateFormat("dd.MM.yyyy");

        return results.stream()
                .map(result -> {
                    long timestamp = result.t();
                    String formattedDate = sdf.format(timestamp);
                    double dprice = result.c();
                    return new Object() {
                        public String date = formattedDate;
                        public double price = dprice;
                    };
                })
                .collect(Collectors.toList());
    }
}