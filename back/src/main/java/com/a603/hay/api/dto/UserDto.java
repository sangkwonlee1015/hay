package com.a603.hay.api.dto;

import lombok.*;

public class UserDto {

  @Data
  @AllArgsConstructor
  public static class Token{
    private String accessToken;
    private String refreshToken;
  }
}
