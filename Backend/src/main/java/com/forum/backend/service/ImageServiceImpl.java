package com.forum.backend.service;

import com.forum.backend.exception.CustomException;
import com.forum.backend.model.Image;
import com.forum.backend.repository.ImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ImageServiceImpl implements ImageService {

    private static final long MAX_IMAGE_SIZE_BYTES = 50 * 1024 * 1024;

    private final ImageRepository imageRepository;

    @Override
    public UUID uploadImage(MultipartFile file) {
        if(!file.getContentType().startsWith("image/")) {
            throw new CustomException("Only image files are allowed", HttpStatus.BAD_REQUEST);
        }

        if(file.getSize() > MAX_IMAGE_SIZE_BYTES) {
            throw new CustomException("Image size exceeds the allowed limit (50MB)", HttpStatus.BAD_REQUEST);
        }

        byte[] imageData;

        try {
            imageData = file.getBytes();
        } catch (IOException e) {
            throw new CustomException("Could not upload the image", HttpStatus.BAD_REQUEST);
        }

        Image image = Image.builder().imageName(file.getName()).imageData(imageData).build();
        Image createdImage = imageRepository.save(image);

        return createdImage.getId();
    }

    @Override
    public Image getImage(UUID imageId) {
        Optional<Image> imageOptional = imageRepository.findById(imageId);
        if(imageOptional.isPresent()) {
            Image image = imageOptional.get();

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.IMAGE_JPEG);

            return image;
        } else {
            throw new CustomException("Image not found", HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public byte[] getImageData(UUID imageId) {
        Optional<Image> imageOptional = imageRepository.findById(imageId);
        if(imageOptional.isPresent()) {
            Image image = imageOptional.get();
            return image.getImageData();
        } else {
            throw new CustomException("Image not found", HttpStatus.NOT_FOUND);
        }
    }
}
