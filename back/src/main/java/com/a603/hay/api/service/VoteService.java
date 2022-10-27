package com.a603.hay.api.service;

import com.a603.hay.api.dto.CommentDto.CreateCommentRequest;
import com.a603.hay.api.dto.VoteDto.CreateVoteRequest;
import com.a603.hay.api.dto.VoteDto.VoteListResponse;
import com.a603.hay.api.dto.VoteDto.VoteOneRequest;
import com.a603.hay.db.entity.Category;
import com.a603.hay.db.entity.Comment;
import com.a603.hay.db.entity.Likes;
import com.a603.hay.db.entity.Location;
import com.a603.hay.db.entity.User;
import com.a603.hay.db.entity.Vote;
import com.a603.hay.db.entity.VoteItem;
import com.a603.hay.db.entity.VoteLog;
import com.a603.hay.db.repository.CategoryRepository;
import com.a603.hay.db.repository.CommentRepository;
import com.a603.hay.db.repository.LikesRepository;
import com.a603.hay.db.repository.LocationRepository;
import com.a603.hay.db.repository.VoteItemRepository;
import com.a603.hay.db.repository.VoteLogRepository;
import com.a603.hay.db.repository.VoteRepository;
import com.a603.hay.db.specification.VoteSpecification;
import com.a603.hay.exception.CustomException;
import com.a603.hay.exception.ErrorCode;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
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
  VoteItemRepository voteItemRepository;

  @Autowired
  VoteLogRepository voteLogRepository;

  @Autowired
  CommentRepository commentRepository;

  @Autowired
  LikesRepository likesRepository;

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
    Vote vote = voteRepository.save(newVote);
    createVoteRequest.getVoteItemContents().forEach(content -> {
      VoteItem voteItem = new VoteItem();
      voteItem.setContent(content);
      voteItem.setVoteCount(0);
      voteItem.setCreatedAt(LocalDateTime.now());
      voteItem.setUpdatedAt(LocalDateTime.now());
      voteItem.setVote(vote);
      voteItemRepository.save(voteItem);
    });
  }

  @Transactional
  public void endVote(long voteId, User user) {
    Vote vote = voteRepository.findById(voteId)
        .orElseThrow(() -> new CustomException(ErrorCode.VOTE_NOT_FOUND));

    // 투표 작성자인지 검사
    if (vote.getUser().getId() != user.getId()) {
      throw new CustomException(ErrorCode.FORBIDDEN);
    }
    vote.setEnded(true);
    voteRepository.save(vote);
  }

  public List<VoteListResponse> getVoteList(String search, Long categoryId, boolean myVote,
      boolean done, String order, User user) {

    if (myVote) {
      Specification<Vote> spec = Specification.where(VoteSpecification.equalUser(user));
      List<VoteListResponse> voteList = new ArrayList<>();
      voteRepository.findAll(spec).forEach(vote -> {
        VoteListResponse voteListResponse = new VoteListResponse();
        voteList.add(
            VoteListResponse.builder().title(vote.getTitle()).startDate(vote.getStartDate())
                .endDate(vote.getEndDate()).isEnded(vote.isEnded()).voteCount(vote.getVoteCount())
                .build());
      });
      return voteList;
    }

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

  public void voteOne(long voteId, VoteOneRequest voteOneRequest, User user) {
    VoteItem voteItem = voteItemRepository.findById(voteOneRequest.getVoteItemId())
        .orElseThrow(() -> new CustomException(ErrorCode.VOTEITEM_NOT_FOUND));
    Vote vote = voteItem.getVote();
    if (vote.getId() != voteId) {
      throw new CustomException(ErrorCode.VOTEITEM_NOT_FOUND);
    }
    if (vote.isEnded() || (voteLogRepository.countByUserAndVote(user, vote) > 0)) {
      throw new CustomException(ErrorCode.FORBIDDEN);
    }
    VoteLog voteLog = new VoteLog();
    voteLog.setCreatedAt(LocalDateTime.now());
    voteLog.setUpdatedAt(LocalDateTime.now());
    voteLog.setUser(user);
    voteLog.setVote(vote);
    voteLog.setVoteItem(voteItem);
    voteLogRepository.save(voteLog);

    voteItem.setVoteCount(voteLogRepository.countByVoteItem(voteItem));
    voteItemRepository.save(voteItem);

    vote.setVoteCount(voteLogRepository.countByVote(vote));
    voteRepository.save(vote);
  }

  public void createComment(long voteId, CreateCommentRequest createCommentRequest, User user) {

    Comment comment = new Comment();
    comment.setContent(createCommentRequest.getContent());
    comment.setLikesCount(0);
    comment.setDeleted(false);
    comment.setCreatedAt(LocalDateTime.now());
    comment.setUpdatedAt(LocalDateTime.now());
    comment.setUser(user);
    comment.setVote(voteRepository.findById(voteId)
        .orElseThrow(() -> new CustomException(ErrorCode.VOTE_NOT_FOUND)));

    // 부모 댓글이 있을 경우
    if (createCommentRequest.getCommentId() != null) {
      Comment originalComment = commentRepository.findById(createCommentRequest.getCommentId())
          .orElseThrow(() -> new CustomException(ErrorCode.COMMENT_NOT_FOUND));
      if (originalComment.getVote().getId() != voteId || originalComment.getComment() != null) {
        throw new CustomException(ErrorCode.FORBIDDEN);
      }
      comment.setComment(originalComment);
    }

    commentRepository.save(comment);
  }

  @Transactional
  public void deleteComment(long voteId, long commentId, User user) {
    Comment comment = commentRepository.findById(commentId)
        .orElseThrow(() -> new CustomException(ErrorCode.COMMENT_NOT_FOUND));
    if (comment.getVote().getId() != voteId || comment.getUser().getId() != user.getId()) {
      throw new CustomException(ErrorCode.FORBIDDEN);
    }
    comment.setDeleted(true);
    commentRepository.save(comment);
  }

  @Transactional
  public void clickCommentLikes(long voteId, long commentId, User user) {
    Comment comment = commentRepository.findById(commentId)
        .orElseThrow(() -> new CustomException(ErrorCode.COMMENT_NOT_FOUND));
    if (comment.getVote().getId() != voteId) {
      throw new CustomException(ErrorCode.FORBIDDEN);
    }
    Optional<Likes> oLikes = likesRepository.findByUserAndComment(user, comment);
    if (oLikes.isPresent()) {
      likesRepository.delete(oLikes.get());
      comment.setLikesCount(comment.getLikesCount() - 1);
      commentRepository.save(comment);
    } else {
      Likes likes = new Likes();
      likes.setCreatedAt(LocalDateTime.now());
      likes.setUpdatedAt(LocalDateTime.now());
      likes.setUser(user);
      likes.setComment(comment);
      likesRepository.save(likes);
      comment.setLikesCount(comment.getLikesCount() + 1);
      commentRepository.save(comment);
    }

  }
}
