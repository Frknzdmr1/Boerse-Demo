package de.brightslearning.boersebackend.Dto;

import java.math.BigDecimal;

public record PortfolioAktienPost(String symbol,
                                  Integer menge,
                                  BigDecimal durchschnittlicherKaufpreis)
{}
