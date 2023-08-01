package com.forum.backend.controller;

import com.forum.backend.dto.auth.RegisterRequest;
import com.forum.backend.exception.CustomException;
import com.forum.backend.service.ImageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/image")
@RequiredArgsConstructor
public class ImageController {

    private final ImageService imageService;

    @GetMapping("/{id}")
    public ResponseEntity<byte[]> getImage(@PathVariable UUID id) {
        byte[] imageData = imageService.getImageData(id);

        if(imageData != null) {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.IMAGE_JPEG);
            headers.setContentLength(imageData.length);

            return new ResponseEntity<>(imageData, headers, HttpStatus.OK);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
