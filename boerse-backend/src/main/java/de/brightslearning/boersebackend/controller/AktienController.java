package de.brightslearning.boersebackend.controller;

import de.brightslearning.boersebackend.response_model.PreviousClose;
import de.brightslearning.boersebackend.service.AktienService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Objects;

//https://api.polygon.io/v2/last/nbbo/AAPL?apiKey=... Apple aktie Last Quote

@RequestMapping("/aktie")
@RestController
public class AktienController {



    @Value("${POLYGON_API_KEY}")
    private String polygonApiKey;

    private final AktienService service;

    public AktienController(AktienService service) {
        this.service = service;
    }
    @GetMapping(value = "/prev/{ticker}")
    public PreviousClose getPreviousClose(@PathVariable String ticker){
        return service.getPreviousDay(ticker);
    }

}

