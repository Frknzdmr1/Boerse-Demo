package de.brightslearning.boersebackend.model;

import java.math.BigDecimal;

public class CurrentPriceResponse {
    private Last last;

    public Last getLast() {
        return last;
    }

    public void setLast(Last last) {
        this.last = last;
    }

    public static class Last {
        private BigDecimal price;

        public BigDecimal getPrice() {
            return price;
        }

        public void setPrice(BigDecimal price) {
            this.price = price;
        }
    }
}
