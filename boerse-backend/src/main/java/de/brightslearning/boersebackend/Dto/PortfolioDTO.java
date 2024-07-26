package de.brightslearning.boersebackend.Dto;

import de.brightslearning.boersebackend.model.PortfolioAktie;

import java.util.List;

public record PortfolioDTO(List<AktieDTO> portfolioAktien)

{}