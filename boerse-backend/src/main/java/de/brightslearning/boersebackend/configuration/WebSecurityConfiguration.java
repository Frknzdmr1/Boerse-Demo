package de.brightslearning.boersebackend.configuration;

import de.brightslearning.boersebackend.repository.BenutzerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static org.springframework.security.config.Customizer.withDefaults;


@EnableWebSecurity
@Configuration
public class WebSecurityConfiguration {


    private final JwtAuthEntryPoint authEntryPoint;
    private final SecurityService securityService;
    private final BenutzerRepository benutzerRepository;

    @Autowired
    public WebSecurityConfiguration(
            SecurityService securityService,
            JwtAuthEntryPoint authEntryPoint,
            BenutzerRepository benutzerRepository){
        this.securityService = securityService;
        this.authEntryPoint = authEntryPoint;
        this.benutzerRepository = benutzerRepository;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        // Zeige den default logIn an: - siehe https://docs.spring.io/spring-security/reference/servlet/authentication/passwords/form.html for adaptions

        http
                .csrf(AbstractHttpConfigurer::disable)
                .exceptionHandling(exception -> exception.authenticationEntryPoint(authEntryPoint))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .headers(h -> h.frameOptions(
                        HeadersConfigurer.FrameOptionsConfig::sameOrigin
                ))
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/portfolio/**", "/aktie/**", "/benutzer/**")
                        .permitAll()
                        .requestMatchers("/", "/auth/login", "/auth/register", "/h2-console/**", "/current-price/**", "/guthaben/**")
                        .permitAll()
                        .anyRequest().authenticated()
                );
        http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
        http.httpBasic(withDefaults());


        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public JWTAuthenticationFilter jwtAuthenticationFilter(){
        return new JWTAuthenticationFilter(new JWTGenerator(benutzerRepository), new SecurityService(benutzerRepository));
    }


}
