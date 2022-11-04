package com.a603.hay.api.dto;

import lombok.*;

public class UserDto {

  @Data
  @AllArgsConstructor
  @NoArgsConstructor
  public static class ExtraInfoRequest {

    private String email;
    private String nickname;
    private int birthYear;
    private String gender;

    private double lat;
    private double lng;
    private String address;
  }

  @Data
  @AllArgsConstructor
  @NoArgsConstructor
  public static class NicknameRequest {

    private String nickname;
  }

  @Data
  @AllArgsConstructor
  @NoArgsConstructor
  public static class TokenResponse {

    private String accessToken;
    private String refreshToken;
    private boolean extraData;

  }

  @Data
  @AllArgsConstructor
  @NoArgsConstructor
  public static class DuplicateNicknameResponse {

    private boolean isDuplicate;
  }

  @Data
  @AllArgsConstructor
  @NoArgsConstructor
  public static class ExtraDataResponse {

    private boolean extraData;
  }
}
