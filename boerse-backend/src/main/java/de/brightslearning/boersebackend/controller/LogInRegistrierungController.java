package de.brightslearning.boersebackend.controller;

import de.brightslearning.boersebackend.Dto.RegisterDto;
import de.brightslearning.boersebackend.model.Benutzer;
import de.brightslearning.boersebackend.model.UserRolle;
import de.brightslearning.boersebackend.repository.BenutzerRepository;
import de.brightslearning.boersebackend.repository.UserRolleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

@RestController
public class LogInRegistrierungController {


    private AuthenticationManager authenticationManager;
    private BenutzerRepository benutzerRepository;
    private UserRolleRepository userRolleRepository;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public LogInRegistrierungController(AuthenticationManager authenticationManager, BenutzerRepository benutzerRepository,
                                        UserRolleRepository userRolleRepository, PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.benutzerRepository = benutzerRepository;
        this.userRolleRepository = userRolleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterDto registerDto){
        if(benutzerRepository.existsBenutzerByBenutzername(registerDto.username())){
            return new ResponseEntity<>("Dieser Benutzername ist bereits vergeben", HttpStatus.BAD_REQUEST);
        }
        UserRolle userRolleUser = userRolleRepository.findByBezeichnung("USER").get();
        Benutzer benutzer = new Benutzer(
                UUID.randomUUID(),
                registerDto.username(),
                registerDto.email(),
                passwordEncoder.encode( registerDto.password()),
                "STANDARD",
                ZonedDateTime.now(),
                ZonedDateTime.now(),
                List.of(userRolleUser)
        );

        benutzerRepository.save(benutzer);


        return new ResponseEntity<>("Benutzer wurde erfolgreich registriert", HttpStatus.OK);
    }
}
