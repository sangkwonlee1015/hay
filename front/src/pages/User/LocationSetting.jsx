import React from 'react'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Button } from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import styled from 'styled-components';
import Map from '../../components/Map'
import HeaderOnlyText from '../../components/HeaderOnlyText';
import { userAction } from "../../_slice/UserSlice";
import { useLocation } from "react-router";
import axios from 'axios';
import api from '../../api/api';
import { navigateAction } from "../../_slice/NavigateSlice";

const LocationInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Position = styled.div`
  margin: 20px 0 10px;
  text-align: center;
  font-weight: 300;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.5);
`;
const AreaName = styled.div`
  margin: 20px 0 30px;
  text-align: center;
  font-weight: 400;
  font-size: 24px;
`;
const RefreshButton = styled.div`
  &:hover{
    cursor: pointer;
  }
  &:active{
    transform: scale(0.95)}
`;


function LocationSetting() {
  const navigate = useNavigate();
  const [position, setPosition] = useState({});
  const [renew, setRenew] = useState(false);

  const dispatch = useDispatch();
  dispatch(navigateAction.isLoggedIn(false));

  const latitude = useSelector((state) => state.user.latitude);
  const longitude = useSelector((state) => state.user.longitude);
  const areaName = useSelector((state) => state.user.areaName);
  const {state} = useLocation();


  function handleButton() {
    // 여기서 api 통신
    axios.post(api.signup(), {
      kakaoId: state.kakaoId,
      nickname: state.nickname,
      birthYear :state.birthyear, 
      gender : (state.gender === 0 ? "male": "female"),
      lat: latitude,
      lng: longitude,
      address: areaName
    })
    .then((Response)=> {
        const result = Response.data.response
        console.log(result);
    })
    .catch((Error)=>{console.log(Error)})

    navigate('/main');
  }

  function handleRenew() {
    setRenew(!renew)
  }


  useEffect(() => {
    async function getLocation() {
      const result = await new Promise((resolve, reject) => {
        if (navigator.geolocation) {
          const now = new Date();
          navigator.geolocation.getCurrentPosition(
            (position) => {
              resolve({
                err: 0,
                time: now.toLocaleTimeString(),
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              });
            },
            (err) => {
              resolve({
                err: -1,
                latitude: -1,
                longitude: -1,
              });
            },
            { enableHighAccuracy: true, maximumAge: 2000, timeout: 5000 }
          );
        } else {
          reject({ error: -2, latitude: -1, longitude: -1 });
        }
      });
      setPosition(result);
    }
    getLocation();
  }, [renew]);
  
  console.log(position);
  dispatch(userAction.latitude(position.latitude));
  dispatch(userAction.longitude(position.longitude));

  // console.log(position)
  return (
    <div>
      <HeaderOnlyText text="동네 설정" />
      <Map />
      <LocationInfo>
        <Position>{`위도 ${latitude}   경도 ${longitude}`}</Position>
        <AreaName>{areaName}</AreaName>
        <RefreshButton onClick={handleRenew}>
          <AutorenewIcon sx={{ fontSize: 50 }} />
        </RefreshButton>
      </LocationInfo>
      <Button
        variant="contained"
        onClick={handleButton}
        sx={{ position: "absolute", bottom: "100px", left: "calc(50% - 61px)" }}
      >
        회원가입 완료
      </Button>
    </div>
  );
}

export default LocationSetting