package com.a603.hay.api.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import java.util.Date;

public class JwtService {

  private static final int REFRESH_EXPIRE_MINUTES = 1000 * 60 * 60 * 24 * 7;

  public String generateAccessToken(String userEmail) {
    Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());

    return JWT.create()
        .withSubject(userEmail)
        .withExpiresAt(new Date(System.currentTimeMillis() + REFRESH_EXPIRE_MINUTES))
        .withIssuer("hay")
        .sign(algorithm);
  }

  public String generateRefreshToken(String userEmail) {
    Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());

    return JWT.create()
        .withSubject(userEmail)
        .withExpiresAt(new Date(System.currentTimeMillis() + REFRESH_EXPIRE_MINUTES))
        .withIssuer("hay")
        .sign(algorithm);
  }
}
