package de.brightslearning.boersebackend.configuration;


import de.brightslearning.boersebackend.model.Benutzer;
import de.brightslearning.boersebackend.repository.BenutzerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
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
        Benutzer user = benutzerRepository.findBenutzerByBenutzername(username);

        List<GrantedAuthority> authorities = new LinkedList<>();
        if (user.getKontotyp().equals("Admin")) {
            authorities.add(new SimpleGrantedAuthority("DELETE_LINK"));
        }

        return new org.springframework.security.core.userdetails.User(
                user.getBenutzername(), user.getPasswort(), authorities
        );
    }
}
