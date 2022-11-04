// 누르면 투표글로 이동하는 투표 요약 컴포넌트
// 아이콘(베스트일 경우 왕관), 제목, 등록일자, 남은날짜, 참여자 수 포함

import React from "react";

function VoteItem({ vote }) {
  return (
    <div>
      {vote.title}
      <br />
      {vote.startDate}, {vote.endDate}
      <br />
      {vote.voteCount}
    </div>
  );
}

export default VoteItem;
