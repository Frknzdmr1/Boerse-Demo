package de.brightslearning.boersebackend.controller;

import de.brightslearning.boersebackend.model.Benutzer;
import de.brightslearning.boersebackend.repository.BenutzerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/benutzer")
public class BenutzerController {

    private final BenutzerRepository benutzerRepository;

    @Autowired
    public BenutzerController(BenutzerRepository benutzerRepository) {
        this.benutzerRepository = benutzerRepository;
    }

    @GetMapping
    public ResponseEntity<List<Benutzer>> alleBenutzerAbrufen() {
        List<Benutzer> benutzerListe = benutzerRepository.findAll();
        return ResponseEntity.ok(benutzerListe);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Benutzer> benutzerNachIdAbrufen(@PathVariable UUID id) {
        Optional<Benutzer> benutzerOptional = benutzerRepository.findById(id);
        if (benutzerOptional.isPresent()) {
            return ResponseEntity.ok(benutzerOptional.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // PUT: Benutzer aktualisieren
    @PutMapping("/{id}")
    public ResponseEntity<Benutzer> benutzerAktualisieren(@PathVariable UUID id, @RequestBody Benutzer benutzerDetails) {
        Optional<Benutzer> benutzerOptional = benutzerRepository.findById(id);
        if (benutzerOptional.isPresent()) {
            Benutzer vorhandenerBenutzer = benutzerOptional.get();
            vorhandenerBenutzer.setBenutzername(benutzerDetails.getBenutzername());
            vorhandenerBenutzer.setEmail(benutzerDetails.getEmail());
            Benutzer aktualisierterBenutzer = benutzerRepository.save(vorhandenerBenutzer);
            return ResponseEntity.ok(aktualisierterBenutzer);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
