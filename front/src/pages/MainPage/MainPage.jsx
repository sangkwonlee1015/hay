// 네브바
// 카테고리 (이야기, 먹자지껄, 매일매일)
// 배너
// 분류 (최신순, 참여자순)
// 투표목록 (바깥 components 폴더에 있음)
// 하단바 (components 폴더에 있음)

import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import api from "../../api/api";
import VoteItem from "../../components/VoteItem";
import Banner from "./Banner";
import Category from "./Category";

function MainPage() {
  const [voteList, setVoteList] = useState([]);

  useEffect(() => {
    axios
      .get("api/votes?order=최신", {
        headers: {
          Authorization:
            "Bearer " +
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzX2t6eGN2QG5hdmVyLmNvbSIsIm5pY2tuYW1lIjoi7J207IOB6raMIiwiaXNzIjoiaGF5IiwiZXhwIjoxNjY4MTQ5NjAzfQ.Livkg_-eWhsS-L00xGCSHLjMwuNEMNr2H2ZJnbAcsDo",
        },
      })
      .then(({ data }) => {
        setVoteList(data.response);
        console.log(data.response);
      })
      .catch((Error) => {
        console.log(Error);
      });
  }, []);

  return (
    <>
      <div>MainPage</div>
      <Category name="이야기" />
      <Category name="먹자지껄" />
      <Category name="매일매일" />
      <Banner />
      {voteList.map((vote, index) => (
        <VoteItem vote={vote}></VoteItem>
      ))}
    </>
  );
}

export default MainPage;
