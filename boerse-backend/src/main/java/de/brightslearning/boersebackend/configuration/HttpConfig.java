package de.brightslearning.boersebackend.configuration;


import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


    @Configuration
    public class HttpConfig implements WebMvcConfigurer {
        public void addCorsMappings(CorsRegistry registry) {
            registry.addMapping("/**").allowedMethods("*", "GET", "POST", "PUT", "DELETE", "OPTIONS");
            registry.addMapping("/api/**")
                    .allowedOrigins("http://localhost:5173")
                    .allowedHeaders("*")
                    .allowCredentials(true);
        }
    }

