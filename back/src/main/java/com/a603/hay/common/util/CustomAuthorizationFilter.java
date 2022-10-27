package com.a603.hay.common.util;

import static com.google.common.net.HttpHeaders.AUTHORIZATION;
import static javax.servlet.http.HttpServletResponse.SC_FORBIDDEN;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.client.HttpClientErrorException.Forbidden;
import org.springframework.web.filter.OncePerRequestFilter;

@Slf4j
public class CustomAuthorizationFilter extends OncePerRequestFilter {


  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
      FilterChain filterChain) throws ServletException, IOException {
    if (request.getServletPath().equals("/api/login")) {
      filterChain.doFilter(request, response);
    } else {
      String authorizationHeader = request.getHeader(AUTHORIZATION);
      if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
        try {
          String token = authorizationHeader.substring("Bearar ".length());
          Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
          JWTVerifier verifier = JWT.require(algorithm).build();
          DecodedJWT decodedJWT = verifier.verify(token);
          String userEmail = decodedJWT.getSubject();
          UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
              userEmail, null);
          SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        } catch (Exception e) {
          log.error("Error loggin in : {}", e.getMessage());
          response.setHeader("errer", e.getMessage());
          response.sendError(SC_FORBIDDEN);
        }
      }
    }
    filterChain.doFilter(request, response);
  }
}
