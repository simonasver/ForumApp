package com.forum.backend.service;

import com.forum.backend.model.Image;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

public interface ImageService {
    UUID uploadImage(MultipartFile file);
    Image getImage(UUID imageId);
    byte[] getImageData(UUID imageId);
}
