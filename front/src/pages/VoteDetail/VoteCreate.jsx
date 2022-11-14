// 만들기 취소 아이콘, 투표 만들기, 카테고리
// 제목 인풋
// 주제 - 카테고리 선택
// 사진 추가
// 본문
// 투표 설정
//   기간 선택
//   항목 입력 min:2, 항목 추가하기
// 댓글 허용 스위치
// 만들기

import React, { useState, useEffect, useRef } from "react";
import './VoteCreate.css'
import {
  Typography,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  InputLabel,
  MenuItem,
  FormControlLabel,
  FormControl,
  Select,
  Button,
  Switch,
} from "@mui/material";

import HeaderOnlyText from '../../components/HeaderOnlyText';
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import FormData from 'form-data';
import axios from 'axios'
import api from '../../api/api';



function VoteCreate() {
  const uploadInputRef = useRef(null);

  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState(1);
  const [body, setBody] = useState('');
  const [endDate, setEndDate] = useState(1);
  const [imageUrls, setImageUrls] = useState('');
  const [commentable, setCommentable] = useState(true);
  const [voteItemContents, setVoteItemContents] = useState([]);

  function handleTitleChange(e) {
    setTitle(e.target.value);
  };
  function handleCategoryChange(e, newAlignment) {
    setCategoryId(newAlignment);
  }
  function handleBodyChange(e) {
    setBody(e.target.value)
  }  
  function handleEndDateChange(e) {
    setEndDate(e.target.value);
  }
  function handleCommentable(e) {
    // console.log(e.target.checked);
    setCommentable(e.target.checked);
  }
  function handleImgUrls(e) {
    const fileList = e.target.files;
    console.log(URL.createObjectURL(fileList[0]))
  }
  
  /** 항목 추가하기 누를 시 항목 추가해주는 함수 */
  const selectionAdd = () => {
    let result = (<div></div>)
    
    result.div.push(
      <TextField id="outlined" placeholder="" />
    )

    return result;
  }
  
  // sumbit datas

  // const formData = new FormData();

  // // img url => blob file
  // formData.append("imageUrls", uploadInputRef.current.files[0]);
  // formData.append(
  //   "data",
  //   new Blob([JSON.stringify(data)], { type: "application/json" })
  // );

  // submit
  function handleSubmit() {
    const data = {
      body: body,
      categoryId: categoryId,
      commentable: commentable,
      endDate: endDate,
      title: title,
      voteItemContents: voteItemContents,
    };
    
    axios.post(api.addVotes(), data).catch((Error) => console.log(Error));
  }
    
  

  return (
    <div>
      <HeaderOnlyText text="투표 만들기"/>
      <div className="titleSpace">
        <TextField
          id="standard-basic"
          label="제목을 입력해주세요"
          variant="standard"
          sx={{
            width: "86%;",
            marginLeft: "7%;"
          }}
        />
      </div>
      <div className="voteCreateCategory">
        <div>주제</div>
        <div>
          <ToggleButtonGroup
            color="primary"
            value={categoryId}
            exclusive
            onChange={handleCategoryChange}
            aria-label="Category"
            required={true}
            sx={{
              marginLeft: "30px;"
            }}
          >
            <ToggleButton value={1}>이야기</ToggleButton>
            <ToggleButton value={2}>먹자지껄</ToggleButton>
            <ToggleButton value={3}>매일매일</ToggleButton>
          </ToggleButtonGroup>
        </div>
      </div>
      {/* <div className="addPhoto">사진 추가하기</div> */}
      <input
        ref={uploadInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleImgUrls}
      />
      {/* <Button
        onClick={() => uploadInputRef.current && uploadInputRef.current.click()}
        variant="contained"
      >
        Upload
      </Button> */}
      <div>
        <TextField
          id="outlined-multiline-static"
          multiline
          minRows={4}
          placeholder="본문을 입력해주세요"
          sx={{
            width: "86%;",
            marginLeft: "7%;",
            marginBottom: "16px;"
          }}
          value={body}
          onChange={handleBodyChange}
        />
      </div>
      <div className="voteCreate">
        <div className="voteCreateTitle">
          <HowToVoteIcon color="primary" fontSize="small" />
          <div className="voteText">투표</div>
        </div>
        <div className="voteCreateTermSelect">
          <FormControl fullWidth sx={{ width: "86%;" }}>
            <InputLabel id="demo-simple-select-label">기간 선택</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={endDate}
              label="Term"
              onChange={handleEndDateChange}
            >
              <MenuItem value={1}>1일</MenuItem>
              <MenuItem value={3}>3일</MenuItem>
              <MenuItem value={7}>7일</MenuItem>
              <MenuItem value={15}>15일</MenuItem>
              <MenuItem value={30}>30일</MenuItem>
            </Select>
          </FormControl>
        </div>
        <hr className="horizon"></hr>
        <div>
          <TextField required id="selection-1" sx={{ width: "86%;", marginLeft: "20px;" }} placeholder="항목 1" />
          <TextField required id="selection-2" sx={{ width: "86%;", marginLeft: "20px;", marginTop: "12px;" ,marginBottom: "12px;" }} placeholder="항목 2" />
          {/* {selectionAdd()} */}
          <Button variant="outlined" onClick={() => {}} sx={{ width: "86%;", marginLeft: "20px;", padding: "16px 0px;" }}>
            항목 추가하기
          </Button>
        </div>
      </div>
      <div>
        <FormControlLabel
          control={
            <Switch checked={commentable} onChange={handleCommentable} />
          }
          label="댓글 허용"
          labelPlacement="start"
          sx={{ marginLeft: "28px;", marginButtom: "32px;" }}
        />
      </div>
      <div className="voteCreateSubmitButton" onClick={handleSubmit}>만들기</div>
    </div>
  );
}

export default VoteCreate