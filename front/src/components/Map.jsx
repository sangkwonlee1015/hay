import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../_slice/UserSlice";

const { kakao } = window;

const Map = () => {

    const dispatch = useDispatch();
    const latitude = useSelector((state) => state.user.latitude);
    const longitude = useSelector((state) => state.user.longitude);

    //처음 지도 그리기
    useEffect(()=>{
      if (latitude === -1) return;

      var mapContainer = document.getElementById("map"), // 지도를 표시할 div
        mapOption = {
          center: new kakao.maps.LatLng(latitude, longitude), // 지도의 중심좌표
          level: 3, // 지도의 확대 레벨
        };

      var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

      
      // 마커가 표시될 위치입니다
      var markerPosition = new kakao.maps.LatLng(latitude, longitude);
      
      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
        position: markerPosition,
      });

      // 마커가 지도 위에 표시되도록 설정합니다
      marker.setMap(map);
      
      // 법정동
      var geocoder = new kakao.maps.services.Geocoder();
      geocoder.coord2Address(longitude, latitude, function(result, status) {
        if (status === kakao.maps.services.Status.OK) {
          // console.log(result[0].address.region_3depth_name);
          dispatch(userAction.areaName(result[0].address.region_3depth_name));
        }});
    },[dispatch, latitude, longitude]);

    return (
      <div
        style={{
          width: '100vw',
          display: 'inline-block',
          marginTop: '48px'
        }}
      >
        <div id="map"  style={{ height: '100vw' }}></div>
      </div>
    );
};

export default Map;