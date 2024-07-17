//package de.brightslearning.boersebackend.configuration;
//
//package com.example.linkzsolution.security;
//
//
//import com.example.linkzsolution.user.User;
//import com.example.linkzsolution.user.UserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//
//import java.util.LinkedList;
//import java.util.List;
//
//@Service
//public class SecurityService implements UserDetailsService {
//
//    private final UserRepository userRepository;
//
//    @Autowired
//    public SecurityService(UserRepository userRepository) {
//        this.userRepository = userRepository;
//    }
//
//    @Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        User user = userRepository.findByUsernameIgnoreCase(username)
//                .orElseThrow(() -> new UsernameNotFoundException("Not found"));
//
//        List<GrantedAuthority> authorities = new LinkedList<>();
//        if (user.isAdmin()) {
//            authorities.add(new SimpleGrantedAuthority("DELETE_LINK"));
//        }
//
//        return new org.springframework.security.core.userdetails.User(
//                user.getUsername(), user.getPassword(), authorities
//        );
//    }
//}
