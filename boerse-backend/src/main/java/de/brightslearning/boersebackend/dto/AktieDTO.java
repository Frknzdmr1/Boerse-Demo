package de.brightslearning.boersebackend.dto;

import java.math.BigDecimal;

public record AktieDTO(String symbol, BigDecimal aktuellerPreis, Integer menge, BigDecimal durchschnittlicherKaufpreis) {

}
