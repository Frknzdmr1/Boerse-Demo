package de.brightslearning.boersebackend.dto;

import java.math.BigDecimal;

public record PortfolioAktienPost(String symbol,
                                  Integer menge,
                                  BigDecimal durchschnittlicherKaufpreis)
{}
