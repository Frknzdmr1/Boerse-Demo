package de.brightslearning.boersebackend.configuration;


import de.brightslearning.boersebackend.model.Benutzer;
import de.brightslearning.boersebackend.repository.BenutzerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ModelAttribute;

@ControllerAdvice
public class SecurityControllerAdvice {

    private final BenutzerRepository benutzerRepository;

    @Autowired
    public SecurityControllerAdvice(BenutzerRepository benutzerRepository) {
        this.benutzerRepository = benutzerRepository;
    }

    @ModelAttribute("sessionUser")
    public Benutzer sessionUser(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails != null) {
            return benutzerRepository.findBenutzerByBenutzername(userDetails.getUsername());
        }
        return null;
    }
}
