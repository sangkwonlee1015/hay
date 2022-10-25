package com.a603.hay.api.service;

import com.a603.hay.api.dto.VoteDto.CreateVoteRequest;
import com.a603.hay.db.entity.Category;
import com.a603.hay.db.entity.Vote;
import com.a603.hay.db.repository.CategoryRepository;
import com.a603.hay.db.repository.VoteRepository;
import com.a603.hay.exception.CustomException;
import com.a603.hay.exception.ErrorCode;
import java.time.LocalDateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
public class VoteService {

  @Autowired
  VoteRepository voteRepository;

  @Autowired
  CategoryRepository categoryRepository;

  @Transactional
  public void createVote(CreateVoteRequest createVoteRequest) {
    Vote newVote = new Vote();
    Category category = categoryRepository.findById(createVoteRequest.getCategoryId())
        .orElseThrow(() -> new CustomException(
            ErrorCode.CATEGORY_NOT_FOUND));
    newVote.setCategory(category);
//    newVote.setUser();
    newVote.setTitle(createVoteRequest.getTitle());
    newVote.setBody(createVoteRequest.getBody());
    newVote.setStartDate(createVoteRequest.getStartDate());
    newVote.setEndDate(createVoteRequest.getEndDate());
    newVote.setCommentable(createVoteRequest.isCommentable());
    newVote.setEnded(false);
//    newVote.setLat();
//    newVote.setLng();
    newVote.setVoteCount(0);
    newVote.setCreatedAt(LocalDateTime.now());
    newVote.setUpdatedAt(LocalDateTime.now());
  }
}
