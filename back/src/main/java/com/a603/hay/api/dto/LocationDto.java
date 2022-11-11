package com.a603.hay.api.dto;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

public class LocationDto {

  private LocationDto() {
    throw new IllegalStateException("Utility class");
  }

  @Data
  @AllArgsConstructor
  @NoArgsConstructor
  @Builder
  public static class LocationRequest {

    private double lat;
    private double lng;
    private String address;
    private int seq;
  }

  @Data
  @AllArgsConstructor
  @NoArgsConstructor
  @Builder
  public static class LocationIdRequest {

    private long locationId;
  }

  @Data
  @AllArgsConstructor
  @NoArgsConstructor
  @Builder
  public static class LocationRangeRequest {

    private int range;
  }

  @Data
  @AllArgsConstructor
  @NoArgsConstructor
  @Builder
  public static class UserLocationResponse {

    private Long id;
    private Double lat;
    private Double lng;
    private String address;
    private Integer seq;
    private LocalDateTime endDate;
    private Boolean isCurrent;
  }

  @Data
  @AllArgsConstructor
  @NoArgsConstructor
  @Builder
  public static class LocationRangeResponse {

    private int range;
  }

}
