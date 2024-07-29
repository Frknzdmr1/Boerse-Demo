package de.brightslearning.boersebackend.Dto;

import de.brightslearning.boersebackend.model.PortfolioAktie;

import java.util.List;
import java.util.UUID;

public record PortfolioDTO(UUID id, List<AktieDTO> portfolioAktien){
  
}
