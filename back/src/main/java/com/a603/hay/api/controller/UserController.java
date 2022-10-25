package com.a603.hay.api.controller;

import com.a603.hay.api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

  private final UserService userService;


  @GetMapping("/callback")
  public void kakaoCallback(@RequestParam String code) {
    userService.loginUser(code);
  }
}
