package com.forum.backend.dto.category;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChangeCategoryNameRequest {
    @NotBlank(message = "New title cannot be empty")
    private String newTitle;
}
