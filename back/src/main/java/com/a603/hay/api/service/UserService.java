package com.a603.hay.api.service;

import com.a603.hay.api.dto.UserDto.Token;
import com.a603.hay.db.entity.User;
import com.a603.hay.db.repository.UserRepository;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

  private final UserRepository userRepository;
  private final JwtService jwtService;

  public void joinUser(String code) {
    String kaKaoAccessToken = getKaKaoAccessToken(code, "http://localhost:8080/api/user/join");
    Map<String, Object> userInfo = getUserInfo(kaKaoAccessToken);
    String email = (String) userInfo.get("email");

    if (email != null) {
      Optional<User> userOptional = userRepository.findByEmail(email);
      User user = userOptional.orElse(null);
      if (user != null) {
        //TODO 에러처리 이미 존재하는 유저
      }
      user = registerUser(userInfo);
    }
  }

  public Token loginUser(String code) {
    String kaKaoAccessToken = getKaKaoAccessToken(code, "http://localhost:8080/api/user/login");
    Map<String, Object> userInfo = getUserInfo(kaKaoAccessToken);
    String email = (String) userInfo.get("email");

    if (email == null) {
      //TODO 에러 처리
      throw new RuntimeException();
    }

    Optional<User> userOptional = userRepository.findByEmail(email);
    User user = userOptional.orElse(null);
    if (user != null) {
      return new Token(jwtService.generateAccessToken(user.getEmail()),
          jwtService.generateRefreshToken(user.getEmail()));
    } else {
      //TODO 에러 처리
      throw new RuntimeException();
    }

  }


  @Transactional
  protected User registerUser(Map<String, Object> userInfo) {
    User user = new User();
    user.setKakao((String) userInfo.get("id"));
    user.setEmail((String) userInfo.get("email"));
    LocalDateTime now = LocalDateTime.now();
    user.setCreatedAt(now);
    user.setUpdatedAt(now);

    userRepository.save(user);
    return user;
  }


  private String getKaKaoAccessToken(String code, String redirectUri) {
    String access_Token = "";
    String refresh_Token = "";
    String reqURL = "https://kauth.kakao.com/oauth/token";

    try {
      URL url = new URL(reqURL);
      HttpURLConnection conn = (HttpURLConnection) url.openConnection();

      //POST 요청을 위해 기본값이 false인 setDoOutput을 true로
      conn.setRequestMethod("POST");
      conn.setDoOutput(true);

      //POST 요청에 필요로 요구하는 파라미터 스트림을 통해 전송
      BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
      StringBuilder sb = new StringBuilder();
      sb.append("grant_type=authorization_code");
      sb.append("&client_id=2cc38f3feb14c46b190ca5fe77598eb6");
      // TODO REST_API_KEY 입력
      sb.append(
          "&redirect_uri=" + redirectUri);
      // TODO 인가코드 받은 redirect_uri 입력
      sb.append("&code=" + code);
      bw.write(sb.toString());
      bw.flush();

      //결과 코드가 200이라면 성공
      int responseCode = conn.getResponseCode();
//      System.out.println("responseCode : " + responseCode);
      //요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
      BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
      String line = "";
      String result = "";

      while ((line = br.readLine()) != null) {
        result += line;
      }
//      System.out.println("response body : " + result);

      //Gson 라이브러리에 포함된 클래스로 JSON파싱 객체 생성
      JsonParser parser = new JsonParser();
      JsonElement element = parser.parse(result);

      access_Token = element.getAsJsonObject().get("access_token").getAsString();
      refresh_Token = element.getAsJsonObject().get("refresh_token").getAsString();

//      System.out.println("access_token : " + access_Token);
//      System.out.println("refresh_token : " + refresh_Token);

      br.close();
      bw.close();
    } catch (IOException e) {
      e.printStackTrace();
    }

    return access_Token;
  }

  private Map<String, Object> getUserInfo(String accessToken) {
    String host = "https://kapi.kakao.com/v2/user/me";
    Map<String, Object> result = new HashMap<>();
    try {
      URL url = new URL(host);

      HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
      urlConnection.setRequestProperty("Authorization", "Bearer " + accessToken);
      urlConnection.setRequestMethod("GET");

      int responseCode = urlConnection.getResponseCode();
//      System.out.println("responseCode = " + responseCode);

      BufferedReader br = new BufferedReader(new InputStreamReader(urlConnection.getInputStream()));
      String line = "";
      String res = "";
      while ((line = br.readLine()) != null) {
        res += line;
      }

//      System.out.println("res = " + res);

      JSONParser parser = new JSONParser();
      JSONObject obj = (JSONObject) parser.parse(res);
      JSONObject kakaoAccount = (JSONObject) obj.get("kakao_account");

      // id를 포함해 kakao account 관련 정보 빼오기
      String id = obj.get("id").toString();
      result.put("id", id);
      for (Object key : kakaoAccount.keySet()) {
        result.put((String) key, kakaoAccount.get(key));
      }
      br.close();

    } catch (IOException | ParseException e) {
      e.printStackTrace();
    }

    return result;
  }

}
