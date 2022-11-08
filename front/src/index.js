import React from 'react';
import { Provider } from "react-redux";
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import store from "./_store/store";

import App from './App';
import Login from './pages/User/Login';
import KakaoLogin from './pages/User/KakaoLogin';
import SignUp from './pages/User/Signup';
import LocationSetting from './pages/User/LocationSetting';
import MainPage from './pages/MainPage/MainPage';
import Mypage from './pages/MyPage/MyPage';
import MyLocationSetting from './pages/MyPage/MyLocationSetting';
import VoteDetail from './pages/VoteDetail/VoteDetail';
import VoteCreate from './pages/VoteDetail/VoteCreate';
import MyVotePage from './pages/MyPage/MyVotePage';
import MyParticipatedPage from './pages/MyPage/MyParticipatedPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="" element={<Login />} /> 
          <Route path="login" element={<Login />} />
          <Route path="kakaologin" element={<KakaoLogin />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="locationsetting" element={<LocationSetting />} />
          <Route path="main" element={<MainPage />} />
          <Route path="mypage" element={<Mypage />} />
          <Route path="myvote" element={<MyVotePage />} />
          <Route path="myparticipated" element={<MyParticipatedPage />} />
          <Route path="mylocationsetting" element={<MyLocationSetting />} />
          <Route path="votedetail/:voteId" element={<VoteDetail />} />
          <Route path="votecreate" element={<VoteCreate />} />
        </Route>
      </Routes>
    </Provider>
  </BrowserRouter>
);
