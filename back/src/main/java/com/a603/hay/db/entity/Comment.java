package com.a603.hay.db.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

@DynamicInsert
@DynamicUpdate
@Entity
@Getter
@Setter
public class Comment {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(updatable = false)
  private Long id = null;

  @Column
  private String content;

  @Column
  private int likesCount;

  @Column
  private boolean isDeleted;

  @Column
  private LocalDateTime createdAt;

  @Column
  private LocalDateTime updatedAt;

  @ManyToOne
  @JoinColumn(name = "user_id")
  private User user;

  @ManyToOne
  @JoinColumn(name = "vote_id")
  private Vote vote;

  @ManyToOne
  @JoinColumn(name = "original_id")
  private Comment comment;

  @OneToMany(mappedBy = "comment")
  private List<Comment> replies = new ArrayList<>();

}
