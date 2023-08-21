package com.forum.backend.repository;

import com.forum.backend.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.UUID;

public interface CategoryRepository extends JpaRepository<Category, UUID> {
    @Query("SELECT COALESCE(MAX(i.orderIndex), 0) FROM Category i")
    int findMaxOrderIndex();
}
