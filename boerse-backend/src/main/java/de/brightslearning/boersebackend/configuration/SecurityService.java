package de.brightslearning.boersebackend.configuration;


import de.brightslearning.boersebackend.model.Benutzer;
import de.brightslearning.boersebackend.model.UserRolle;
import de.brightslearning.boersebackend.repository.BenutzerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

@Service
public class SecurityService implements UserDetailsService {

    private final BenutzerRepository benutzerRepository;

    @Autowired
    public SecurityService(BenutzerRepository benutzerRepository) {
        this.benutzerRepository = benutzerRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Benutzer benutzer = benutzerRepository.findByBenutzername(username).orElseThrow(
                () -> new UsernameNotFoundException("Der Benutzer mit diesem Namen wurde nicht gefunden!")
        );

        return new User(
                benutzer.getBenutzername(),
                benutzer.getPasswort(),
                mapBenutzerRollenToAuthorities(benutzer.getUserRollen())
        );
    }

    private Collection<GrantedAuthority> mapBenutzerRollenToAuthorities (List<UserRolle> userRollen){
        return userRollen.stream()
                .map(role -> (GrantedAuthority) role::getBezeichnung)
                .toList();

    }
}
