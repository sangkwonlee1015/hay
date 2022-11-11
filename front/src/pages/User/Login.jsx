import React from 'react'
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import logo from '../../img/logo.png';
import kakao_login from '../../img/kakao_login.png'
import api from '../../api/api';
import { navigateAction } from "../../_slice/NavigateSlice";


const LogoStyle = styled.div`
  position: absolute;
  top: calc(50% - 48px - 300px);
  left: calc(50% - 150px);
`;
const NameStyle = styled.div`
  position: absolute;
  top: calc(50% - 48px);
  left: calc(50% - 96px);
  font-weight: 700;
  font-size: 48px;
  line-height: 150%;
  color: #064579;
  text-align: center;
`;
const KakaoStyle = styled.div`
  position: absolute;
  bottom: 100px;
  left: calc(50% - 150px);
`;


function Login() {
  const dispatch = useDispatch();
  dispatch(navigateAction.isLoggedIn(false));

  return (
    <>
      <LogoStyle>
        <img src={logo} alt="너는어때 로고" width="300px" />
      </LogoStyle>
      <NameStyle>너는어때</NameStyle>
      <KakaoStyle>
        <a href={api.kakaoLogin()}>
          <img src={kakao_login} alt="카카오로그인" />
        </a>
      </KakaoStyle>
    </>
  );
}

export default Login