import React from 'react'
import logo from '../../img/logo.png';
import kakao_login from '../../img/kakao_login.png'
import api from '../../api/api';

function Login() {
  return (
    <>
      <img src={logo} alt='너는어때 로고' width='300px'/>
      <div>너는어때</div>
        <a href={api.kakaoLogin()}>
         <img src={kakao_login} alt='카카오로그인'/>
        </a>
    </>
  );
}

export default Login