import React from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import api from '../../api/api';

function KakaoLogin() {
    const PARAMS = new URL(document.location).searchParams;
    const KAKAO_CODE = PARAMS.get('code');

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(api.login(), {params:{code:KAKAO_CODE}})
        .then((Response)=> {
            const result = Response.data.response.extraData;
            if (result) {
                //로그인 정보 저장
                console.log("로그인 성공")
                localStorage.setItem('jwtToken' , Response.data.response.accessToken);
                navigate('/main');
            } else{
                //추가 정보 입력 페이지 이동
                console.log("추가정보 페이지 이동")
                const kakaoId = Response.data.response.kakaoId;
                navigate("/signup", {state: {"kakaoId": kakaoId}});
            }
        })
        .catch((Error)=>{console.log(Error)})
    });

}

export default KakaoLogin