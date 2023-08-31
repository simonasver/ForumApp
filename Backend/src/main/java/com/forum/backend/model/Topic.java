package com.forum.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "topics")
public class Topic {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private int orderIndex;
    private String title;
    @ManyToOne
    private User createdBy;
    private Date createDate;
    private Date lastEditDate;
    private Date lastUpdateDate;
    @ManyToOne
    private Category category;
    @OneToMany(cascade = CascadeType.ALL)
    private List<Comment> comments;
}
