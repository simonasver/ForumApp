package com.forum.backend.service;

import com.forum.backend.dto.category.AddCategoryRequest;
import com.forum.backend.dto.category.ReorderCategoriesRequest;
import com.forum.backend.exception.CustomException;
import com.forum.backend.model.Category;
import com.forum.backend.model.UserRole;
import com.forum.backend.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final int MAX_CATEGORIES = 50;
    private final AuthenticationService authenticationService;
    private final CategoryRepository categoryRepository;

    public Page<Category> getPaginatedCategories(Pageable pageable) {
        return categoryRepository.findAll(pageable);
    }

    public UUID addCategory(AddCategoryRequest request) {
        var user = authenticationService.getCurrentlyAuthenticatedUser();
        if(user == null || user.getRole() != UserRole.ADMIN) {
            throw new CustomException("Access denied", HttpStatus.FORBIDDEN);
        }

        if(categoryRepository.count() >= MAX_CATEGORIES) {
            throw new CustomException("Too many categories (max 50)", HttpStatus.BAD_REQUEST);
        }

        var maxOrderIndex = categoryRepository.findMaxOrderIndex();

        var category = Category.builder()
                .title(request.getTitle())
                .orderIndex(maxOrderIndex + 1)
                .createDate(new Date(System.currentTimeMillis()))
                .lastEditDate(new Date(System.currentTimeMillis()))
                .createdBy(user)
                .build();
        var savedCategory = categoryRepository.save(category);
        return savedCategory.getId();
    }

    public void reorderCategories(ReorderCategoriesRequest request) {
        var user = authenticationService.getCurrentlyAuthenticatedUser();
        if(user == null || user.getRole() != UserRole.ADMIN) {
            throw new CustomException("Access denied", HttpStatus.FORBIDDEN);
        }

        for(var entry : request.getUpdatedNumbers().keySet()) {
            var categoryOptional = categoryRepository.findById(entry);

            if(categoryOptional.isPresent()) {
                var category = categoryOptional.get();
                category.setOrderIndex(request.getUpdatedNumbers().get(entry));
                categoryRepository.save(category);
            }
        }
    }
}
