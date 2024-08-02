package de.brightslearning.boersebackend.controller;

import de.brightslearning.boersebackend.model.Guthaben;
import de.brightslearning.boersebackend.service.GuthabenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/guthaben")
public class GuthabenController {

    private final GuthabenService guthabenService;

    @Autowired
    public GuthabenController(GuthabenService guthabenService) {
        this.guthabenService = guthabenService;
    }

    // Endpoint zum Abrufen des Guthabens eines Benutzers
    @GetMapping("/{benutzerId}")
    public Guthaben getGuthabenByBenutzerId(@PathVariable UUID benutzerId) {
        return guthabenService.findGuthabenByBenutzerId(benutzerId);
    }
}
