package de.brightslearning.boersebackend.service;

import de.brightslearning.boersebackend.model.Benutzer;
import de.brightslearning.boersebackend.repository.BenutzerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class BenutzerService {

    private final BenutzerRepository benutzerRepository;

    @Autowired
    public BenutzerService(BenutzerRepository benutzerRepository) {
        this.benutzerRepository = benutzerRepository;
    }

    public List<Benutzer> alleBenutzerAbrufen() {
        return benutzerRepository.findAll();
    }

    public Optional<Benutzer> benutzerNachIdAbrufen(UUID id) {
        return benutzerRepository.findById(id);
    }

    public Benutzer neuenBenutzerErstellen(Benutzer benutzer) {
        return benutzerRepository.save(benutzer);
    }

    public Optional<Benutzer> benutzerNachBenutzernameAbrufen(String benutzername) {
        return benutzerRepository.findByBenutzername(benutzername);
    }

}
