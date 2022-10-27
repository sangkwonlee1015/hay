package com.a603.hay.api.controller;

import com.a603.hay.api.dto.CommentDto.CreateCommentRequest;
import com.a603.hay.api.dto.ResponseDto;
import com.a603.hay.api.dto.VoteDto;
import com.a603.hay.api.dto.VoteDto.CreateVoteRequest;
import com.a603.hay.api.dto.VoteDto.VoteListResponse;
import com.a603.hay.api.dto.VoteDto.VoteOneRequest;
import com.a603.hay.api.service.VoteService;
import com.a603.hay.db.entity.User;
import com.a603.hay.db.repository.UserRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Api(value = "투표 API", tags = {"Vote"})
@RestController
@RequestMapping("/api/votes")
public class VoteController {

  @Autowired
  VoteService voteService;

  @Autowired
  UserRepository userRepository;  // 테스트 용

  @GetMapping("")
  @ApiOperation(value = "투표 목록", notes = "투표 목록 보기")
  public ResponseEntity<ResponseDto> voteList(@RequestParam(required = false) String search,
      @RequestParam(required = false) Long category,
      @RequestParam(required = false, name = "my-vote") boolean myVote,
      @RequestParam(required = false) boolean done, @RequestParam(required = false) String order) {
    User user = new User(); // 로그인 유저 정보로 대체
    user = userRepository.findById(1L).get(); // 테스트
    return new ResponseEntity<>(new ResponseDto<List<VoteListResponse>>(
        voteService.getVoteList(search, category, myVote, done, order, user)), HttpStatus.OK);
  }

  @PostMapping("")
  @ApiOperation(value = "투표 생성", notes = "투표 생성")
  public ResponseEntity<ResponseDto> createVote(
      @RequestBody @ApiParam(value = "투표 정보", required = true)
      CreateVoteRequest createVoteRequest) {
    User user = new User(); // 로그인 유저 정보로 대체
    user = userRepository.findById(1L).get(); // 테스트
    voteService.createVote(createVoteRequest, user);
    return new ResponseEntity<>(new ResponseDto<String>("투표 생성 성공"), HttpStatus.OK);
  }

  @PostMapping("/{voteId}")
  @ApiOperation(value = "투표 하기", notes = "투표 항목 선택하여 투표")
  public ResponseEntity<ResponseDto> voteOne(@PathVariable long voteId,
      @RequestBody @ApiParam(value = "투표 항목 정보", required = true) VoteOneRequest voteOneRequest) {
    User user = new User(); // 로그인 유저 정보로 대체
    user = userRepository.findById(1L).get(); // 테스트
    voteService.voteOne(voteId, voteOneRequest, user);
    return new ResponseEntity<>(new ResponseDto<String>("투표 성공"), HttpStatus.OK);
  }

  @PutMapping("/{voteId}")
  @ApiOperation(value = "투표 종료", notes = "투표 종료")
  public ResponseEntity<ResponseDto> endVote(@PathVariable long voteId) {
    User user = new User(); // 로그인 유저 정보로 대체
    user = userRepository.findById(1L).get(); // 테스트
    voteService.endVote(voteId, user);
    return new ResponseEntity<>(new ResponseDto<String>("투표 조기 종료"), HttpStatus.OK);
  }

  @PostMapping("/{voteId}/comment")
  @ApiOperation(value = "댓글(대댓글) 작성", notes = "댓글(대댓글) 작성")
  public ResponseEntity<ResponseDto> createComment(@PathVariable long voteId,
      @RequestBody @ApiParam(value = "댓글(대댓글) 정보", required = true) CreateCommentRequest createCommentRequest) {
    User user = new User(); // 로그인 유저 정보로 대체
    user = userRepository.findById(1L).get(); // 테스트
    voteService.createComment(voteId, createCommentRequest, user);
    return new ResponseEntity<>(new ResponseDto<String>("댓글 작성 성공"), HttpStatus.OK);
  }

  @DeleteMapping("/{voteId}/comment/{commentId}")
  @ApiOperation(value = "댓글(대댓글) 삭제", notes = "댓글(대댓글) 삭제")
  public ResponseEntity<ResponseDto> deleteComment(@PathVariable long voteId,
      @PathVariable long commentId) {
    User user = new User(); // 로그인 유저 정보로 대체
    user = userRepository.findById(1L).get(); // 테스트
    voteService.deleteComment(voteId, commentId, user);
    return new ResponseEntity<>(new ResponseDto<String>("댓글 삭제 성공"), HttpStatus.OK);
  }

  @PostMapping("/{voteId}/comment/{commentId}/likes")
  @ApiOperation(value = "댓글(대댓글) 좋아요", notes = "댓글(대댓글) 좋아요 클릭(누른 상테일 경우 좋아요 해제")
  public ResponseEntity<ResponseDto> clickCommentLikes(@PathVariable long voteId,
      @PathVariable long commentId) {
    User user = new User(); // 로그인 유저 정보로 대체
    user = userRepository.findById(1L).get(); // 테스트
    voteService.clickCommentLikes(voteId, commentId, user);
    return new ResponseEntity<>(new ResponseDto<String>("좋아요 클릭 성공"), HttpStatus.OK);
  }

}
