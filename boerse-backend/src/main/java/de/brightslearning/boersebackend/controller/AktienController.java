package de.brightslearning.boersebackend.controller;

import de.brightslearning.boersebackend.response_model.PreviousClose;
import de.brightslearning.boersebackend.service.AktienService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/stock")
@CrossOrigin(origins = "http://localhost:3000")
public class AktienController {

    @Value("${POLYGON_API_KEY}")
    private String polygonApiKey;

    private final AktienService service;

    public AktienController(AktienService service) {
        this.service = service;
    }

    @GetMapping(value = "/{ticker}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<PreviousClose> getPreviousClose(@PathVariable String ticker) {
        PreviousClose data = service.getPreviousDay(ticker);
        return ResponseEntity.ok(data);
    }
}