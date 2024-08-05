package de.brightslearning.boersebackend.configuration;

import de.brightslearning.boersebackend.dto.LoginDto;
import de.brightslearning.boersebackend.model.Benutzer;
import de.brightslearning.boersebackend.model.Portfolio;
import de.brightslearning.boersebackend.repository.BenutzerRepository;
import de.brightslearning.boersebackend.repository.PortfolioRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.time.Instant;
import java.util.Date;
import java.util.UUID;

import static de.brightslearning.boersebackend.configuration.SecurityConstants.*;

@Component
public class JWTGenerator {


    private final BenutzerRepository benutzerRepository;
    private final PortfolioRepository portfolioRepository;


    @Autowired
    public JWTGenerator(BenutzerRepository benutzerRepository, PortfolioRepository portfolioRepository){
        this.benutzerRepository = benutzerRepository;
        this.portfolioRepository = portfolioRepository;

    }



public String generateToken(LoginDto loginDto){
    String benutzername = loginDto.getUsername();
    Benutzer benutzer = benutzerRepository.findByBenutzername(benutzername).orElseThrow();
    UUID userId = benutzer.getId();
    Portfolio portfolio = portfolioRepository.findPortfolioByBenutzer(benutzer);
    UUID portfolioId = portfolio.getId();
    Date currentDate = new Date();
    Date expireDate = new Date(currentDate.getTime() + JWT_EXPIRATION);

    return Jwts.builder()
            .subject(benutzername)
            .issuedAt(new Date())
            .expiration(expireDate)
            .signWith(getSignInKey())
            .claim("userId", userId)
            .claim("benutzername", benutzername)
            .claim("portfolioId", portfolioId)
            .compact();


}


    public Claims getClaims(String token) {
        return Jwts
                .parser()
                .verifyWith(getSignInKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }



    public String getBenutzernameVonJWT(String token){
        Claims claims = getClaims(token);
        return claims.getSubject();
    }

    public UUID getBenutzerIdFromJWT(String token){
        Claims claims = getClaims(token);

        String userIdString = claims.get("userId", String.class);
        return UUID.fromString(userIdString);
    }

    private Date getAblaufdatum(String token) {
        Claims claims = getClaims(token);
        return claims.getExpiration();
    }

    public boolean istTokenAbgelaufen(String token){
        return getAblaufdatum(token).before(Date.from(Instant.now()));
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        String username = getBenutzernameVonJWT(token);

        return (username.equals(userDetails.getUsername()) && !istTokenAbgelaufen(token));
    }

    private SecretKey getSignInKey(){
        byte[] keyBytes = Decoders.BASE64URL.decode(JWT_SECRET);

        return Keys.hmacShaKeyFor(keyBytes);
    }

}
