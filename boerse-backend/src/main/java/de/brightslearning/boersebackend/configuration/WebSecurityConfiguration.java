package de.brightslearning.boersebackend.configuration;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.security.config.Customizer.withDefaults;

@EnableWebSecurity
@Configuration
public class WebSecurityConfiguration {


    private SecurityService securityService;

    @Autowired
    public WebSecurityConfiguration( SecurityService securityService){
        this.securityService = securityService;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        // Zeige den default logIn an: - siehe https://docs.spring.io/spring-security/reference/servlet/authentication/passwords/form.html for adaptions
        http.formLogin(withDefaults());

        // Definiere die Landingpage nach dem Logout:
        http.logout(l -> l.logoutSuccessUrl("/"));

        //Request Matcher für die Handhabung der Nutzerberechtigungen.
        http.authorizeHttpRequests( authorizations ->
                authorizations
        spring-security-login-register
                .requestMatchers("/","/login", "/register", "/h2-console/**", "/aktie/**", "/aktie/prev/**").permitAll()
                .anyRequest().authenticated())
                .httpBasic(withDefaults());



        // Ermöglicht H2-DB support.
        http.csrf(AbstractHttpConfigurer::disable).headers(AbstractHttpConfigurer::disable);

        return http.build();


    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration authenticationConfiguration) throws Exception{
        return authenticationConfiguration.getAuthenticationManager();
    }


}
