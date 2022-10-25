package com.a603.hay.exception;

import static com.a603.hay.exception.ErrorCode.INTERNAL_SERVER_ERROR;

import com.a603.hay.api.dto.ResponseDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler({CustomException.class})
  protected ResponseEntity<ResponseDto> handleCustomException(CustomException ex) {
    return new ResponseEntity<>(new ResponseDto<String>(ex.getErrorCode().getMessage()),
        ex.getErrorCode().getStatus());
  }

  @ExceptionHandler({Exception.class})
  protected ResponseEntity<ResponseDto> handleServerException(Exception ex) {
    return new ResponseEntity<>(new ResponseDto<String>(INTERNAL_SERVER_ERROR.getMessage()),
        INTERNAL_SERVER_ERROR.getStatus());
  }

}
