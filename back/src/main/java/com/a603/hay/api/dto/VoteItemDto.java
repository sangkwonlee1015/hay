package com.a603.hay.api.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class VoteItemDto {

  @Getter
  @Setter
  @Builder
  @AllArgsConstructor
  @NoArgsConstructor
  public static class VoteDetailItem {

    private Long id;
    private String content;
    private int voteCount;
    private boolean isVoted;
  }

  @Getter
  @Setter
  @Builder
  @AllArgsConstructor
  @NoArgsConstructor
  public static class VoteResultItem {

    private Long id;
    private String content;
    private int voteCount;
    private List<Integer> statisticsGender;
    private List<Integer> statisticsAgeGroup;
  }

}
