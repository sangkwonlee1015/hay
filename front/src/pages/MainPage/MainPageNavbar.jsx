import React from 'react'
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";
import { Button, Input } from "@mui/material";
import { useSelector } from 'react-redux/es/exports';


const MainHeader = styled.div`
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.25);
`;
const AreaInfo = styled.div`
  display: flex;
  align-items: center;
`;
const AreaName = styled.div`
  font-size: 20px;
  font-weight: 700px;
  margin-right: 5px;
`;
const AreaCoordinates = styled.div`
  display: flex;
  flex-direction: column;
  color: "#9A9A9A";
  font-size: 10px;
  line-height: 15px
`;

function MainPageHeader(props) {
  const areaName = useSelector((state) => state.user.areaName);
  const latitude = useSelector((state) => state.user.latitude);
  const longitude = useSelector((state) => state.user.longitude);

  return (
    <>
      <MainHeader>
        <LocationOnIcon />
        <AreaInfo>
          <AreaName>{areaName}</AreaName>
          <AreaCoordinates>
            <div>{`X ${Math.round(latitude * 1000 + Number.EPSILON) / (1000)}`}</div>
            <div>{`Y ${Math.round(longitude * 1000 + Number.EPSILON) / (1000)}`}</div>
          </AreaCoordinates>
        </AreaInfo>
        <Input
          onChange={(e) => {
            props.setKeyword(e.target.value);
          }}
        ></Input>
        <Button sx={{minWidth: 0}}>
          <SearchIcon />
        </Button>
      </MainHeader>
    </>
  );
}

export default MainPageHeader