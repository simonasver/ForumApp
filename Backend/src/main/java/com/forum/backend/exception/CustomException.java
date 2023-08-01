package com.forum.backend.exception;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
@AllArgsConstructor
public class CustomException extends RuntimeException {
    private final String message;
    private final HttpStatus httpStatus;
}
