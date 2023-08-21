package com.forum.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "segments")
public class Segment {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private int orderIndex;
    private String title;
    @ManyToOne
    private User createdBy;
    private Date createDate;
    private Date lastEditDate;
}
