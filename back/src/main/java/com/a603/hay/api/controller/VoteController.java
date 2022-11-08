package com.a603.hay.api.controller;

import com.a603.hay.api.dto.CommentDto.CreateCommentRequest;
import com.a603.hay.api.dto.ResponseDto;
import com.a603.hay.api.dto.VoteDto.CreateVoteRequest;
import com.a603.hay.api.dto.VoteDto.VoteDetailResponse;
import com.a603.hay.api.dto.VoteDto.VoteListResponse;
import com.a603.hay.api.dto.VoteDto.VoteOneRequest;
import com.a603.hay.api.dto.VoteDto.VoteResultResponse;
import com.a603.hay.api.service.VoteService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import java.security.Principal;
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


  @GetMapping("")
  @ApiOperation(value = "투표 목록", notes = "투표 목록 보기")
  public ResponseEntity<ResponseDto> voteList(Principal principal,
      @RequestParam(required = false) String search,
      @RequestParam(required = false) Long category,
      @RequestParam(required = false, name = "my-vote") boolean myVote,
      @RequestParam(required = false) boolean participated,
      @RequestParam(required = false) boolean done, @RequestParam(required = false) String order) {
    return new ResponseEntity<>(new ResponseDto<VoteListResponse>(
        voteService.getVoteList(search, category, myVote, participated, done, order,
            principal.getName())),
        HttpStatus.OK);
  }

  @PostMapping("")
  @ApiOperation(value = "투표 생성", notes = "투표 생성")
  public ResponseEntity<ResponseDto> createVote(Principal principal,
      @RequestBody @ApiParam(value = "투표 정보", required = true)
      CreateVoteRequest createVoteRequest) {
    voteService.createVote(createVoteRequest, principal.getName());
    return new ResponseEntity<>(new ResponseDto<String>("투표 생성 성공"), HttpStatus.OK);
  }

  @GetMapping("/{voteId}")
  @ApiOperation(value = "투표 내용 조회", notes = "투표 내용 조회, 투표 했을 경우 투표 현황과 댓글까지 조회")
  public ResponseEntity<ResponseDto> voteDetail(Principal principal, @PathVariable long voteId) {
    return new ResponseEntity<>(
        new ResponseDto<VoteDetailResponse>(voteService.voteDetail(voteId, principal.getName())),
        HttpStatus.OK);
  }

  @PostMapping("/{voteId}")
  @ApiOperation(value = "투표 하기", notes = "투표 항목 선택하여 투표")
  public ResponseEntity<ResponseDto> voteOne(Principal principal, @PathVariable long voteId,
      @RequestBody @ApiParam(value = "투표 항목 정보", required = true) VoteOneRequest voteOneRequest) {
    voteService.voteOne(voteId, voteOneRequest, principal.getName());
    return new ResponseEntity<>(new ResponseDto<String>("투표 성공"), HttpStatus.OK);
  }

  @PutMapping("/{voteId}")
  @ApiOperation(value = "투표 종료", notes = "투표 종료")
  public ResponseEntity<ResponseDto> endVote(Principal principal, @PathVariable long voteId) {
    voteService.endVote(voteId, principal.getName());
    return new ResponseEntity<>(new ResponseDto<String>("투표 조기 종료"), HttpStatus.OK);
  }

  @GetMapping("/{voteId}/result")
  @ApiOperation(value = "투표 결과 조회", notes = "투표 결과의 통계를 조회한다")
  public ResponseEntity<ResponseDto> voteResult(Principal principal, @PathVariable long voteId) {
    return new ResponseEntity<>(
        new ResponseDto<VoteResultResponse>(voteService.voteResult(voteId, principal.getName())),
        HttpStatus.OK);
  }

  @PostMapping("/{voteId}/comment")
  @ApiOperation(value = "댓글(대댓글) 작성", notes = "댓글(대댓글) 작성")
  public ResponseEntity<ResponseDto> createComment(Principal principal, @PathVariable long voteId,
      @RequestBody @ApiParam(value = "댓글(대댓글) 정보", required = true) CreateCommentRequest createCommentRequest) {
    voteService.createComment(voteId, createCommentRequest, principal.getName());
    return new ResponseEntity<>(new ResponseDto<String>("댓글 작성 성공"), HttpStatus.OK);
  }

  @DeleteMapping("/{voteId}/comment/{commentId}")
  @ApiOperation(value = "댓글(대댓글) 삭제", notes = "댓글(대댓글) 삭제")
  public ResponseEntity<ResponseDto> deleteComment(Principal principal, @PathVariable long voteId,
      @PathVariable long commentId) {
    voteService.deleteComment(voteId, commentId, principal.getName());
    return new ResponseEntity<>(new ResponseDto<String>("댓글 삭제 성공"), HttpStatus.OK);
  }

  @PostMapping("/{voteId}/comment/{commentId}/likes")
  @ApiOperation(value = "댓글(대댓글) 좋아요", notes = "댓글(대댓글) 좋아요 클릭(누른 상테일 경우 좋아요 해제")
  public ResponseEntity<ResponseDto> clickCommentLikes(Principal principal,
      @PathVariable long voteId,
      @PathVariable long commentId) {
    voteService.clickCommentLikes(voteId, commentId, principal.getName());
    return new ResponseEntity<>(new ResponseDto<String>("좋아요 클릭 성공"), HttpStatus.OK);
  }

}
