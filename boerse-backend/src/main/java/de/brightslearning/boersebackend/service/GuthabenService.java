package de.brightslearning.boersebackend.service;

import de.brightslearning.boersebackend.model.Guthaben;
import de.brightslearning.boersebackend.repository.GuthabenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class GuthabenService {

    private final GuthabenRepository guthabenRepository;

    @Autowired
    public GuthabenService(GuthabenRepository guthabenRepository) {
        this.guthabenRepository = guthabenRepository;
    }

    public Guthaben findGuthabenByBenutzerId(UUID benutzerId) {
        return guthabenRepository.findByBenutzerId(benutzerId);
    }

}
