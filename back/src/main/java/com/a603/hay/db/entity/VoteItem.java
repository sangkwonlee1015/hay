package com.a603.hay.db.entity;

import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

@DynamicInsert
@DynamicUpdate
@Entity
@Getter
@Setter
public class VoteItem {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(updatable = false)
  private Long id = null;

  @Column
  private String content;

  @Column
  private int voteCount;

  @Column
  private LocalDateTime createdAt;

  @Column
  private LocalDateTime updatedAt;

  @ManyToOne
  @JoinColumn(name = "vote_id")
  private Vote vote;
}
