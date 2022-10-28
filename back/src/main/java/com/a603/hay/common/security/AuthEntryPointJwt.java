package com.a603.hay.common.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class AuthEntryPointJwt implements AuthenticationEntryPoint {

  //TODO 에러처리 변경
  @Override
  public void commence(HttpServletRequest request, HttpServletResponse response,
      AuthenticationException authException)
      throws IOException {

    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
    response.setContentType("application/json");

    PrintWriter writer = response.getWriter();
    writer.println();

    Gson gson = new Gson();
    JsonObject jsonObject = new JsonObject();
    jsonObject.addProperty("response", "unauthorized");
    String jsonStr = gson.toJson(jsonObject);
    writer.println(jsonStr);

//    log.error("Unauthorized error: {}", authException.getMessage());
//    response.setContentType(MediaType.APPLICATION_JSON_VALUE);
//    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
//
//    final Map<String, Object> body = new HashMap<>();
//    body.put("status", HttpServletResponse.SC_UNAUTHORIZED);
//    body.put("error", "Unauthorized");
//    body.put("message", authException.getMessage());
//    body.put("path", request.getServletPath());
//
//    final ObjectMapper mapper = new ObjectMapper();
//    mapper.writeValue(response.getOutputStream(),
//        body);
//    response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Error: Unauthorized");

  }

}
