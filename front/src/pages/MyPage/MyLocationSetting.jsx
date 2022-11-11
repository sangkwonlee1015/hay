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
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import AutorenewIcon from "@mui/icons-material/Autorenew";
import Map from '../../components/Map'
import HeaderOnlyText from '../../components/HeaderOnlyText';
import { userAction } from "../../_slice/UserSlice";
import { useLocation } from "react-router";
import axios from 'axios';
import api from '../../api/api';
import "./MyLocationSetting.css";

function MyLocationSetting() {
  const [position, setPosition] = useState({});
  const [renew, setRenew] = useState(false);

  const dispatch = useDispatch();
  const latitude = useSelector((state) => state.user.latitude);
  const longitude = useSelector((state) => state.user.longitude);
  const areaName = useSelector((state) => state.user.areaName);

  const [locations, setLocations] = useState([]);
  //api 통신들
  //등록된 동네 조회
  function getMyLocations() {
    axios.get(api.getLocation())
    .then(({ data }) => {
      setLocations(data.response);
      console.log("data", data);
    })
    .catch((Error) => {
      console.log(Error);
    })
  }
  //동네 추가
  function addMyLocation(seq) {
    axios.post(api.addLocation(), {
      lat : latitude,
      lng : longitude,
      address : areaName,
      seq : seq
    })
    .then((Response)=>{
      const result = Response.data.response
      console.log(result);
    })
    .catch((Error)=>{console.log(Error)})
  }
  //동네 삭제
  function deleteMyLocation(locationId) {
    //if(locations.length == 1) { 다메요 }
    //else {}
    axios.delete(api.deleteLocation(locationId))
    .then((Response)=>{
      const result = Response.data.response
      console.log(result);
    })
    .catch((Error)=>{console.log(Error)})
  }
  //현재 동네 설정
  function setCurrentLocation(locationId, seq) {
    console.log("locationId : ", locationId)
    if(locationId === null) { 
      addMyLocation(seq);
    }
    else {
      axios.post(api.setCurrentLocation(), {
        locationId: locationId,
      })
      .then((Response)=>{
        const result = Response.data.response
        console.log(result);
        getMyLocations();
      })
      .catch((Error)=>{console.log(Error)})
    }
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
    getMyLocations();
  }, []);

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
              console.log("error getLocation")
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

  // const 동네이름 = [
  //   {
  //     name: locations[0].address,
  //     locationId: locations[0].locationId,
  //     isSelected: locations[0].isCurrent,
  //   },
  //   {
  //     name: locations[1].address,
  //     locationId: locations[1].locationId,
  //     isSelected: locations[1].isCurrent,
  //   },
  // ]
  const valuetext = (value) => {
    return `${value}km`;
  }
  const marks = [
    {
      value: 0.5,
      label: "0.5km",
    },
    {
      value: 1,
      label: "1km",
    },
    {
      value: 2,
      label: "2km",
    }
  ]
  const valueLabelFormat = (value) => {
    return marks.findIndex((mark) => mark.value === value) + 1;
  }
  
  return (
    <div className="myLocationSettingPage">
      <HeaderTextAndNavigate path="/mypage" text="내 동네 설정" />
      <Map />
      <div>{`위도 ${latitude}   경도 ${longitude}`}</div>
      <div>{areaName}</div>
      <Stack direction="row" spacing={2} justifyContent="center">
        <Chip
          label={locations[0]?.address}
          onClick={() => setCurrentLocation(locations[0]?.id, 0)}
          onDelete={deleteMyLocation}
          color="primary"
          variant={ locations[0]?.isCurrent ? "filled" : "outlined" }
        />
        <Chip
          label={locations[1]?.address}
          onClick={() => setCurrentLocation(locations[1]?.id, 1)}
          onDelete={deleteMyLocation}
          color="primary"
          variant={ locations[1]?.isCurrent ? "filled" : "outlined" }
        />
      </Stack>
      <div className="slider">
        <Slider
          aria-label="Restricted values"
          defaultValue={2}
          valueLabelFormat={valueLabelFormat}
          getAriaValueText={valuetext}
          step={null}
          max={2}
          valueLabelDisplay="off"
          marks={marks}
        />
      </div>
      <div onClick={handleRenew}>
        <AutorenewIcon sx={{ fontSize: 50 }} />
      </div>
      <div></div>
      <Button
        variant="test01"
        onClick={() => {
          getMyLocations()
        }}
      >
        getMyLocations
      </Button>
      <div></div>
      {/* <Button
        variant="test02"
        onClick={addMyLocation()}
      >
        addMyLocation
      </Button> */}
      <div></div>
      <Button
        variant="test03"
      >
        test03
      </Button>

    </div>
  )
}

export default MyLocationSetting
