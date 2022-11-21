import React, { useState, useEffect } from 'react'
import styled from "styled-components";
import axios from 'axios';
import { useLocation } from "react-router";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import HeaderOnlyText from '../../components/HeaderOnlyText'
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { userAction } from '../../_slice/UserSlice';
import { navigateAction } from "../../_slice/NavigateSlice";
import api from '../../api/api';


const Body = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 70px;
  * {
    margin: 10px 0;
  }
`;

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  dispatch(navigateAction.isLoggedIn(false)); // 로그인 안 됐으면 하단 NavBar 없애기

  const nickname = useSelector((state) => state.user.nickname);
  const isNotDuplicate = useSelector((state) => state.user.isNotDuplicate);
  const gender = useSelector((state) => state.user.gender);
  const birthyear = useSelector((state) => state.user.birthyear);


  const thisYear = new Date().getFullYear();
  const years = [];
  for (var i = 1900; i <= thisYear; i++) {
    years.push(String(i));
  }

  const  { state } = useLocation();

  function handleButton() {
    navigate("/locationsetting", {state: {"kakaoId": state.kakaoId, "nickname": nickname, "gender": gender, "birthyear": birthyear}});
  }
  function handleNickname(e) {
    dispatch(userAction.nickname(e.target.value));
  }
  function handleGender(e) {
    dispatch(userAction.gender(e.target.value));
    
  }
  function handleBirthyear(e) {
    dispatch(userAction.birthyear(+e.target.value));
  }

  useEffect(() => {
    axios.post(api.nicknameDuplicateCheck(), { nickname: nickname })
    .then(Response => {
      console.log(Response.data.response.duplicate);
      dispatch(userAction.isNotDuplicate(!Response.data.response.duplicate));
    })
    .catch((Error) => console.log(Error));
  }, [nickname, dispatch]);

  return (
    <div>
      <HeaderOnlyText text="추가정보 입력" />
      <Body>
        {isNotDuplicate && (
          <TextField
            id="outlined-basic"
            label="닉네임"
            variant="outlined"
            value={nickname}
            onChange={handleNickname}
          />
        )}
        {!isNotDuplicate && (
          <TextField
            error
            id="outlined-error-helper-text"
            label="닉네임"
            value={nickname}
            onChange={handleNickname}
            helperText="중복된 닉네임입니다."
          />
        )}

        <FormControl required sx={{ m: 1, minWidth: 220 }}>
          <InputLabel id="demo-simple-select-required-label">성별</InputLabel>
          <Select
            labelId="demo-simple-select-required-label"
            id="demo-simple-select-required"
            value={gender}
            label="성별을 선택해주세요 *"
            onChange={handleGender}
          >
            <MenuItem value={0}>남</MenuItem>
            <MenuItem value={1}>여</MenuItem>
          </Select>
        </FormControl>
        <FormControl required sx={{ m: 1, minWidth: 220 }}>
          <InputLabel id="demo-simple-select-required-label">
            출생년도
          </InputLabel>
          <Select
            labelId="demo-simple-select-required-label"
            id="demo-simple-select-required"
            value={birthyear}
            label="출생년도를 선택해주세요 *"
            onChange={handleBirthyear}
          >
            {years.map((v, i) => (
              <MenuItem value={v} key={i}>
                {v}
              </MenuItem>
            ))}
            ;
          </Select>
        </FormControl>
      </Body>
      <Button
        variant="contained"
        disabled={nickname.length === 0 || !isNotDuplicate}
        onClick={handleButton}
        sx={{ position: "absolute", bottom: "100px", left: "calc(50% - 45px)" }}
      >
        다음으로
      </Button>
    </div>
  );
}

export default Signup