package de.brightslearning.boersebackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan("de.brightslearning.boersebackend.model")
@EnableJpaRepositories("de.brightslearning.boersebackend.repository")
public class BoerseBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BoerseBackendApplication.class, args);
	}
}
