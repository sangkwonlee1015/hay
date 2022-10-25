package com.a603.hay.common.util;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
@RequiredArgsConstructor
public class JWTInterceptor implements HandlerInterceptor {

  private static final String HEADER_AUTH = "Authorization";

  private final JWTUtil jwtUtil;

  @Override
  public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
      throws Exception {
    if (request.getMethod().equals("OPTIONS")) {
      return true;
    }
    String token = request.getHeader(HEADER_AUTH);
    token = token.substring(7, token.length()); // 토큰 앞에 `Bearer ` 붙어서 넘어오니까 제거해주고 토큰 확인
    if (jwtUtil.validateTokenExpiration(token)) {
      return true;
    } else {
      //TODO
      throw new Exception();
    }
  }
}

