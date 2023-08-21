package com.forum.backend.service;

import com.forum.backend.dto.category.AddCategoryRequest;
import com.forum.backend.dto.category.ReorderCategoriesRequest;
import com.forum.backend.model.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface CategoryService {
    Page<Category> getPaginatedCategories(Pageable pageable);
    UUID addCategory(AddCategoryRequest request);
    void reorderCategories(ReorderCategoriesRequest request);
}
