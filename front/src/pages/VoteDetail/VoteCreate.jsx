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

import React, { useState, useRef } from "react";
import './VoteCreate.css'
import {
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
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import api from '../../api/api';

import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";

import HeaderOnlyText from "../../components/HeaderOnlyText";



function VoteCreate() {
  const navigate = useNavigate();
  const uploadInputRef = useRef(null);

  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState(1);
  const [body, setBody] = useState('');
  const [endDate, setEndDate] = useState(1);
  const [imageUrls, setImageUrls] = useState('');
  const [commentable, setCommentable] = useState(true);
  const [voteItemContents, setVoteItemContents] = useState(['','']);
  const [isUploaded, setIsUploaded] = useState(false);

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
  // function handleImgUrls(e) {
  //   const fileList = e.target.files;
  //   console.log(URL.createObjectURL(fileList[0]))
  // }
  function handleVoteItem(e, index) {
    setVoteItemContents(voteItemContents.map((item, idx) => idx === index ? item = e.target.value : item));
    // console.log(voteItemContents);
  }
  function createVoteItem() {
    setVoteItemContents(prev => [...prev, '']);
  }
  function deleleVoteItem() {
    if(voteItemContents.length > 2) {
      setVoteItemContents(voteItemContents.filter((item, index) => index !== voteItemContents.length - 1));
    } else {
      alert("투표는 최소 2개 항목이 필요합니다")
    }
  }

  // submit
  function handleSubmit() {
    const data = {
      body: body,
      categoryId: categoryId,
      commentable: commentable,
      endDate: endDate,
      title: title,
      imageUrls: [imageUrls],
      voteItemContents: voteItemContents,
    };
    
    axios.post(api.addVotes(), data)
    .then((res) => {
      navigate('/main');
    })
    .catch((Error) => console.log(Error));
  }
    
  AWS.config.update({
    region: process.env.REACT_APP_BUCKET_REGION, // 버킷이 존재하는 리전을 문자열로 입력합니다. (Ex. "ap-northeast-2")
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID, // cognito 인증 풀에서 받아온 키를 문자열로 입력합니다. (Ex. "ap-northeast-2...")
    }),
  });

  const handleFileInput = (e) => {
    setIsUploaded(false);

    const file = e.target.files[0];

    //이 파일 이름을 백앤드에 전송!!! 꼭 여기서 안만들어도 됨
    const fileName = uuidv4();
    console.log("fileName", fileName);
    //이 파일 이름을 백앤드에 전송!!! 꼭 여기서 안만들어도 됨
    console.log("name", process.env.REACT_APP_BUCKET_NAME);
    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: process.env.REACT_APP_BUCKET_NAME,
        Key: "hay/vote/" + fileName + ".jpg",
        Body: file,
      },
    });

    const promise = upload.promise();

    promise.then(
      function (data) {
        console.log("이미지 업로드에 성공했습니다.");
        setIsUploaded(true);
        setImageUrls(fileName);
      },
      function (err) {
        console.log(err);
      }
    );
  };
    
  

  return (
    <div>
      <HeaderOnlyText text="투표 만들기" />
      <div className="titleSpace">
        <TextField
          id="standard-basic"
          label="제목을 입력해주세요"
          variant="standard"
          value={title}
          onChange={handleTitleChange}
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
              marginLeft: "30px;",
            }}
          >
            <ToggleButton value={1}>이야기</ToggleButton>
            <ToggleButton value={2}>먹자지껄</ToggleButton>
            <ToggleButton value={3}>매일매일</ToggleButton>
          </ToggleButtonGroup>
        </div>
      </div>
      <div>
        <input
          ref={uploadInputRef}
          type="file"
          id="upload"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileInput}
        />
        <Button
          onClick={() =>
            uploadInputRef.current && uploadInputRef.current.click()
          }
          variant="contained"
        >
          사진 추가하기
        </Button>
        <span>{isUploaded ? "업로드 완료" : "사진 없음"}</span>
      </div>
      <div>
        <TextField
          id="outlined-multiline-static"
          multiline
          minRows={4}
          placeholder="본문을 입력해주세요"
          sx={{
            width: "86%;",
            marginLeft: "7%;",
            marginBottom: "16px;",
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
          {voteItemContents.map((item, idx) => (
            <TextField
              required
              id="outlined-required"
              placeholder={`항목 ${idx + 1}`}
              value={item}
              onChange={(e) => handleVoteItem(e, idx)}
              sx={{ width: "86%;", margin: "12px 0 0 20px" }}
              key={idx}
            />
          ))}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button variant="outlined" onClick={createVoteItem}>
              항목 추가하기
            </Button>
            <Button variant="outlined" color="error" onClick={deleleVoteItem}>
              항목 삭제하기
            </Button>
          </div>
        </div>
      </div>
      <div>
        <FormControlLabel
          control={
            <Switch checked={commentable} onChange={handleCommentable} />
          }
          label="댓글 허용"
          labelPlacement="start"
        />
      </div>
      <div className="voteCreateSubmitButton" onClick={handleSubmit}>
        만들기
      </div>
    </div>
  );
}

export default VoteCreate
