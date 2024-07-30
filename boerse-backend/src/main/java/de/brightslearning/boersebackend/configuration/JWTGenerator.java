package de.brightslearning.boersebackend.configuration;

import de.brightslearning.boersebackend.model.Benutzer;
import de.brightslearning.boersebackend.repository.BenutzerRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.NoArgsConstructor;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.nio.file.attribute.UserPrincipal;
import java.security.Key;
import java.util.Date;
import java.util.UUID;

import static de.brightslearning.boersebackend.configuration.SecurityConstants.*;

@Component
public class JWTGenerator {

    private static final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS512);

    private final BenutzerRepository benutzerRepository;

    public JWTGenerator(BenutzerRepository benutzerRepository){
        this.benutzerRepository = benutzerRepository;
    }

    public String generateToken(Authentication authentication){
        String benutzername = authentication.getName();
        Benutzer benutzer = benutzerRepository.findByBenutzername(benutzername).get();
        UUID userId = benutzer.getId();
        String nutzername = benutzer.getBenutzername();
        Date currentDate = new Date();
        Date expireDate = new Date(currentDate.getTime() + JWT_EXPIRATION);

        String token = Jwts.builder()
                .claim("userId", userId.toString())
                .claim("benutzername", nutzername)
                .setSubject(benutzername)
                .setIssuedAt(new Date())
                .setExpiration(expireDate)
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();

        return token;
    }


    public String getBenutzernameVonJWT(String token){
        Claims claims = Jwts.parser()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
    }

    public UUID getBenutzerIdFromJWT(String token){
        Claims claims = Jwts.parser()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();

        String userIdString = claims.get("userId", String.class);
        return UUID.fromString(userIdString);
    }

    public boolean validateToken(String token) {
        try{
            Jwts.parser().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (Exception e){
            throw new AuthenticationCredentialsNotFoundException("Der JWT Token ist entweder abgelaufen oder inkorrekt.",
                    e.fillInStackTrace());
        }
    }


}
