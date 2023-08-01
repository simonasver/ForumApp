package com.forum.backend.model;

import com.forum.backend.service.ImageServiceImpl;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String imageName;

    @Lob
    @Column(length = 250 * 1024 * 1024)
    private byte[] imageData;
}
