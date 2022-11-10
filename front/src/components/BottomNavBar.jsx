// 홈 아이콘
// 투표 등록
// 마이페이지

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import PersonIcon from "@mui/icons-material/Person";
import { navigateAction } from "../_slice/NavigateSlice";


function BottomNavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const bottomNavigate = useSelector((state) => state.navigate.bottomNavigate);

  const navigateHandler = (newValue) => {
    dispatch(navigateAction.bottomNavigate(newValue));
    if(newValue === 0) {
      navigate('/main');
    } else if(newValue === 1) {
      navigate("/votecreate");
    } else {
      navigate("/mypage");
    }
  };

  return (
    <Box sx={{ position: "fixed", bottom: 0, left: 0, right: 0, borderTop: '0.5px solid rgba(0, 0, 0, 0.25)' }} elevation={3}>
      <BottomNavigation
        showLabels
        value={bottomNavigate}
        onChange={(event, newValue) => {
          navigateHandler(newValue);
        }}
      >
        <BottomNavigationAction label="홈" icon={<HomeIcon />} />
        <BottomNavigationAction icon={<AddCircleIcon />} />
        <BottomNavigationAction label="마이페이지" icon={<PersonIcon />} />
      </BottomNavigation>
    </Box>
  );
};

export default BottomNavBar;
