package de.brightslearning.boersebackend.response_model;

import java.util.List;

public record PreviousClose (
        String ticker,
        Integer queryCount,
        Integer resultsCount,
        boolean adjusted,
        List<Result> results,
        String status,
        String request_id,
        Integer count
) {}
