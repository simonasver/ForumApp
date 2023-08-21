package com.forum.backend.dto.category;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReorderCategoriesRequest {
    @NotEmpty(message = "Updated numbers cannot be empty")
    Map<UUID, Integer> updatedNumbers = new HashMap<UUID, Integer>();
}
