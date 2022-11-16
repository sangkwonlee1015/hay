// 누르면 투표글로 이동하는 투표 요약 컴포넌트
// 아이콘(베스트일 경우 왕관), 제목, 등록일자, 남은날짜, 참여자 수 포함

import React from "react";
import { useNavigate } from "react-router-dom";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import styled from "styled-components";
import crown from '../img/crown.png';

const VoteContainer = styled.div`
  height: 75px;
  display: grid;
  grid-template-columns: 1fr 4fr 1.5fr;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.25);
  background-color: ${(props) => (props.best ? "#E7F3FE" : "transparent")};
  > * {
    justify-content: center;
  }
`;
const VoteIcon = styled.div``;
const VoteText = styled.div`
  display: flex;
  flex-direction: column;

`;
const VoteTextTop = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 18px;
  line-height: 24px;
  font-weight: bold;
  max-width: calc((100vw - 40px) / 6.5 * 4);
`;
const VoteTextBottom = styled.div`
  font-size: 12px;
  line-height: 20px;
  color: rgba(0,0,0,0.5);
`;
const VoteTextCount = styled.div`
  display: flex;
  justify-content: center;
  font-weight: 700;
  font-size: 20px;
  line-height: 150%;

  letter-spacing: 0.15px;

  color: #064579;
`;

function VoteItem({ vote, best, path }) {
  const navigate = useNavigate();

  // 남은 날짜 계산
  const dateSplit = vote.endDate.split(" ")[0].split("-");
  const endDate = new Date(dateSplit[0], dateSplit[1] - 1, dateSplit[2]);
  // const endDate = new Date(2022,10,10);
  const today = new Date();
  const dateDiff = Math.floor((endDate.getTime() - today.getTime()) / (1000*60*60*24) + 1);

  return (
    <VoteContainer
      onClick={() => {
        navigate(`/votedetail/${vote.id}`, {state: {"voteId": vote.id, "path": path}});
      }}
      best={best}
    >
      <VoteIcon>
        {best ? <img src={crown} alt="왕관" /> : <CalendarMonthIcon />}
      </VoteIcon>

      <VoteText>
        <VoteTextTop>{vote.title}</VoteTextTop>
        <VoteTextBottom>
          {vote.startDate.split(" ")[0]} | {vote.ended||dateDiff<=0?"종료된 투표":dateDiff+"일 남음"}
        </VoteTextBottom>
      </VoteText>
      <VoteTextCount>{vote.voteCount}표</VoteTextCount>
      {/* {vote.ended ? "true" : "false"} */}
    </VoteContainer>
  );
}

export default VoteItem;
