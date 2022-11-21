package com.a603.hay.api.controller;

import com.a603.hay.api.dto.LocationDto.LocationRangeRequest;
import com.a603.hay.api.dto.LocationDto.LocationIdRequest;
import com.a603.hay.api.dto.LocationDto.LocationRequest;
import com.a603.hay.api.dto.ResponseDto;
import com.a603.hay.api.dto.UserDto.NicknameRequest;
import com.a603.hay.api.service.LocationService;
import com.a603.hay.api.service.UserService;
import com.a603.hay.db.entity.Location;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import java.security.Principal;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(value = "마이페이지 API", tags = {"MyPage"})
@RestController()
@RequestMapping("/api/mypage")
@RequiredArgsConstructor
public class MyPageController {

  private final UserService userService;
  private final LocationService locationService;

  @PostMapping("nickname")
  @ApiOperation(value = "닉네임 수정", notes = "닉네임 변경 기능")
  public ResponseEntity<ResponseDto<String>> updateNickname(
      Principal principal,
      @RequestBody NicknameRequest nicknameRequest) {
    userService.updateNickname(principal.getName(), nicknameRequest);
    return new ResponseEntity<>(new ResponseDto<>("success"), HttpStatus.OK);
  }

  @GetMapping("nickname")
  @ApiOperation(value = "닉네임 조회", notes = "닉네임 조회")
  public ResponseEntity<ResponseDto<String>> getNickname(
      Principal principal) {
    return new ResponseEntity<>(new ResponseDto<>(userService.getNickname(principal.getName())),
        HttpStatus.OK);
  }

  @GetMapping("location")
  @ApiOperation(value = "등록된 동네 조회", notes = "저장된 위치정보 조회")
  public ResponseEntity<ResponseDto<?>> getLocation(Principal principal) {
    return new ResponseEntity<>(
        new ResponseDto<>(locationService.getLocations(principal.getName())), HttpStatus.OK);
  }

  @PostMapping("location")
  @ApiOperation(value = "동네 추가", notes = "위치정보 저장")
  public ResponseEntity<ResponseDto<?>> registerLocation(Principal principal,
      @RequestBody LocationRequest locationRequest) {
    locationService.registerLocation(principal.getName(), locationRequest);
    return new ResponseEntity<>(new ResponseDto<>("success"), HttpStatus.OK);
  }

  @DeleteMapping("location/{locationId}")
  @ApiOperation(value = "동네 삭제", notes = "저장된 위치정보 삭제")
  public ResponseEntity<ResponseDto<?>> deleteLocation(Principal principal,
      @PathVariable Long locationId) {
    locationService.deleteLocation(principal.getName(), locationId);
    return new ResponseEntity<>(new ResponseDto<>("success"), HttpStatus.OK);
  }

  @PostMapping("location/current")
  @ApiOperation(value = "현재 동네 설정", notes = "현재 동네 설정")
  public ResponseEntity<ResponseDto<?>> setCurrentLocation(Principal principal,
      @RequestBody LocationIdRequest locationIdRequest) {
    locationService.changeCurrentSeq(principal.getName(), locationIdRequest);
    return new ResponseEntity<>(new ResponseDto<>("success"), HttpStatus.OK);
  }

  @GetMapping("location/current")
  @ApiOperation(value = "현재 동네 조회", notes = "현재 동네 조회")
  public ResponseEntity<ResponseDto<?>> getCurrentLocation(Principal principal) {
    return new ResponseEntity<>(
        new ResponseDto<>(locationService.getCurrentLocation(principal.getName())), HttpStatus.OK);
  }

  @PostMapping("location/range")
  @ApiOperation(value = "동네 범위 설정", notes = "동네 범위 설정")
  public ResponseEntity<ResponseDto<?>> setLocationRange(Principal principal,
      @RequestBody LocationRangeRequest locationRangeRequest) {
    locationService.changeLocationRange(principal.getName(), locationRangeRequest);
    return new ResponseEntity<>(new ResponseDto<>("success"), HttpStatus.OK);
  }

  @GetMapping("location/range")
  @ApiOperation(value = "동네 범위 조회", notes = "동네 범위 조회")
  public ResponseEntity<ResponseDto<?>> getLocationRange(Principal principal) {
    return new ResponseEntity<>(
        new ResponseDto<>(locationService.getLocationRange(principal.getName())), HttpStatus.OK);
  }
}
