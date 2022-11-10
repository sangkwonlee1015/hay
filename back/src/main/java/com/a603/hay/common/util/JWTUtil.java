package com.a603.hay.common.util;

import com.a603.hay.db.entity.User;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import java.util.Date;
import java.util.HashMap;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.PropertySources;
import org.springframework.stereotype.Component;

@Component
@PropertySources({
    @PropertySource("classpath:application.properties"),
})
public class JWTUtil {

  private static final int REFRESH_EXPIRE_MINUTES = 1000 * 60 * 60 * 24 * 7;

  @Value("${jwt.secret}")
  private String secretKey;

  public String generateAccessToken(User user) {
    Algorithm algorithm = Algorithm.HMAC256(secretKey.getBytes());

    HashMap<String, String> payloads = new HashMap<String, String>();
    payloads.put("nickname", user.getNickname());
    return JWT.create()
        .withSubject(user.getEmail())
        .withExpiresAt(new Date(System.currentTimeMillis() + REFRESH_EXPIRE_MINUTES))
        .withPayload(payloads)
        .withIssuer("hay")
        .sign(algorithm);
  }

  public String generateRefreshToken(User user) {
    Algorithm algorithm = Algorithm.HMAC256(secretKey.getBytes());

    return JWT.create()
        .withSubject(user.getEmail())
        .withExpiresAt(new Date(System.currentTimeMillis() + REFRESH_EXPIRE_MINUTES))
        .withIssuer("hay")
        .sign(algorithm);
  }
}
