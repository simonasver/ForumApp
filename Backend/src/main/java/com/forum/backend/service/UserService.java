package com.forum.backend.service;

import com.forum.backend.dto.user.GetProfileResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

public interface UserService {
    GetProfileResponse getProfile();
    UUID changeProfilePicture(MultipartFile image) throws IOException;
}
