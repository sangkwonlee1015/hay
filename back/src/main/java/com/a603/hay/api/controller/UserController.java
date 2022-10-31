package com.a603.hay.api.controller;

import com.a603.hay.api.dto.ResponseDto;
import com.a603.hay.api.dto.UserDto.DuplicateNicknameResponse;
import com.a603.hay.api.dto.UserDto.ExtraInfoRequest;
import com.a603.hay.api.dto.UserDto.NicknameRequest;
import com.a603.hay.api.dto.UserDto.TokenResponse;
import com.a603.hay.api.service.UserService;
import io.swagger.annotations.ApiOperation;
import java.security.Principal;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

  private final UserService userService;

  @GetMapping("/login")
  @ApiOperation(value = "로그인", notes = "로그인")
  public ResponseEntity<ResponseDto<?>> loginUser(@RequestParam String code) {
    return userService.loginUser(code);
  }

  @PostMapping("/info")
  @ApiOperation(value = "회원가입-추가정보 입력", notes = "회원가입-추가정보 입력")
  public ResponseEntity<ResponseDto<String>> registerUserInfo(
      @RequestBody ExtraInfoRequest extraInfo) {
    userService.registerUserInfo(extraInfo);
    return new ResponseEntity<>(new ResponseDto<>("success"), HttpStatus.OK);
  }

  @PostMapping("nickname/check")
  @ApiOperation(value = "닉네임 중복 체크", notes = "닉네임 중복 체크")
  public ResponseEntity<ResponseDto<DuplicateNicknameResponse>> checkDuplicateNickname(
      @RequestBody NicknameRequest nicknameRequest) {
    return new ResponseEntity<>(
        new ResponseDto<>(userService.checkDuplicateNickname(nicknameRequest)), HttpStatus.OK);
  }

  @GetMapping("/test")
  public ResponseEntity<ResponseDto<String>> test(Principal principal) {
    return new ResponseEntity<>(new ResponseDto<>(principal.getName()), HttpStatus.OK);
  }
}
