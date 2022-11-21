import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";
import BottomNavBar from "./components/BottomNavBar";

// import font
import "./App.css";

// 뷰포트 크기를 지정, flex 이용해서 중앙 정렬
const Resolution = styled.div`
  display: flex;
  flex-direction: column;
  ${'' /* justify-content: center; */}
  align-items: center;
  > * {
    max-width: 1190px;
    flex-grow: 1;
  }
`;

function App() {
  const isLoggedIn = useSelector((state) => state.navigate.isLoggedIn);
  return (
    <div>
      <Resolution>
        <div>
          <Outlet />
        </div>
      </Resolution>
      {isLoggedIn ? <BottomNavBar /> : null}
    </div>
  );
}

export default App;
