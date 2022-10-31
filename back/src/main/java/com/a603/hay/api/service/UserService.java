package com.a603.hay.api.service;

import com.a603.hay.api.dto.ResponseDto;
import com.a603.hay.api.dto.UserDto.DuplicateNicknameResponse;
import com.a603.hay.api.dto.UserDto.ExtraDataResponse;
import com.a603.hay.api.dto.UserDto.ExtraInfoRequest;
import com.a603.hay.api.dto.UserDto.NicknameRequest;
import com.a603.hay.api.dto.UserDto.TokenResponse;
import com.a603.hay.common.util.JWTUtil;
import com.a603.hay.db.entity.Location;
import com.a603.hay.db.entity.User;
import com.a603.hay.db.repository.LocationRepository;
import com.a603.hay.db.repository.UserRepository;
import com.a603.hay.exception.CustomException;
import com.a603.hay.exception.ErrorCode;
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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

  private final UserRepository userRepository;
  private final LocationRepository locationRepository;
  private final JWTUtil jwtUtil;

  private static final String JOIN_REDIRECT_URI = "http://localhost:8080/api/user/join";
  private static final String LOGIN_REDIRECT_URI = "http://localhost:8080/api/user/login";

  @Transactional
  public ResponseEntity<ResponseDto<?>> loginUser(String code) {
    String kaKaoAccessToken = getKaKaoAccessToken(code, LOGIN_REDIRECT_URI);
    Map<String, Object> userInfo = getUserInfoFromKakao(kaKaoAccessToken);
    String email = (String) userInfo.get("email");

    if (email == null) {
      throw new CustomException(ErrorCode.KAKAO_EMAIL_NOT_FOUND);
    }

    Optional<User> userOptional = userRepository.findByEmail(email);
    User user = userOptional.orElse(null);

    if (user != null) {
      if (user.getNickname() != null) { //1. 회원가입된 유저 //TODO 추가정보 입력 유저 확인 로직 강화 필요
        return new ResponseEntity<>(
            new ResponseDto<>(new TokenResponse(jwtUtil.generateAccessToken(user),
                jwtUtil.generateRefreshToken(user))), HttpStatus.OK);
      } else { //2. 회원가입되었지만 추가 정보 없는 유저
        return new ResponseEntity<>(
            new ResponseDto<>(new ExtraDataResponse(false)), HttpStatus.OK);
      }
    } else { //3. 처음 로그인한 유저
      registerUser(userInfo);
      return new ResponseEntity<>(
          new ResponseDto<>(new ExtraDataResponse(false)), HttpStatus.OK);
    }
  }

  @Transactional
  public void registerUserInfo(ExtraInfoRequest extraInfo) {
    User user = userRepository.findByEmail(extraInfo.getEmail()).orElse(null);
    if (user == null) {
      throw new CustomException(ErrorCode.USER_NOT_EXIST);
    }
    if (user.getNickname() != null) {
      throw new CustomException(ErrorCode.EXTRA_INFO_EXIST);
    }
    LocalDateTime now = LocalDateTime.now();

    user.setNickname(extraInfo.getNickname());
    user.setBirthYear(extraInfo.getBirthYear());
    user.setGender(extraInfo.getGender());

    Location location = new Location();
    location.setLat(extraInfo.getLat());
    location.setLng(extraInfo.getLng());
    location.setAddress(extraInfo.getAddress());
    location.setCreatedAt(now);
    location.setUpdatedAt(now);
    location.setEndDate(now.plusDays(30));
    location.setUser(user);

    locationRepository.save(location);
  }

  @Transactional
  protected void registerUser(Map<String, Object> userInfo) {
    User user = new User();
    user.setKakao((String) userInfo.get("id"));
    user.setEmail((String) userInfo.get("email"));
    LocalDateTime now = LocalDateTime.now();
    user.setCreatedAt(now);
    user.setUpdatedAt(now);

    userRepository.save(user);
  }

  public DuplicateNicknameResponse checkDuplicateNickname(NicknameRequest nicknameRequest) {
    User user = userRepository.findByNickname(nicknameRequest.getNickname()).orElse(null);
    return new DuplicateNicknameResponse(user != null);
  }

  @Transactional
  public void updateNickname(String userEmail, NicknameRequest nicknameRequest) {
    User user = userRepository.findByEmail(userEmail).orElse(null);
    if (user == null) {
      throw new CustomException(ErrorCode.USER_NOT_EXIST);
    }
    if (userRepository.findByNickname(nicknameRequest.getNickname()).isPresent()) {
      throw new CustomException(ErrorCode.NICKNAME_EXIST);
    }
    user.setNickname(nicknameRequest.getNickname());
  }


  private String getKaKaoAccessToken(String code, String redirectUri) {
    String access_Token = "";
    String refresh_Token = "";
    String reqURL = "https://kauth.kakao.com/oauth/token";

    try {
      URL url = new URL(reqURL);
      HttpURLConnection conn = (HttpURLConnection) url.openConnection();
      conn.setRequestMethod("POST");
      conn.setDoOutput(true);

      BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
      StringBuilder sb = new StringBuilder();
      sb.append("grant_type=authorization_code");
      sb.append("&client_id=2cc38f3feb14c46b190ca5fe77598eb6");
      sb.append("&redirect_uri=").append(redirectUri);
      sb.append("&code=").append(code);
      bw.write(sb.toString());
      bw.flush();

      BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
      String line = "";
      StringBuilder result = new StringBuilder();

      while ((line = br.readLine()) != null) {
        result.append(line);
      }

      JsonParser parser = new JsonParser();
      JsonElement element = parser.parse(result.toString());

      access_Token = element.getAsJsonObject().get("access_token").getAsString();
      refresh_Token = element.getAsJsonObject().get("refresh_token").getAsString();

      br.close();
      bw.close();
    } catch (IOException e) {
      e.printStackTrace();
    }

    return access_Token;
  }

  private Map<String, Object> getUserInfoFromKakao(String accessToken) {
    String host = "https://kapi.kakao.com/v2/user/me";
    Map<String, Object> result = new HashMap<>();
    try {
      URL url = new URL(host);

      HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
      urlConnection.setRequestProperty("Authorization", "Bearer " + accessToken);
      urlConnection.setRequestMethod("GET");
      int responseCode = urlConnection.getResponseCode();

      BufferedReader br = new BufferedReader(new InputStreamReader(urlConnection.getInputStream()));
      String line = "";
      StringBuilder res = new StringBuilder();
      while ((line = br.readLine()) != null) {
        res.append(line);
      }

      JSONParser parser = new JSONParser();
      JSONObject obj = (JSONObject) parser.parse(res.toString());
      JSONObject kakaoAccount = (JSONObject) obj.get("kakao_account");

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
