package com.forum.backend.service;

import com.forum.backend.dto.user.GetProfileResponse;
import com.forum.backend.exception.CustomException;
import com.forum.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final AuthenticationService authenticationService;

    private final ImageService imageService;

    private final UserRepository userRepository;

    @Override
    public GetProfileResponse getProfile() {
        var user = authenticationService.getCurrentlyAuthenticatedUser();
        if(user == null) {
            throw new CustomException("Access denied", HttpStatus.FORBIDDEN);
        }
        return GetProfileResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .isEmailConfirmed(user.isEmailConfirmed())
                .registerDate(user.getRegisterDate())
                .lastEditDate(user.getLastEditDate())
                .lastLoginDate(user.getLastLoginDate())
                .role(user.getRole())
                .profilePictureId(user.getProfileImage().getId())
                .build();
    }

    @Override
    public UUID changeProfilePicture(MultipartFile file) throws IOException {
        var user = authenticationService.getCurrentlyAuthenticatedUser();
        if(user == null) {
            throw new CustomException("Access denied", HttpStatus.FORBIDDEN);
        }

        var uploadedImageId = imageService.uploadImage(file);
        var image = imageService.getImage(uploadedImageId);

        user.setProfileImage(image);
        userRepository.save(user);
        return uploadedImageId;
    }
}
