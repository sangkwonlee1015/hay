package com.a603.hay.db.entity;

import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Index;
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
public class Vote {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(updatable = false)
  private Long id = null;

  @Column(length = 30)
  private String title;

  @Column
  private String body;

  @Column
  private LocalDateTime startDate;

  @Column
  private LocalDateTime endDate;

  @Column
  private boolean isCommentable;

  @Column
  private boolean isEnded;

  @Column
  private double lat;

  @Column
  private double lng;

  @Column
  private int voteCount;

  @Column
  private LocalDateTime createdAt;

  @Column
  private LocalDateTime updatedAt;
}
