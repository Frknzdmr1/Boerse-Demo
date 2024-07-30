package de.brightslearning.boersebackend.controller;

import de.brightslearning.boersebackend.Dto.AuthResponseDto;
import de.brightslearning.boersebackend.Dto.LoginDto;
import de.brightslearning.boersebackend.Dto.RegisterDto;
import de.brightslearning.boersebackend.configuration.JWTGenerator;
import de.brightslearning.boersebackend.model.Benutzer;
import de.brightslearning.boersebackend.model.UserRolle;
import de.brightslearning.boersebackend.repository.BenutzerRepository;
import de.brightslearning.boersebackend.repository.UserRolleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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


    private AuthenticationManager authenticationManager;
    private BenutzerRepository benutzerRepository;
    private UserRolleRepository userRolleRepository;
    private PasswordEncoder passwordEncoder;
    private JWTGenerator jwtGenerator;


    @Autowired
    public LogInRegistrierungController(AuthenticationManager authenticationManager, BenutzerRepository benutzerRepository,
                                        UserRolleRepository userRolleRepository, PasswordEncoder passwordEncoder,
                                        JWTGenerator jwtGenerator) {
        this.authenticationManager = authenticationManager;
        this.benutzerRepository = benutzerRepository;
        this.userRolleRepository = userRolleRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtGenerator = jwtGenerator;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> login(@RequestBody LoginDto loginDto){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginDto.benutzername(),
                        loginDto.password())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtGenerator.generateToken(authentication);



//        Benutzer benutzer = benutzerRepository.findByBenutzername(loginDto.benutername()).get();
//        if(benutzer == null || !passwordEncoder.matches(loginDto.password(), benutzer.getPasswort())){
//            return new ResponseEntity<>("Der Benutzername oder das Passwort sind falsch!", HttpStatus.BAD_REQUEST);
//        }

        return new ResponseEntity<>(new AuthResponseDto(token), HttpStatus.OK);
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
