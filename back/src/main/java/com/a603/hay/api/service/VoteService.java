package com.a603.hay.api.service;

import com.a603.hay.api.dto.VoteDto.CreateVoteRequest;
import com.a603.hay.api.dto.VoteDto.VoteListResponse;
import com.a603.hay.db.entity.Category;
import com.a603.hay.db.entity.Location;
import com.a603.hay.db.entity.User;
import com.a603.hay.db.entity.Vote;
import com.a603.hay.db.repository.CategoryRepository;
import com.a603.hay.db.repository.LocationRepository;
import com.a603.hay.db.repository.VoteRepository;
import com.a603.hay.db.specification.VoteSpecification;
import com.a603.hay.exception.CustomException;
import com.a603.hay.exception.ErrorCode;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class VoteService {

  @Autowired
  VoteRepository voteRepository;

  @Autowired
  CategoryRepository categoryRepository;

  @Autowired
  LocationRepository locationRepository;

  @Transactional
  public void createVote(CreateVoteRequest createVoteRequest, User user) {
    Vote newVote = new Vote();
    Category category = categoryRepository.findById(createVoteRequest.getCategoryId())
        .orElseThrow(() -> new CustomException(ErrorCode.CATEGORY_NOT_FOUND));
    newVote.setCategory(category);
    newVote.setUser(user);
    newVote.setTitle(createVoteRequest.getTitle());
    newVote.setBody(createVoteRequest.getBody());
    newVote.setStartDate(createVoteRequest.getStartDate());
    newVote.setEndDate(createVoteRequest.getEndDate());
    newVote.setCommentable(createVoteRequest.isCommentable());
    newVote.setEnded(false);
    Location location = locationRepository.findById(user.getCurrentLocation())
        .orElseThrow(() -> new CustomException(ErrorCode.LOCATION_NOT_FOUND));
    newVote.setLat(location.getLat());
    newVote.setLng(location.getLng());
    newVote.setVoteCount(0);
    newVote.setCreatedAt(LocalDateTime.now());
    newVote.setUpdatedAt(LocalDateTime.now());
  }

  public void endVote(long voteId, User user) {
    Vote vote = voteRepository.findById(voteId)
        .orElseThrow(() -> new CustomException(ErrorCode.VOTE_NOT_FOUND));
    if (vote.getUser().getId() != user.getId()) {
      throw new CustomException(ErrorCode.FORBIDDEN);
    }
    vote.setEnded(true);
    voteRepository.save(vote);
  }

  public List<VoteListResponse> getVoteList(String search, Long categoryId, boolean myVote,
      boolean done, String order, User user) {
    if (order == null) {
      throw new CustomException(ErrorCode.BAD_REQUEST);
    }
    String properties = "";
    switch (order) {
      case "최신":
        properties = "startDate";
        break;
      case "참여자":
        properties = "voteCount";
        break;
      default:
        throw new CustomException(ErrorCode.BAD_REQUEST);
    }
    Sort sort = Sort.by(properties);

    if (myVote) {
      Specification<Vote> spec = Specification.where(VoteSpecification.equalUser(user));
      List<VoteListResponse> voteList = new ArrayList<>();
      voteRepository.findAll(spec, sort).forEach(vote -> {
        VoteListResponse voteListResponse = new VoteListResponse();
        voteList.add(
            VoteListResponse.builder().title(vote.getTitle()).startDate(vote.getStartDate())
                .endDate(vote.getEndDate()).isEnded(vote.isEnded()).voteCount(vote.getVoteCount())
                .build());
      });
      return voteList;
    }

    Specification<Vote> spec = null;
    if (!done) {
      spec = Specification.where(VoteSpecification.equalEnded(false));
    }
    if (categoryId != null) {
      Category category = categoryRepository.findById(categoryId)
          .orElseThrow(() -> new CustomException(ErrorCode.CATEGORY_NOT_FOUND));
      spec = spec.and(VoteSpecification.equalCategory(category));
    }
    if (search != null) {
      spec = spec.and(VoteSpecification.likeTitle(search));
    }
    List<VoteListResponse> voteList = new ArrayList<>();
    voteRepository.findAll(spec, sort).forEach(vote -> {
      if (distance(35.0001, 127.4999, vote.getLat(), vote.getLng()) > user.getCurrentRange()) {
        return;
      }
      VoteListResponse voteListResponse = new VoteListResponse();
      voteList.add(
          VoteListResponse.builder().title(vote.getTitle()).startDate(vote.getStartDate())
              .endDate(vote.getEndDate()).isEnded(vote.isEnded()).voteCount(vote.getVoteCount())
              .build());
    });
    return voteList;
  }

  // 두 좌표 사이의 거리를 구하는 함수
  // dsitance(첫번쨰 좌표의 위도, 첫번째 좌표의 경도, 두번째 좌표의 위도, 두번째 좌표의 경도)
  private static double distance(double lat1, double lon1, double lat2, double lon2) {
    double theta = lon1 - lon2;
    double dist =
        Math.sin(deg2rad(lat1)) * Math.sin(deg2rad(lat2)) + Math.cos(deg2rad(lat1)) * Math.cos(
            deg2rad(lat2)) * Math.cos(deg2rad(theta));
    dist = Math.acos(dist);
    dist = rad2deg(dist);
    dist = dist * 60 * 1.1515 * 1609.344;

    return dist; //단위 meter
  }

  //  10진수를 radian(라디안)으로 변환
  private static double deg2rad(double deg) {
    return (deg * Math.PI / 180.0);
  }

  //  radian(라디안)을 10진수로 변환
  private static double rad2deg(double rad) {
    return (rad * 180 / Math.PI);
  }

}
