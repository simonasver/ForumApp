package com.forum.backend.controller;

import com.forum.backend.dto.auth.AuthenticationResponse;
import com.forum.backend.dto.auth.LoginRequest;
import com.forum.backend.dto.auth.RefreshRequest;
import com.forum.backend.service.AuthenticationService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/token")
@RequiredArgsConstructor
public class TokenController {

    private final AuthenticationService authenticationService;

    private final LogoutHandler logoutHandler;

    @PostMapping("/")
    public ResponseEntity<AuthenticationResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authenticationService.login(request));
    }

    @PutMapping("/")
    public ResponseEntity<AuthenticationResponse> refresh(@Valid @RequestBody RefreshRequest request) {
        return ResponseEntity.ok(authenticationService.refresh(request));
    }

    @DeleteMapping("/")
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        logoutHandler.logout(request, response, authentication);
    }
}
