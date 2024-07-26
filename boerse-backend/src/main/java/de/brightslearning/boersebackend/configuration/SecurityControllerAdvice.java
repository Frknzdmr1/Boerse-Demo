//package de.brightslearning.boersebackend.configuration;
//
//
//import de.brightslearning.boersebackend.model.Benutzer;
//import de.brightslearning.boersebackend.repository.BenutzerRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.annotation.AuthenticationPrincipal;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.userdetails.User;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.web.bind.annotation.ControllerAdvice;
//import org.springframework.web.bind.annotation.ModelAttribute;
//
//import java.util.Collection;
//import java.util.stream.Collectors;
//
//@ControllerAdvice
//public class SecurityControllerAdvice {
//
//    private final BenutzerRepository benutzerRepository;
//
//    @Autowired
//    public SecurityControllerAdvice(BenutzerRepository benutzerRepository) {
//        this.benutzerRepository = benutzerRepository;
//    }
//
//    @ModelAttribute("sessionUser")
//    public Benutzer sessionUser(@AuthenticationPrincipal UserDetails userDetails) {
//        Benutzer benutzer = new Benutzer();
//        if (userDetails != null) {
//             benutzer = benutzerRepository.findBenutzername(userDetails.getUsername()).orElseThrow(
//                    () -> new UsernameNotFoundException("No User with this name found!")
//            );
//        }
//        return null;
//    }
//
//
//}

