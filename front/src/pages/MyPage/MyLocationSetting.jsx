// 상단 내 동네 설정
// 지도
// 동네 선택
// 지역은 최소 1개 최대 2개를 설정할 수 있어요
// 동네 1, 동네 2
// 동네 1과 거리
// 선택한 범위의 게시물만 볼 수 있어요
// 막대 컨트롤러

import React from 'react'
import HeaderTextAndNavigate from "../../components/HeaderTextAndNavigate";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Button } from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import Map from '../../components/Map'
import HeaderOnlyText from '../../components/HeaderOnlyText';
import { userAction } from "../../_slice/UserSlice";
import { useLocation } from "react-router";
import axios from 'axios';
import api from '../../api/api';

function MyLocationSetting() {
  const [position, setPosition] = useState({});
  const [renew, setRenew] = useState(false);

  const dispatch = useDispatch();
  const latitude = useSelector((state) => state.user.latitude);
  const longitude = useSelector((state) => state.user.longitude);
  const areaName = useSelector((state) => state.user.areaName);

  //api 통신들
  //등록된 동네 조회
  function getMyLocations() {
    axios.get(api.getLocation())
    .then(({ data }) => {
      console.log(data);
    })
    .catch((Error) => {
      console.log(Error);
    })
  }
  //동네 추가
  function addMyLocation() {
    axios.post(api.addLocation(), {
      //lat
      //lng
      //address
      //seq
    })
    .then((Response)=>{
      const result = Response.data.response
      console.log(result);
    })
    .catch((Error)=>{console.log(Error)})
  }
  //동네 삭제
  function deleteMyLocation(locationId) {
    axios.delete(api.deleteLocation(locationId))
    .then((Response)=>{
      const result = Response.data.response
      console.log(result);
    })
    .catch((Error)=>{console.log(Error)})
  }
  //현재 동네 설정
  function setCurrentLocation() {
    axios.post(api.setCurrentLocation(), {
      //locationId
    })
    .then((Response)=>{
      const result = Response.data.response
      console.log(result);
    })
    .catch((Error)=>{console.log(Error)})
  }
  //동네 범위 설정
  function setLocationRange() {
    axios.post(api.setLocationRange(), {
      //range
    })
    .then((Response)=>{
      const result = Response.data.response
      console.log(result);
    })
    .catch((Error)=>{console.log(Error)})
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

  dispatch(userAction.latitude(position.latitude));
  dispatch(userAction.longitude(position.longitude));

  return (
    <>
      <HeaderTextAndNavigate path="/mypage" text="내 동네 설정" />
      <Map />
      <div>{`위도 ${latitude}   경도 ${longitude}`}</div>
      <div>{areaName}</div>
      <div onClick={handleRenew}>
        <AutorenewIcon sx={{ fontSize: 50 }} />
      </div>
      <div></div>
      <Button
        variant="test01"
        onClick={getMyLocations()}
      >
        getMyLocations
      </Button>
      <div></div>
      <Button
        variant="test02"
        onClick={addMyLocation()}
      >
        addMyLocation
      </Button>
      <div></div>
      <Button
        variant="test03"
      >
        test03
      </Button>

    </>
  )
}

export default MyLocationSetting