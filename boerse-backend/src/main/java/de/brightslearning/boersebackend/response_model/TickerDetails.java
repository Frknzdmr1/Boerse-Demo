package de.brightslearning.boersebackend.response_model;

import java.math.BigDecimal;

public record TickerDetails(
        String ticker,
        String name,
        String market,
        String locale,
        String primary_exchange,
        String type,
        boolean active,
        String currency_name,
        String cik,
        String composite_figi,
        String share_class_figi,
        BigDecimal market_cap,
        String phone_number,
        Address address,
        String description,
        String sic_code,
        String sic_description,
        String ticker_root,
        String homepage_url,
        int total_employees,
        String list_date,
        Branding branding,
        BigDecimal share_class_shares_outstanding,
        BigDecimal weighted_shares_outstanding,
        int round_lot
) {
    public record Address(String address1, String city, String state, String postalCode) {
    }

    public record Branding(String logo_url, String icon_url) {
    }

}

