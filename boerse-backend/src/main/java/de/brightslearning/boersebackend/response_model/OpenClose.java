package de.brightslearning.boersebackend.response_model;


public record OpenClose(
        String status,
        String from,
        String symbol,
        double open,
        double high,
        double low,
        double close,
        int volume,
        double afterHours,
        double preMarket) {
}
