package com.a603.hay.api.controller;

import com.a603.hay.api.dto.ResponseDto;
import com.a603.hay.api.dto.UserDto.Token;
import com.a603.hay.api.service.UserService;
import java.security.Principal;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

  private final UserService userService;

  @GetMapping("/join")
  public void joinUser(@RequestParam String code) {
    userService.joinUser(code);
  }

  @GetMapping("/login")
  public ResponseEntity<ResponseDto<Token>> loginUser(@RequestParam String code) {
    return new ResponseEntity<>(new ResponseDto<>(userService.loginUser(code)), HttpStatus.OK);
  }

  @GetMapping("/test")
  public ResponseEntity<ResponseDto<String>> test(Principal principal) {
    return new ResponseEntity<>(new ResponseDto<>(principal.getName()), HttpStatus.OK);
  }
}
