import React from 'react'
import { useEffect } from 'react';
import axios from 'axios';

function KakaoLogin() {
    const PARAMS = new URL(document.location).searchParams;
    const KAKAO_CODE = PARAMS.get('code');

    console.log(KAKAO_CODE);

    useEffect(() => {
        axios.get(`api/user/login?code=${KAKAO_CODE}`)
        .then((Response)=> {
            const result = Response.data.extraData;
            window.location.replace('signup');
            if (result){
                //로그인 정보 저장
            } else{
                //추가 정보 입력 페이지 이동
            }
            console.log(Response.data)
        })
        .catch((Error)=>{console.log(Error)})
    });

}

export default KakaoLogin