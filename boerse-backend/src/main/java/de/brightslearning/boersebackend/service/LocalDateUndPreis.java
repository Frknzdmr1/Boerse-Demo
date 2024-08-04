package de.brightslearning.boersebackend.service;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@AllArgsConstructor
public class LocalDateUndPreis {
    private LocalDate date;
    private BigDecimal wert;
}
