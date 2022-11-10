package com.a603.hay.api.service;

import com.a603.hay.api.dto.LocationDto.LocationRangeRequest;
import com.a603.hay.api.dto.LocationDto.LocationIdRequest;
import com.a603.hay.api.dto.LocationDto.LocationRequest;
import com.a603.hay.api.dto.LocationDto.UserLocationResponse;
import com.a603.hay.db.entity.Location;
import com.a603.hay.db.entity.User;
import com.a603.hay.db.repository.LocationRepository;
import com.a603.hay.db.repository.UserRepository;
import com.a603.hay.exception.CustomException;
import com.a603.hay.exception.ErrorCode;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class LocationService {

  private final LocationRepository locationRepository;
  private final UserRepository userRepository;

  public List<UserLocationResponse> getLocations(String userEmail) {
    User user = userRepository.findByEmail(userEmail).orElse(null);
    if (user == null) {
      throw new CustomException(ErrorCode.USER_NOT_EXIST);
    }
    List<Location> locations = locationRepository.findAllByUser(user);
    List<UserLocationResponse> userLocationResponses = new ArrayList<>();
    long currentLocationId = user.getCurrentLocation();
    locations.forEach(location -> {
      userLocationResponses.add(
          new UserLocationResponse(location.getId(), location.getLat(), location.getLng(),
              location.getAddress(),
              location.getSeq(), location.getEndDate(), location.getId() == currentLocationId));
    });
    return userLocationResponses;
  }

  @Transactional
  public void registerLocation(String userEmail, LocationRequest locationRequest) {
    User user = userRepository.findByEmail(userEmail).orElse(null);
    if (user == null) {
      throw new CustomException(ErrorCode.USER_NOT_EXIST);
    }
    Location location = locationRepository.findByUserAndSeq(user, locationRequest.getSeq());
    LocalDateTime now = LocalDateTime.now();
    if (location == null) {
      location = new Location();
      setLocation(locationRequest, user, location, now);
      locationRepository.save(location);
    } else { //TODO 기존 Location 유지여부 논의 후 수정 논의 필요
      setLocation(locationRequest, user, location, now);
    }
  }

  @Transactional
  public void deleteLocation(String userEmail, Long locationId) {
    User user = userRepository.findByEmail(userEmail).orElse(null);
    if (user == null) {
      throw new CustomException(ErrorCode.USER_NOT_EXIST);
    }
    Location location = locationRepository.findByIdAndUser(locationId, user);
    locationRepository.delete(location);
  }

  @Transactional
  public void changeCurrentSeq(String userEmail, LocationIdRequest locationIdRequest) {
    User user = userRepository.findByEmail(userEmail).orElse(null);
    if (user == null) {
      throw new CustomException(ErrorCode.USER_NOT_EXIST);
    }
    long locationId = locationIdRequest.getLocationId();
    Location findLocation = locationRepository.findByIdAndUser(locationId, user);
    if (findLocation == null) {
      throw new CustomException(ErrorCode.LOCATION_NOT_FOUND);
    }
    user.setCurrentLocation(findLocation.getId());
  }

  public UserLocationResponse getCurrentLocation(String userEmail) {
    User user = userRepository.findByEmail(userEmail).orElse(null);
    if (user == null) {
      throw new CustomException(ErrorCode.USER_NOT_EXIST);
    }
    Location location = locationRepository.findById(user.getCurrentLocation()).orElse(null);
    if (location == null) {
      throw new CustomException(ErrorCode.LOCATION_NOT_FOUND);
    }
    return new UserLocationResponse(location.getId(), location.getLat(), location.getLng(),
        location.getAddress(), location.getSeq(), location.getEndDate(), true);
  }

  @Transactional
  public void changeLocationRange(String userEmail, LocationRangeRequest locationRangeRequest) {
    User user = userRepository.findByEmail(userEmail).orElse(null);
    if (user == null) {
      throw new CustomException(ErrorCode.USER_NOT_EXIST);
    }
    user.setCurrentRange(locationRangeRequest.getRange());
  }

  private void setLocation(LocationRequest locationRequest, User user, Location location,
      LocalDateTime now) {
    location.setLat(locationRequest.getLat());
    location.setLng(locationRequest.getLng());
    location.setAddress(locationRequest.getAddress());
    location.setSeq(locationRequest.getSeq());
    location.setCreatedAt(now);
    location.setUpdatedAt(now);
    location.setEndDate(now.plusDays(30));
    location.setUser(user);
  }
}
