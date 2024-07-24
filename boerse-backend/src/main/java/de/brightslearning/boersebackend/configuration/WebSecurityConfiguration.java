package de.brightslearning.boersebackend.configuration;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.security.config.Customizer.withDefaults;

@EnableWebSecurity
@Configuration
public class WebSecurityConfiguration {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        // Zeige den default logIn an: - siehe https://docs.spring.io/spring-security/reference/servlet/authentication/passwords/form.html for adaptions
        http.formLogin(withDefaults());

        // Definiere die Landingpage nach dem Logout:
        http.logout(l -> l.logoutSuccessUrl("/"));

        //Request Matcher für die Handhabung der Nutzerberechtigung.
        http.authorizeHttpRequests((authz) -> authz
                .requestMatchers("/","/login", "/register", "/h2-console/**", "/aktie/**", "/aktie/prev/**").permitAll()
                .anyRequest().authenticated());


        // Ermöglicht H2-DB support.
        http.csrf(csrf -> csrf.disable()).headers(headers -> headers.disable());

        return http.build();
    }

}
