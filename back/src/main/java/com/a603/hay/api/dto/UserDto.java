package com.a603.hay.api.dto;

import lombok.*;

public class UserDto {

  @Data
  @AllArgsConstructor
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
  public static class TokenResponse {
    private String accessToken;
    private String refreshToken;
  }

}
