package com.forum.backend.service;

import com.forum.backend.config.JwtService;
import com.forum.backend.dto.auth.*;
import com.forum.backend.exception.CustomException;
import com.forum.backend.model.EmailDetails;
import com.forum.backend.model.User;
import com.forum.backend.model.UserRole;
import com.forum.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Objects;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final EmailService emailService;

    private final String confirmationEmailSubject = "Forum confirmation code";

    public AuthenticationResponse register(RegisterRequest request) {
        if(userRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new CustomException("Username must be unique", HttpStatus.BAD_REQUEST);
        }
        String confirmationCode = generateEmailConfirmationCode();
        var user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .emailConfirmationCode(confirmationCode)
                .isEmailConfirmed(false)
                .registerDate(new Date(System.currentTimeMillis()))
                .lastEditDate(new Date(System.currentTimeMillis()))
                .role(UserRole.USER)
                .profileImage(null)
                .build();

        userRepository.save(user);
        emailService.sendMail(
                EmailDetails.builder()
                        .subject(confirmationEmailSubject)
                        .recipient(request.getEmail())
                        .messageBody(generateConfirmationEmailBody(confirmationCode))
                        .build()
        );
        var accessToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        user.setRefreshToken(refreshToken);
        userRepository.save(user);
        return AuthenticationResponse.builder().accessToken(accessToken).refreshToken(refreshToken).build();
    }

    public AuthenticationResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );
        var user = userRepository.findByUsername(request.getUsername()).orElseThrow();
        var accessToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        user.setRefreshToken(refreshToken);
        user.setLastLoginDate(new Date(System.currentTimeMillis()));
        userRepository.save(user);
        return AuthenticationResponse.builder().accessToken(accessToken).refreshToken(refreshToken).build();
    }

    private Authentication getAuthentication() {
        return SecurityContextHolder.getContext().getAuthentication();
    }

    public User getCurrentlyAuthenticatedUser() {
        return userRepository.findByUsername(getAuthentication().getName()).stream().findFirst().orElse(null);
    }

    public void confirmEmail(ConfirmEmailRequest request) {
        var user = getCurrentlyAuthenticatedUser();
        if(user == null) {
            throw new CustomException("Access denied", HttpStatus.FORBIDDEN);
        }
        if(user.isEmailConfirmed()){
            throw new CustomException("E-Mail is already confirmed", HttpStatus.BAD_REQUEST);
        }
        if(!Objects.equals(user.getEmailConfirmationCode(), request.getEmailCode())) {
            throw new CustomException("Confirmation code is not correct", HttpStatus.BAD_REQUEST);
        }

        user.setEmailConfirmed(true);
        userRepository.save(user);
    }

    private String generateEmailConfirmationCode() {
        String availableSymbols = "AaBbCcDdEeFf123456789";
        StringBuilder stringBuilder = new StringBuilder();
        Random random = new Random();
        for(int i = 0; i < 6; i++) {
            stringBuilder.append(availableSymbols.charAt(random.nextInt(availableSymbols.length())));
        }
        return stringBuilder.toString();
    }

    private String generateConfirmationEmailBody(String confirmationCode) {
        return String.format("Hello,\n Thanks for joining our website.\n\nPlease use this code %s to confirm your e-mail address.", confirmationCode);
    }

    public void resendEmailConfirmation(ResendEmailRequest request) {
        var user = userRepository.findByUsername(getAuthentication().getName()).stream().findFirst().orElse(null);
        System.out.println(request.getEmail());
        if(user == null) {
            throw new CustomException("Access denied", HttpStatus.FORBIDDEN);
        }
        if(user.isEmailConfirmed()){
            throw new CustomException("E-Mail is already confirmed", HttpStatus.BAD_REQUEST);
        }
        String confirmationCode = generateEmailConfirmationCode();
        emailService.sendMail(
                EmailDetails.builder()
                        .subject(confirmationEmailSubject)
                        .recipient(request.getEmail())
                        .messageBody(generateConfirmationEmailBody(confirmationCode))
                        .build()
        );
        user.setEmail(request.getEmail());
        user.setEmailConfirmationCode(confirmationCode);
        userRepository.save(user);
    }

    public AuthenticationResponse refresh(RefreshRequest request) {
        final String refreshToken = request.getRefreshToken();
        final String username;
        username = jwtService.extractUserName(refreshToken);
        var user = userRepository.findByUsername(username).orElseThrow();
        if(jwtService.isTokenValid(refreshToken, user)) {
            var accessToken = jwtService.generateToken(user);
            return AuthenticationResponse.builder()
                    .accessToken(accessToken)
                    .refreshToken(refreshToken)
                    .build();
        } else {
            throw new CustomException("Could not authenticate", HttpStatus.BAD_REQUEST);
        }
    }
}
