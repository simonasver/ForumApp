package com.forum.backend.config;

import com.forum.backend.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LogoutService implements LogoutHandler {

    private final JwtService jwtService;

    private final UserRepository userRepository;

    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return;
        }
        jwt = authHeader.substring(7);
        var username = jwtService.extractUserName(jwt);
        var user = userRepository.findByUsername(username).orElseThrow();
        if(user.getRefreshToken() != null) {
            user.setRefreshToken(null);
            userRepository.save(user);
        }
        SecurityContextHolder.clearContext();
    }
}
