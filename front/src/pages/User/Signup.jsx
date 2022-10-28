// 닉네임을 입력해주세요.
// 성별을 선택해주세요.
// 출생년도를 선택해주세요.
// 버튼-다음으로

import React from 'react'
import {useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import HeaderOnlyText from '../../components/HeaderOnlyText'
import { TextField, Autocomplete, Button } from "@mui/material";
import userAction from '../../_slice/UserSlice';

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const nickname = useSelector((state) => state.user.nickname);
  const isNotDuplicate = useSelector((state) => state.user.isNotDuplicate);
  const gender = useSelector((state) => state.user.gender);
  const birthyear = useSelector((state) => state.user.birthyear);


  const thisYear = new Date().getFullYear();
  const years = [];
  for (var i = 1900; i <= thisYear; i++) {
    years.push(String(i));
  }

  function handleButton() {
    navigate("/locationsetting");
  }
  function handleNickname(e) {
    dispatch(userAction.nickname(e.target.value));
  }
  function handleGender(e, v) {
    console.log(v);
    if(v === '남') {
      dispatch(userAction.gender(0));
    } else {
      dispatch(userAction.gender(1));
    }
  }
  function handleBirthyear(e, v) {
    dispatch(userAction.birthyear(v));
  }

  return (
    <div>
      <HeaderOnlyText text="마이페이지" />
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
          onChange={handleNickname}
          helperText="중복된 닉네임입니다."
        />
      )}
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={["남", "여"]}
        // value={gender === 0 ? "남" : "여"}
        onChange={handleGender}
        renderInput={(params) => (
          <TextField {...params} label="성별을 선택해주세요" />
        )}
      />
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={years}
        // value={birthyear}
        onChange={handleBirthyear}
        renderInput={(params) => (
          <TextField {...params} label="출생년도를 선택해주세요" />
        )}
      />
      <Button variant="contained" onClick={handleButton}>
        다음으로
      </Button>
    </div>
  );
}

export default Signup