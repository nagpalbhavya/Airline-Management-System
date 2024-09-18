package com.example.Owner_Microservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.reactive.function.client.WebClient;

@SpringBootApplication
@EntityScan("com")
@ComponentScan("com")
@EnableJpaRepositories("com")

public class OwnerMicroserviceApplication {

	public static void main(String[] args) {
		SpringApplication.run(OwnerMicroserviceApplication.class, args);
	}
	
	@Bean("webclient")
    public WebClient.Builder getWebClient()
    {
        return WebClient.builder();
    }

}
