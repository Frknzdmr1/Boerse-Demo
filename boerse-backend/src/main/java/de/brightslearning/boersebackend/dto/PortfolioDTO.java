package de.brightslearning.boersebackend.dto;

import java.util.List;
import java.util.UUID;

public record PortfolioDTO(UUID id, List<AktieDTO> portfolioAktien){

}
