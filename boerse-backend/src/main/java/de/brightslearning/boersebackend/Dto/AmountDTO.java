package de.brightslearning.boersebackend.Dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;

public class AmountDTO {
    @NotNull(message = "Betrag ist erforderlich")
    @Positive(message = "Betrag muss positiv sein")
    private BigDecimal amount;

    public @NotNull(message = "Betrag ist erforderlich") @Positive(message = "Betrag muss positiv sein") BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(@NotNull(message = "Betrag ist erforderlich") @Positive(message = "Betrag muss positiv sein") BigDecimal amount) {
        this.amount = amount;
    }
}

