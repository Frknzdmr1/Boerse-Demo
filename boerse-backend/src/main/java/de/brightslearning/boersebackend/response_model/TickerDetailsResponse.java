package de.brightslearning.boersebackend.response_model;

public record TickerDetailsResponse(
        String request_id,
        TickerDetails results,
        String status
) {}

