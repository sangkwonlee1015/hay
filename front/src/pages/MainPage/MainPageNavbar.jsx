import React, {useState, useEffect} from 'react'
import axios from 'axios';
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";
import { Button, Input } from "@mui/material";
import api from '../../api/api'


const MainHeader = styled.div`
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.25);
`;
const AreaInfo = styled.div`
  display: flex;
  align-items: center;
  margin: 0 10px;
`;
const AreaName = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin-right: 7px;
`;
const AreaCoordinates = styled.div`
  display: flex;
  flex-direction: column;
  color: "#9A9A9A";
  font-size: 10px;
  line-height: 15px
`;

function MainPageHeader(props) {
  const [areaName, setAreaName] = useState('');
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitutde] = useState("");

  useEffect(() => {
    axios.get(api.getCurrentLocation())
      .then((Response) => {
        const result = Response.data.response;

        setAreaName(result.address);
        setLatitude(result.lat);
        setLongitutde(result.lng);
      });
  }, []);

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
          sx={{ width: '120px'}}
        ></Input>
        <Button sx={{minWidth: 0}}>
          <SearchIcon />
        </Button>
      </MainHeader>
    </>
  );
}

export default MainPageHeader