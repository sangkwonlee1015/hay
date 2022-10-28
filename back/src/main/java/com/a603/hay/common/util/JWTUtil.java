package com.a603.hay.common.util;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import java.util.Base64;
import java.util.Date;
import javax.annotation.PostConstruct;
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

  public String generateAccessToken(String userEmail) {
    Algorithm algorithm = Algorithm.HMAC256(secretKey.getBytes());

    return JWT.create()
        .withSubject(userEmail)
        .withExpiresAt(new Date(System.currentTimeMillis() + REFRESH_EXPIRE_MINUTES))
        .withIssuer("hay")
        .sign(algorithm);
  }

  public String generateRefreshToken(String userEmail) {
    Algorithm algorithm = Algorithm.HMAC256(secretKey.getBytes());

    return JWT.create()
        .withSubject(userEmail)
        .withExpiresAt(new Date(System.currentTimeMillis() + REFRESH_EXPIRE_MINUTES))
        .withIssuer("hay")
        .sign(algorithm);
  }
}
