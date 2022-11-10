// 그림
// 너는어때?
// 카카오 로그인

import React from 'react'
import logo from '../../img/logo.png';
import kakao_login from '../../img/kakao_login.png'

const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=2cc38f3feb14c46b190ca5fe77598eb6&redirect_uri=http://localhost:3000/kakaologin&response_type=code`;

function Login() {
  return (
    <>
      <img src={logo} alt='너는어때 로고' width='300px'/>
      <div>너는어때</div>
        <a href={KAKAO_AUTH_URL}>
         <img src={kakao_login} alt='카카오로그인'/>
        </a>
    </>
  );
}

export default Login