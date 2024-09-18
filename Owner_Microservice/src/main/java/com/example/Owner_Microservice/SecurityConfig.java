/*package com.example.Owner_Microservice;

import org.springframework.context.annotation.Bean;


import java.util.ArrayList;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
@Configuration
@EnableWebSecurity
public class SecurityConfig {
	@Bean
	protected InMemoryUserDetailsManager configAuth() {
		List<UserDetails> users= new ArrayList<UserDetails>();
		List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
		authorities.add(new SimpleGrantedAuthority("Owner"));
		UserDetails admin = new User("OWNER", "{noop}owner123",authorities);
		users.add(admin);
		
		return new InMemoryUserDetailsManager(users);
	}
	
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.authorizeHttpRequests(//authorizeRequests()
				auth-> auth.requestMatchers("/airports").hasAuthority("OWNER")
				 .requestMatchers("/airlines*").hasAuthority("OWNER")
				 .requestMatchers("/schedules*").hasAuthority("OWNER")
				 .anyRequest().authenticated())
				 .formLogin(formLogin -> formLogin.defaultSuccessUrl("/airlines",true))
				 .logout(logout -> logout.logoutUrl("/logout"))
				 .exceptionHandling(eh -> eh.accessDeniedPage("/ad"));
		//THE ABOVE CODE IS USED IN PLACE OF THE DEPRICATED ONES ... i.e, The STRIKED ONES....
////		.formLogin()
////		.defaultSuccessUrl("/welcome",true)
////		.and()
////		.logout()
////		.logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
////		.and()
////		.exceptionHandling()
////		.accessDeniedPage("/ad");
//		
		return http.build();
	}
//
}
*/
