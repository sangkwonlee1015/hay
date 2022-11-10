// 마이페이지 안내 문구
// 프로필 공간 - 푸른 배경색, 닉네임, 닉네임 수정
// 내가 생성한 투표, 내가 참여한 투표, 내 동네 설정

// 로그아웃
// 하단 바 (components에 있음)

import React from 'react'
// import { Button } from "@mui/material";
import {useNavigate} from 'react-router-dom';
import HeaderOnlyText from '../../components/HeaderOnlyText';
import setAuthorizationToken from '../User/AuthorizationToken';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import jwt_decode from "jwt-decode";
import "./MyPage.css";

function MyPage() {
  const navigate = useNavigate();

  function logout() {
    console.log("logout");
    setAuthorizationToken(null);
    localStorage.removeItem('jwtToken')
  }

  const getNickname = () => {
    let nickName = jwt_decode(localStorage.getItem('jwtToken')).nickname
    return nickName
  }

  return (
    <div>
      <HeaderOnlyText text="마이페이지" />
      <div className="myPage">
        <div className="myNickname">
          아주강력한닉네임
          <button>수정</button>
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