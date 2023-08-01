package com.forum.backend.dto.auth;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {
    @NotBlank
    private String accessToken;
    @NotBlank
    private String refreshToken;
}
