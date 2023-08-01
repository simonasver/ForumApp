package com.forum.backend.repository;

import com.forum.backend.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ImageRepository extends JpaRepository<Image, UUID> {
}
