package com.forum.backend.service;

import com.forum.backend.dto.auth.*;
import com.forum.backend.model.User;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

public interface AuthenticationService {
    AuthenticationResponse register(RegisterRequest request);
    AuthenticationResponse login(LoginRequest request);
    User getCurrentlyAuthenticatedUser();
    void confirmEmail(ConfirmEmailRequest request);
    void resendEmailConfirmation(ResendEmailRequest request);
    AuthenticationResponse refresh(RefreshRequest request);
}
