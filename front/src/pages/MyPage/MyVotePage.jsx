import axios from "axios";
import React, { useState, useEffect } from "react";
import api from "../../api/api";
import HeaderTextAndNavigate from "../../components/HeaderTextAndNavigate";
import VoteItem from "../../components/VoteItem";

function MyVotePage() {
  const [voteList, setVoteList] = useState([]);

  useEffect(() => {
    axios
      .get(api.getVotes(), {
        params: {
          "my-vote": true,
        },
      })
      .then(({ data }) => {
        setVoteList(data.response.votes);
      })
      .catch((Error) => {
        setVoteList([]);
        console.log(Error);
      });
  }, []);

  return (
    <>
      <HeaderTextAndNavigate path="/mypage" text="내가 생성한 투표" />
      {voteList.map((vote, index) => (
        <VoteItem vote={vote} path={"/myvote"} key={index}></VoteItem>
      ))}
    </>
  );
}

export default MyVotePage;
