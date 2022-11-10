package com.a603.hay.api.controller;

import com.a603.hay.api.dto.CategoryDto;
import com.a603.hay.api.dto.ResponseDto;
import com.a603.hay.api.service.CategoryService;
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

@Api(value = "관리자 API", tags = {"Admin"})
@RestController
@RequestMapping("/api/admin")
public class AdminController {

  @Autowired
  CategoryService categoryService;

  @PostMapping("category")
  @ApiOperation(value = "카테고리 생성", notes = "카테고리 생성")
  public ResponseEntity<ResponseDto> createCategory(@RequestBody @ApiParam(value = "카테고리 정보", required = true)
  CategoryDto.CreateCategoryRequest createCategoryRequest) {
    categoryService.createCategory(createCategoryRequest);
    return new ResponseEntity<>(new ResponseDto<String>("카테고리 생성 성공"), HttpStatus.OK);
  }

}
