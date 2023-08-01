package com.forum.backend.exception;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.validation.ConstraintViolationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.ArrayList;
import java.util.List;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<String> handleCustomException(CustomException ex) {
        log.error("CustomException " + ex.getHttpStatus().toString() + " " + ex.getMessage());
        return ResponseEntity.status(ex.getHttpStatus()).body(ex.getMessage());
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<String> handleAccessDeniedException() {
        log.error("AccessDeniedException");
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access denied");
    }

    @ExceptionHandler(ExpiredJwtException.class)
    public ResponseEntity<String> handleExpiredJwtException() {
        log.error("ExpiredJwtException");
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access token is expired");
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<String> handleBadCredentialException(BadCredentialsException ex) {
        log.error("BadCredentialsException");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Bad credentials");
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<String> handleConstraintViolationException(ConstraintViolationException ex){
        log.error("ConstraintViolationException");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<String> handleConstraintViolationException(MethodArgumentNotValidException ex){
        log.error("MethodArgumentNotValidException");
        List<String> errorMessages = new ArrayList<>();
        for(FieldError error : ex.getBindingResult().getFieldErrors()) {
            errorMessages.add(error.getDefaultMessage());
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(String.join(", ", errorMessages));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception ex) {
        log.error("Exception of type " + ex.getClass());
        ex.printStackTrace();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Something went wrong");
    }
}
