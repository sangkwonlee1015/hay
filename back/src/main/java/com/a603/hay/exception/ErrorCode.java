package com.a603.hay.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {

  //400 BAD_REQUEST : 잘못된 요청
  BAD_REQUEST(HttpStatus.BAD_REQUEST, "잘못된 요청입니다."),
  KAKAO_EMAIL_NOT_FOUND(HttpStatus.BAD_REQUEST, "카카오 계정에 등록된 이메일이 없습니다."),
  USER_EXIST(HttpStatus.BAD_REQUEST, "해당 이메일을 사용하는 유저가 존재합니다."),
  USER_NOT_EXIST(HttpStatus.BAD_REQUEST, "해당 이메일을 사용하는 유저가 존재하지 않습니다."),
  EXTRA_INFO_EXIST(HttpStatus.BAD_REQUEST, "이미 추가 정보 입력이 완료된 유저입니다."),
  EXTRA_INFO_NOT_EXIST(HttpStatus.BAD_REQUEST, "회원가입후 추가 정보 입력이 필요합니다."),
  NICKNAME_EXIST(HttpStatus.BAD_REQUEST, "해당 닉네임을 사용하는 유저가 존재합니다"),

  //403 FORBIDDEN : 권한이 없는 리소스에 접근
  FORBIDDEN(HttpStatus.FORBIDDEN, "권한이 없습니다."),

  //404 NOT_FOUND : 리소스를 찾을 수 없음
  POSTS_NOT_FOUND(HttpStatus.NOT_FOUND, "정보를 찾을 수 없습니다."),
  VOTE_NOT_FOUND(HttpStatus.NOT_FOUND, "투표를 찾을 수 없습니다."),
  VOTEITEM_NOT_FOUND(HttpStatus.NOT_FOUND, "투표 항목을 찾을 수 없습니다."),
  COMMENT_NOT_FOUND(HttpStatus.NOT_FOUND, "댓글을 찾을 수 없습니다."),
  CATEGORY_NOT_FOUND(HttpStatus.NOT_FOUND, "카테고리를 찾을 수 없습니다."),
  LOCATION_NOT_FOUND(HttpStatus.NOT_FOUND, "위치정보를 찾을 수 없습니다."),

  //405 METHOD_NOT_ALLOWED: 허용되지 않은 Request Method 호출
  METHOD_NOT_ALLOWED(HttpStatus.METHOD_NOT_ALLOWED, "허용되지 않은 메서드입니다."),

  //500 INTERNAL_SERVER_ERROR: 내부 서버 오류
  INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "내부 서버 오류입니다.");

  private final HttpStatus status;
  private final String message;
}