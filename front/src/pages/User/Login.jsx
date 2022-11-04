// 그림
// 너는어때?
// 카카오 로그인

import React from 'react'
import logo from '../../img/logo.png';
import kakao_login from '../../img/kakao_login.png'

function Login() {
  function handleLogin() {
    //로그인
  }

  return (
    <>
      <img src={logo} alt='너는어때 로고' width='300px'/>
      <div>너는어때</div>
      <img src={kakao_login} alt='카카오로그인' onClick={handleLogin}/>
    </>
  );
}

export default Login