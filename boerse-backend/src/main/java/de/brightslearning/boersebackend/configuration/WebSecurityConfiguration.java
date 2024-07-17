//package de.brightslearning.boersebackend.configuration;
//
//package com.example.linkzsolution.security;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.crypto.factory.PasswordEncoderFactories;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.web.SecurityFilterChain;
//
//import static org.springframework.security.config.Customizer.withDefaults;
//
//@EnableWebSecurity
//@Configuration
//public class WebSecurityConfiguration {
//
//    @Bean
//    public PasswordEncoder passwordEncoder() {
//        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
//    }
//
//    @Bean
//    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//        // provide default login - see https://docs.spring.io/spring-security/reference/servlet/authentication/passwords/form.html for adaptions
//        http.formLogin(withDefaults());
//
//        // configure the logout behaviour: back to root url!
//        http.logout(l -> l.logoutSuccessUrl("/"));
//
//        // use requestMatchers since Spring Security 6
//        // see: https://docs.spring.io/spring-security/reference/5.8/migration/servlet/config.html
//        http.authorizeHttpRequests((authz) -> authz
//                .requestMatchers("/delete/*").hasAuthority("DELETE_LINK")
//                .requestMatchers("/", "/register", "/h2-console/**").permitAll()
//                .anyRequest().authenticated());
//
//
//        // enable h2-console support
//        http.csrf(csrf -> csrf.disable()).headers(headers -> headers.disable());
//
//        return http.build();
//    }
//
//,
//}
