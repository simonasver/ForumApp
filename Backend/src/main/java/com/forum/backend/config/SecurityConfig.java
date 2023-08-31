package com.forum.backend.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.OrRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.web.cors.CorsConfiguration;

import java.util.*;
import java.util.stream.Collectors;


@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    public static final Map<String, List<String>> NonAuthenticatedUrls;
    static {
        NonAuthenticatedUrls = new HashMap<>();
        NonAuthenticatedUrls.put("/api/token/", List.of("POST", "PUT", "DELETE"));
        NonAuthenticatedUrls.put("/api/user/", List.of("POST"));
        NonAuthenticatedUrls.put("/api/category/", List.of("GET"));
    }
    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.cors((cors) -> cors.configurationSource(request -> {
            CorsConfiguration corsConfig = new CorsConfiguration();
            corsConfig.addAllowedOrigin("http://localhost:5173");
            corsConfig.addAllowedHeader("*"); // Allow all headers.
            corsConfig.addAllowedMethod("*"); // Allow all HTTP methods.

            return corsConfig;
        }));
        httpSecurity.csrf(AbstractHttpConfigurer::disable);
        httpSecurity.sessionManagement((session) -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        httpSecurity.authenticationProvider(authenticationProvider);
        httpSecurity.authorizeHttpRequests((auth) -> {
            RequestMatcher paths = new OrRequestMatcher(NonAuthenticatedUrls
                    .entrySet()
                    .stream()
                    .flatMap(entry -> entry.getValue()
                            .stream()
                            .map(method -> new AntPathRequestMatcher(entry.getKey(), method)))
                    .collect(Collectors.toList()));
            auth.requestMatchers(paths).permitAll();
            auth.anyRequest().authenticated();
        });
        httpSecurity.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
        return httpSecurity.build();
    }
}
