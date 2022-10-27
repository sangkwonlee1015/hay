package com.a603.hay.api.controller;

import com.a603.hay.api.dto.ResponseDto;
import com.a603.hay.api.dto.VoteDto;
import com.a603.hay.api.dto.VoteDto.CreateVoteRequest;
import com.a603.hay.api.service.VoteService;
import com.a603.hay.db.entity.User;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
  public ResponseEntity<ResponseDto> voteList(@RequestParam(required = false) String search,
      @RequestParam(required = false) Long category,
      @RequestParam(required = false, name = "my-vote") boolean myVote,
      @RequestParam(required = false) boolean done, @RequestParam(required = false) String order) {
    User user = new User(); // 로그인 유저 정보로 대체
    return new ResponseEntity<>(new ResponseDto<List<VoteDto.VoteListResponse>>(
        voteService.getVoteList(search, category, myVote, done, order, user)), HttpStatus.OK);
  }

  @PostMapping("")
  @ApiOperation(value = "투표 생성", notes = "투표 생성")
  public ResponseEntity<ResponseDto> createVote(
      @RequestBody @ApiParam(value = "투표 정보", required = true)
      CreateVoteRequest createVoteRequest) {
    User user = new User(); // 로그인 유저 정보로 대체
    voteService.createVote(createVoteRequest, user);
    return new ResponseEntity<>(new ResponseDto<String>("투표 생성 성공"), HttpStatus.OK);
  }

  @PutMapping("/{voteId}")
  public ResponseEntity<ResponseDto> endVote(@PathVariable long voteId) {
    User user = new User(); // 로그인 유저 정보로 대체
    voteService.endVote(voteId, user);
    return new ResponseEntity<>(new ResponseDto<String>("투표 조기 종료"), HttpStatus.OK);
  }
}
