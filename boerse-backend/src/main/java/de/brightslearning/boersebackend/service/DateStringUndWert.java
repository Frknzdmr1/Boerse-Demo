package de.brightslearning.boersebackend.service;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;
@Data
@AllArgsConstructor
public class DateStringUndWert {
    private String formartiertesDatum;
    private BigDecimal wert;
}
