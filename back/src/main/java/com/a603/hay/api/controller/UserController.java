package com.a603.hay.api.controller;

import com.a603.hay.api.dto.ResponseDto;
import com.a603.hay.api.dto.UserDto.ExtraInfoRequest;
import com.a603.hay.api.dto.UserDto.TokenResponse;
import com.a603.hay.api.service.UserService;
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
  public ResponseEntity<ResponseDto<TokenResponse>> loginUser(@RequestParam String code) {
    return new ResponseEntity<>(new ResponseDto<>(userService.loginUser(code)), HttpStatus.OK);
  }

  @GetMapping("/join")
  public ResponseEntity<ResponseDto<String>> joinUser(@RequestParam String code) {
    userService.joinUser(code);
    return new ResponseEntity<>(new ResponseDto<>("success"), HttpStatus.OK);
  }

  @PostMapping("/info")
  public ResponseEntity<ResponseDto<String>> registerUserInfo(
      @RequestBody ExtraInfoRequest extraInfo) {
    userService.registerUserInfo(extraInfo);
    return new ResponseEntity<>(new ResponseDto<>("success"), HttpStatus.OK);
  }

  @GetMapping("/test")
  public ResponseEntity<ResponseDto<String>> test(Principal principal) {
    return new ResponseEntity<>(new ResponseDto<>(principal.getName()), HttpStatus.OK);
  }
}
