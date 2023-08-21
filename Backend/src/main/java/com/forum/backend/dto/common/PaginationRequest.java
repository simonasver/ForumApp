package com.forum.backend.dto.common;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Sort;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PaginationRequest {
    @Min(value = 0)
    private int page;

    @Min(value = 1)
    @Max(value = 50)
    private int size;

    private String sortField;
    private Sort.Direction sortOrder;
}
