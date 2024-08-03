package de.brightslearning.boersebackend.controller;
import de.brightslearning.boersebackend.dto.AuthResponseDto;
import de.brightslearning.boersebackend.dto.LoginDto;
import de.brightslearning.boersebackend.dto.RegisterDto;
import de.brightslearning.boersebackend.configuration.JWTGenerator;
import de.brightslearning.boersebackend.model.Benutzer;
import de.brightslearning.boersebackend.model.UserRolle;

import de.brightslearning.boersebackend.repository.BenutzerRepository;
import de.brightslearning.boersebackend.repository.UserRolleRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/auth")
public class LogInRegistrierungController {

    private final BenutzerRepository benutzerRepository;
    private final UserRolleRepository userRolleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JWTGenerator jwtGenerator;


    @Autowired
    public LogInRegistrierungController(BenutzerRepository benutzerRepository,
                                        UserRolleRepository userRolleRepository,
                                        PasswordEncoder passwordEncoder,
                                        JWTGenerator jwtGenerator) {

        this.benutzerRepository = benutzerRepository;
        this.userRolleRepository = userRolleRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtGenerator = jwtGenerator;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> login(@RequestBody LoginDto loginDto){
        try{

            String token = jwtGenerator.generateToken(loginDto);
            return ResponseEntity.ok(new AuthResponseDto(token));
        }  catch (AuthenticationException ex){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponseDto> register(@RequestBody RegisterDto registerDto){
        if(Boolean.TRUE.equals(benutzerRepository.existsBenutzerByBenutzername(registerDto.benutzername()))){ //SonarLint mein das wäre besser.
            return null;
        }
        UserRolle userRolleUser = userRolleRepository.findByBezeichnung("USER").orElseThrow();
        Benutzer benutzer = new Benutzer(
                UUID.randomUUID(),
                registerDto.benutzername(),
                registerDto.email(),
                passwordEncoder.encode( registerDto.passwort()),
                "STANDARD",
                ZonedDateTime.now(),
                ZonedDateTime.now(),
                List.of(userRolleUser)
        );

        benutzerRepository.save(benutzer);

        String token = jwtGenerator.generateToken(new LoginDto(
                benutzer.getBenutzername(),
                benutzer.getPasswort(),
                benutzer.getUserRollen().stream().map(
                        rolle -> (GrantedAuthority) rolle::getBezeichnung
                ).toList()
        ));

        return ResponseEntity.ok(new AuthResponseDto(token));
    }
}
