package com.forum.backend.controller;

import com.forum.backend.dto.category.AddCategoryRequest;
import com.forum.backend.dto.category.ChangeCategoryNameRequest;
import com.forum.backend.dto.category.ReorderCategoriesRequest;
import com.forum.backend.dto.common.PaginationRequest;
import com.forum.backend.model.Category;
import com.forum.backend.service.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/category")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping("/")
    public ResponseEntity<Page<Category>> getPaginatedCategories(@Valid @ModelAttribute PaginationRequest paginationRequest) {
        Sort sort = Sort.by(paginationRequest.getSortOrder(), paginationRequest.getSortField());
        Pageable pageable = PageRequest.of(paginationRequest.getPage(), paginationRequest.getSize(), sort);
        Page<Category> categories = categoryService.getPaginatedCategories(pageable);
        return ResponseEntity.ok(categories);
    }

    @PostMapping("/")
    public ResponseEntity<UUID> addCategory(@Valid @RequestBody AddCategoryRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(categoryService.addCategory(request));
    }

    @PutMapping("/order")
    public void reorderCategories(@Valid @RequestBody ReorderCategoriesRequest request) {
        categoryService.reorderCategories(request);
    }

    @PutMapping("/{categoryId}/title")
    public ResponseEntity<Category> changeCategoryName(@PathVariable UUID categoryId, @Valid @RequestBody ChangeCategoryNameRequest request) {
        return ResponseEntity.ok(categoryService.updateCategoryName(categoryId, request));
    }

    @DeleteMapping("/{categoryId}")
    public ResponseEntity<Void> deleteCategory(@PathVariable UUID categoryId) {
        categoryService.deleteCategory(categoryId);
        return ResponseEntity.noContent().build();
    }
}
