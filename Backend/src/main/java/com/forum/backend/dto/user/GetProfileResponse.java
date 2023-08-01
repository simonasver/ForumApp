package com.forum.backend.dto.user;

import com.forum.backend.model.Image;
import com.forum.backend.model.UserRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GetProfileResponse {
    private UUID id;
    private String username;
    private String email;
    private boolean isEmailConfirmed;
    private Date registerDate;
    private Date lastEditDate;
    private Date lastLoginDate;
    private UserRole role;
    private UUID profilePictureId;
}
