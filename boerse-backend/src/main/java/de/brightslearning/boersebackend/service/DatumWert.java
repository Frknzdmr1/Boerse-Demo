package de.brightslearning.boersebackend.service;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;
import java.time.ZonedDateTime;

@Data
@AllArgsConstructor
public class DatumWert {

    private ZonedDateTime zeitStempel;
    private BigDecimal wert;
}
