package de.brightslearning.boersebackend.response_model;

import java.math.BigDecimal;

public record Result(
        String T,
        long v,
        double vw,
        double o,
        double c,
        double h,
        double l,
        long t,
        Integer n
) {
}
