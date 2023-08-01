package com.forum.backend.controller;

import com.forum.backend.dto.auth.AuthenticationResponse;
import com.forum.backend.dto.auth.ConfirmEmailRequest;
import com.forum.backend.dto.auth.RegisterRequest;
import com.forum.backend.dto.auth.ResendEmailRequest;
import com.forum.backend.dto.user.GetProfileResponse;
import com.forum.backend.service.AuthenticationService;
import com.forum.backend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final AuthenticationService authenticationService;

    private final UserService userService;

    @PostMapping("/")
    public ResponseEntity<AuthenticationResponse> register(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(authenticationService.register(request));
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/profile")
    public ResponseEntity<GetProfileResponse> getProfile() {
        System.out.println("get profile");
        return ResponseEntity.ok(userService.getProfile());
    }

    @PutMapping("/emailConfirmationCode")
    public void confirmEmail(@Valid @RequestBody ConfirmEmailRequest request) {
        authenticationService.confirmEmail(request);
    }

    @PutMapping("/email")
    public void resendEmailConfirmation(@Valid @RequestBody ResendEmailRequest request) {
        authenticationService.resendEmailConfirmation(request);
    }

    @PutMapping(value = "/profilepicture", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<UUID> changeProfilePicture(@RequestPart("file") MultipartFile file) throws IOException {
        return ResponseEntity.ok(userService.changeProfilePicture(file));
    }
}
