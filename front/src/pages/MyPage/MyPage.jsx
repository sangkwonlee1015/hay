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
import HeaderOnlyText from '../../components/HeaderOnlyText';
import setAuthorizationToken from '../User/AuthorizationToken';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import jwt_decode from "jwt-decode";
import "./MyPage.css";
import axios from "axios";
import api from "../../api/api";

function MyPage() {
  const [putcheck, setPutCheck] = useState(true);
  const [changeNickname, setChangeNickname] = useState("");
  const [nickName, setNickName] = useState("");

  const navigate = useNavigate();

  function putCheckChange() {
    if(putcheck === false) setPutCheck(true);
    else setPutCheck(false);
  }

  function logout() {
    console.log("logout");
    setAuthorizationToken(null);
    localStorage.removeItem('jwtToken')
  }

  function putNickName(String) {
    axios.post(api.putNickname(), {
      nickname : String
    })
    .then(({ Response }) => {
      putCheckChange();
      setNickName(String);
    })
    .catch((Error) => {console.log(Error)})
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
        <div className="myNickname">
          {putcheck ? 
          <div>
            {nickName} 
            <button 
              onClick={()=>{putCheckChange()}}
              >수정</button>
          </div> : 
          <div>
            <input onChange={(e) => setChangeNickname(e.target.value)}></input>
            <button 
              onClick={()=>{putNickName(changeNickname)}}
              >확인</button>
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