package com.a603.hay.api.controller;

import com.a603.hay.api.dto.ResponseDto;
import com.a603.hay.api.dto.VoteDto.CreateVoteRequest;
import com.a603.hay.api.service.VoteService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(value = "투표 API", tags = {"Vote"})
@RestController
@RequestMapping("/api/votes")
public class VoteController {

  @Autowired
  VoteService voteService;

  @PostMapping("")
  @ApiOperation(value = "투표 생성", notes = "투표 생성")
  public ResponseEntity<ResponseDto> createVote(@RequestBody @ApiParam(value = "투표 정보", required = true)
  CreateVoteRequest createVoteRequest) {
    voteService.createVote(createVoteRequest);
    return new ResponseEntity<>(HttpStatus.OK);
  }
}
