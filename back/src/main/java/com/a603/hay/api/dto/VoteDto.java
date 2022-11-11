package com.a603.hay.api.dto;

import com.a603.hay.api.dto.CommentDto.VoteDetailComment;
import com.a603.hay.api.dto.VoteItemDto.VoteDetailItem;
import com.a603.hay.api.dto.VoteItemDto.VoteResultItem;
import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class VoteDto {

  private VoteDto() {
    throw new IllegalStateException("Utility class");
  }

  @Getter
  @Setter
  @Builder
  @AllArgsConstructor
  @NoArgsConstructor
  public static class CreateVoteRequest {

    private String title;
    private String body;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime endDate;
    private boolean isCommentable;
    private long categoryId;
    private List<String> voteItemContents;
    private List<String> imageUrls;
  }

  @Getter
  @Setter
  @Builder
  @AllArgsConstructor
  @NoArgsConstructor
  public static class VoteOneRequest {

    private long voteItemId;
  }

  @Getter
  @Setter
  @Builder
  @AllArgsConstructor
  @NoArgsConstructor
  public static class VoteListResponse {

    private VoteListResponseVote bestVote;
    private List<VoteListResponseVote> votes;
  }

  @Getter
  @Setter
  @Builder
  @AllArgsConstructor
  @NoArgsConstructor
  public static class VoteListResponseVote {

    private Long id;
    private String title;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private boolean isEnded;
    private int voteCount;
  }

  @Getter
  @Setter
  @Builder
  @AllArgsConstructor
  @NoArgsConstructor
  public static class VoteDetailResponse {

    private boolean isVoted;
    private String title;
    private String body;
    private int distanceLevel;
    private String writerNickname;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private boolean isEnded;
    private int voteCount;
    private List<VoteDetailItem> voteItems;
    private VoteDetailComment bestComment;
    private List<VoteDetailComment> comments;
    private List<String> imageUrls;
  }

  @Getter
  @Setter
  @Builder
  @AllArgsConstructor
  @NoArgsConstructor
  public static class VoteResultResponse {

    private List<VoteResultItem> voteResultItems;
  }

}
