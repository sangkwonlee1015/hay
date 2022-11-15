// 마이페이지 안내 문구
// 프로필 공간 - 푸른 배경색, 닉네임, 닉네임 수정
// 내가 생성한 투표, 내가 참여한 투표, 내 동네 설정

// 로그아웃
// 하단 바 (components에 있음)

import React from 'react'
// import { Button } from "@mui/material";
import {useNavigate} from 'react-router-dom';
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import HeaderOnlyText from '../../components/HeaderOnlyText';
import setAuthorizationToken from '../User/AuthorizationToken';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TextField from '@mui/material/TextField';
import jwt_decode from "jwt-decode";
import "./MyPage.css";
import axios from "axios";
import api from "../../api/api";

function MyPage() {
  const [putcheck, setPutCheck] = useState(true);
  const [changeNickname, setChangeNickname] = useState("");
  const [nickName, setNickName] = useState("");
  const [alreadyCheck, setAlreadyCheck] = useState(true);
  
  const navigate = useNavigate();

  const isNotDuplicate = useSelector((state) => state.user.isNotDuplicate);


  function putCheckChange() {
    if(putcheck === false) {
      setPutCheck(true);
    }
    else {
      setChangeNickname(nickName);
      setPutCheck(false);
    }
  }


  function logout() {
    console.log("logout");
    setAuthorizationToken(null);
    localStorage.removeItem('jwtToken')
    alert("로그아웃 되었습니다")
    navigate('/');
  }
  function putNickName(String) {
    axios.post(api.putNickname(), {
      nickname : String
    })
    .then(({ Response }) => {
      putCheckChange();
      setNickName(String);
      axios.post(api.token())
      .then((Response)=> {
        const token = Response.data.response.accessToken;
        localStorage.setItem('jwtToken' , token);
        let nickName = jwt_decode(localStorage.getItem('jwtToken')).nickname
        console.log(nickName);
        if(alreadyCheck === false) setAlreadyCheck(true);
      })
      .catch((Error) => {console.log(Error)})
    })
    .catch((Error) => {
      console.log(Error);
      if(alreadyCheck === true) setAlreadyCheck(false);
    })
  }

  // const getNickname = () => {
  //   let nickName = jwt_decode(localStorage.getItem('jwtToken')).nickname
  //   return nickName
  // }

  useEffect(() => {
    setNickName(jwt_decode(localStorage.getItem('jwtToken')).nickname)
  },[]);

  return (
    <div>
      <HeaderOnlyText text="마이페이지" />
      <div className="myPage">
        <div>
          {putcheck ? 
          <div className="myNickname">
            <div className="myNicknameDisplay">{nickName}</div>
            <div className="myNicknamePutButton"
              onClick={()=>{putCheckChange()}}
              >수정
            </div>
          </div> : 
          <div className="myNickname">
            {alreadyCheck
              ?
              <TextField
                id="outlined-required"
                label="닉네임"
                defaultValue={nickName}
                className="inputNickname"
                onChange={(e) => setChangeNickname(e.target.value)}
              />
              :
              <TextField
                error
                id="outlined-error"
                label="닉네임"
                helperText="중복된 닉네임입니다."
                className="inputNickname"
                onChange={(e) => setChangeNickname(e.target.value)}
              />
            }
            <div className="myNicknamePutOkButton" 
              onClick={()=>{putNickName(changeNickname)}}
            >확인
            </div>
            {/* <div className="myNicknameErrorMsg">{err}</div> */}
          </div>}
        </div>
        <div className="myInfoList">
          <div onClick={() => {navigate("/myvote")}} className="myPageNavButton">
            <div>내가 생성한 투표</div>
            <div className="myPageNavButtonRightIcon"><ChevronRightIcon /></div>
          </div>
          <div onClick={() => {navigate("/myparticipated")}} className="myPageNavButton">
            <div>내가 참여한 투표</div>
            <div className="myPageNavButtonRightIcon"><ChevronRightIcon /></div>
          </div>
          <div onClick={() => {navigate("/mylocationsetting")}} className="myPageNavButton">
            <div>내 동네 설정</div>
            <div className="myPageNavButtonRightIcon"><ChevronRightIcon /></div>
          </div>
        </div>
        <div onClick={logout} className="myPageLogoutButton">
          로그아웃
        </div>
      </div>
    </div>
  )
}

export default MyPage