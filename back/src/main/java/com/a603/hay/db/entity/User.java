package com.a603.hay.db.entity;

import java.sql.Timestamp;
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
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(updatable = false)
  private Long id = null;

  @Column
  private String email;

  @Column
  private String nickname;

  @Column
  private int birthYear;

  @Column
  private String gender;

  @Column
  private String kakao;

  @Column
  private long currentLocation;

  @Column
  private int currentRange;

  @Column
  private LocalDateTime deletedAt;

  @Column
  private LocalDateTime createdAt;

  @Column
  private LocalDateTime updatedAt;


}
