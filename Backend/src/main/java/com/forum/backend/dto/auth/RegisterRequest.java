package com.forum.backend.dto.auth;


import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    @NotBlank(message = "Username cannot be empty")
    private String username;
    @NotBlank(message = "E-Mail cannot be empty")
    private String email;
    @NotBlank(message = "Password cannot be empty")
    private String password;
}
