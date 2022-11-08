// 네브바
// 카테고리 (이야기, 먹자지껄, 매일매일)
// 배너
// 분류 (최신순, 참여자순)
// 투표목록 (바깥 components 폴더에 있음)
// 하단바 (components 폴더에 있음)

import { Button, Input } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import api from "../../api/api";
import VoteItem from "../../components/VoteItem";
import Banner from "./Banner";
import Category from "./Category";

function MainPage() {
  const [voteList, setVoteList] = useState([]);
  const [bestVote, setBestVote] = useState();
  const [searchInput, setSearchInput] = useState("");
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState(1);
  const [order, setOrder] = useState("최신");

  useEffect(() => {
    axios
      .get(api.getVotes(), {
        params: {
          search: keyword,
          category: category,
          order: order,
        },
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwtToken"),
        },
      })
      .then(({ data }) => {
        setBestVote(data.response.bestVote);
        setVoteList(data.response.votes);
      })
      .catch((Error) => {
        setBestVote(null);
        setVoteList([]);
        console.log(Error);
      });
  }, [keyword, category, order]);

  return (
    <>
      <Input
        onChange={(e) => {
          setSearchInput(e.target.value);
        }}
      ></Input>
      <Button
        onClick={() => {
          setKeyword(searchInput);
        }}
      >
        검색
      </Button>
      <Category
        name="이야기"
        id="1"
        onChangeCategory={(id) => {
          setCategory(id);
        }}
      />
      <Category
        name="먹자지껄"
        id="2"
        onChangeCategory={(id) => {
          setCategory(id);
        }}
      />
      <Category
        name="매일매일"
        id="3"
        onChangeCategory={(id) => {
          setCategory(id);
        }}
      />
      <Banner />
      <Button
        onClick={() => {
          setOrder("최신");
        }}
      >
        최신순
      </Button>
      <Button
        onClick={() => {
          setOrder("참여자");
        }}
      >
        참여자순
      </Button>
      {bestVote ? <VoteItem vote={bestVote}></VoteItem> : null}
      {voteList.map((vote, index) =>
        bestVote?.id === vote.id ? null : (
          <VoteItem vote={vote} key={index}></VoteItem>
        )
      )}
    </>
  );
}

export default MainPage;
