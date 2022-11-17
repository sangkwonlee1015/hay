// 네브바
// 카테고리 (이야기, 먹자지껄, 매일매일)
// 배너
// 분류 (최신순, 참여자순)
// 투표목록 (바깥 components 폴더에 있음)
// 하단바 (components 폴더에 있음)

import { Button, Input } from "@mui/material";

import axios from "axios";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { navigateAction } from "../../_slice/NavigateSlice";
import api from "../../api/api";
import VoteItem from "../../components/VoteItem";
import Banner from "./Banner";
import Category from "./Category";
import MainPageNavbar from "./MainPageNavbar";

const Categories = styled.nav`
  display: flex;
  justify-content: space-around;
`;
const Orders = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 40px;
  line-height: 40px;
  border-bottom: 0.25px solid #6EB9F7;
  margin-right: 5px;
`;

const BottomSpace = styled.div`
  height: 56px;
`;

const CATEGORY_NAME = ["이야기", "먹자지껄", "매일매일"];

function MainPage() {
  const dispatch = useDispatch();
  dispatch(navigateAction.isLoggedIn(true));

  const [voteList, setVoteList] = useState([]);
  const [bestVote, setBestVote] = useState();
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState(0);
  const [order, setOrder] = useState("최신");

  useEffect(() => {
    axios
      .get(api.getVotes(), {
        params: {
          search: keyword,
          category: category + 1,
          order: order,
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
      <MainPageNavbar setKeyword={setKeyword} />
      <Categories>
        {CATEGORY_NAME.map((item, index) => (
          <Category
            name={item}
            index={index}
            category={category}
            onChangeCategory={setCategory}
            key={index}
          />
        ))}
      </Categories>
      <Banner />
      <Orders>
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
      </Orders>
      {bestVote ? <VoteItem vote={bestVote} best={true} path={"/main"} /> : null}
      {voteList.map((vote, index) =>
        bestVote?.id === vote.id ? null : (
          <VoteItem vote={vote} best={false} path={"/main"} key={index} />
        )
      )}
      <BottomSpace/>
    </>
  );
}

export default MainPage;
