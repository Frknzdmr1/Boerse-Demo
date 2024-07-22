package de.brightslearning.boersebackend.service;

import de.brightslearning.boersebackend.response_model.PreviousClose;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Objects;

@Service
public class AktienService {

    private final WebClient webClient = WebClient.create();
    @Value("${POLYGON_API_KEY}")
    private String polygonApiKey;


    public PreviousClose getPreviousDay(String ticker){
        String url = "https://api.polygon.io/v2/aggs/ticker/" + ticker.toUpperCase() +"/prev?apiKey=" + polygonApiKey;

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
}
