// 마이페이지 안내 문구
// 프로필 공간 - 푸른 배경색, 닉네임, 닉네임 수정
// 내가 생성한 투표, 내가 참여한 투표, 내 동네 설정

// 로그아웃
// 하단 바 (components에 있음)

import React from 'react'
import { Button } from "@mui/material";
import HeaderOnlyText from '../../components/HeaderOnlyText';
import setAuthorizationToken from '../User/AuthorizationToken';

function MyPage() {

  function logout() {
    console.log("logout");
    setAuthorizationToken(null);
    localStorage.removeItem('jwtToken')
  }

  return (
    <>
      <div>
        <HeaderOnlyText text="마이페이지" />
      </div>
      <div className="myNickname">
        닉네임
        <button>수정</button>
      </div>
      <div className="myInfoList">
        내가 생성한 투표
        <button className="myCreateVote">{'>'}</button><br></br>
        내가 참여한 투표
        <button className="myJoinVote">{'>'}</button><br></br>
        내 동네 설정
        <button className="myLocation">{'>'}</button><br></br>
      </div>
      <div>
        <Button
          variant="test02"
          // onClick={logout()}
          onClick={() => {
            logout()
          }}
        >
          로그아웃
        </Button>
      </div>
    </>
  )
}

export default MyPage