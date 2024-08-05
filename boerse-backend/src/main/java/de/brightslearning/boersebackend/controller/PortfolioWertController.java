package de.brightslearning.boersebackend.controller;

import de.brightslearning.boersebackend.service.DateStringUndWert;
import de.brightslearning.boersebackend.service.GuthabenBerechnenService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;

@Controller
@RequestMapping("/wert")
public class PortfolioWertController {

    private final GuthabenBerechnenService guthabenBerechnenService;

    public PortfolioWertController(
            GuthabenBerechnenService guthabenBerechnenService
    ){
        this.guthabenBerechnenService=guthabenBerechnenService;
    }


    @GetMapping("/{userId}/{anfangsDatumStr}")
    public List<DateStringUndWert> getPortfolioWertAbDatum(@PathVariable UUID userId, @PathVariable String anfangsDatumStr){
        LocalDate anfangsDatum = LocalDate.parse(anfangsDatumStr, DateTimeFormatter.ISO_DATE);
        System.out.println(anfangsDatum);
        return guthabenBerechnenService.portfolioWertNachTag(userId,  anfangsDatum);
    }
}
