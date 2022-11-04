// 카테고리 (이전 페이지) 이동 바
// 제목
// 작성자 닉네임, 거리 안내

// 본문

// 투표 - 유저가 참여하지 않았고, 진행중일 경우
// 투표 - 유저가 참여하였고, 진행중일 경우
// 투표 - 유저가 참여하지 않았고, 종료된 경우
// 투표 - 유저가 참여하였고, 종료된 경우

// 댓글 수, 공유하기
// 댓글 리스트

import { Details, DetailsSharp } from '@mui/icons-material'
import React from 'react'

function VoteDetail() {
  
  const details = {
    title: "여러분이 정해주신 곳으로 가겠습니다.",
    작성자: "건설로봇",
    distanceLevel: 0,
    imageUrls: "",
    body: "안녕하세요 저는 매일매일 노동력을 착취당하는 프롤레탈리아입니...",
    voteCount: 10,
    startDate: "2022-10-28 14:01:00.000000",
    endDate: "2022-11-04 14:01:00.000000",
    ended: false,
    voted: true,
    voteItems: [
      {
        id: 1,
        content: "서플라이 국밥",
        voteCount: 0,
        voted: false,
      },
      {
        id: 2,
        content: "팩토리 분식",
        voteCount: 3,
        voted: true,
      },
      {
        id: 3,
        content: "스타포트 레스토랑",
        voteCount: 7,
        voted: false,
      },
    ],
    comments: [
      {
        id: 1,
        content: "댓글내용1입니다",
        likesCount: 0,
        createdAt: "2022-11-04 17:06:12.000000",
        writerNickname: "버뮤",
        deleted: false, // true일 경우 삭제된 댓글입니다 표시
        replies: [
          {
            // 객체 하나당 댓글or대댓글 한 개임
          },
          {
            id: 2,
            content: "댓글내용1의 대댓글1 내용입니다.",
            likesCount: 0,
            createdAt: "2022-11-14 17:09:28.000000",
            writerNickname: "미온",
          },
        ],
      },
    ],
  }

  /**
   * 댓글별로 대댓글까지 순회하며 카운트해서 총 댓글 수를 반환하는 함수
   * @returns number
   */
  const commentCount = () => {
    let result = 0;
    for (let comment of details.comments) {
      if (comment.replies.length > 0) {
        for (let tmp of comment.replies) {
          result += !!tmp;
        }
      }
      result += 1;
    }
    return result
  }
  
    
  return (
    <>
      <div>
        <div>{details.title}</div>
        <div>{details.작성자}</div>
        <div>{details.distanceLevel}</div>
        <div>{details.startDate}</div>
      </div>
      <div>이미지</div>
      <div>{details.body}</div>
      <div>
        투표
      </div>
      댓글 {commentCount()}      <div>공유하기</div>
      <div>
        <h2>베스트 댓글</h2>
        <div></div>

        <div>
          <div>{details.comments[0].content}</div>
          <div>{details.comments[0].writerNickname}</div>
          <div>좋아요 {details.comments[0].likesCount}</div>
          <div>{details.comments[0].createdAt}</div>
        </div>
      </div>
    </>
  )
}

export default VoteDetail


/**
   * 종료시점과 현재날짜를 비교하여 남은 날짜 또는 시간을 보여주거나 종료된 투표임을 반환하는 함수.
   * @returns {string}
   */
 const 남은날짜계산 = (endTime) => {
  let todayRaw = new Date();
  let today = todayRaw.getFullYear() + "-" + todayRaw.getMonth() + "-" + todayRaw.getDate() + "T" + todayRaw.getHours() + ":" + todayRaw.getMinutes() + ":" + todayRaw.getSeconds()
  let result = 0;

  if (today > endTime) {
    // 투표 종료된 이후
    result = "종료된 투표";
  } else if (today.substring(5, 7) < endTime.substring(5, 7)) { // 예외처리를 월 차이만 하자.
    // 다음 달까지 넘어감
    result = new Date(endTime.substring(0, 4), endTime.substring(5, 7), 0).getDate() + endTime.substring(8, 10) - today.substring(8, 10);
    result = result + "일 남음";
  } else if (endTime.substring(8, 10) - today.substring(8, 10) < 1) {
    // 하루보다 짧은 시간일 경우
    result = endTime.substring(11, 13) - today.substring(11, 13);
    result = result + "시간 남음";
  } else {
    result = endTime.substring(8, 10) - today.substring(8, 10);
    result = result + "일 남음";
  }

  return result;
}

/**
   * 해당 투표와 조회한 사람의 거리를 0.5km, 1km로 끊어 어느 정도 가까운지를 반환하는 함수.
   * 
   * 최대 조회 거리가 2km임을 감안하여 1km 이상의 거리는 별도로 끊지 않았음에 주의
   * @param {number} distance
   * @returns {string}
   */
 const 거리계산 = (distance) => {
  let result = ""
  if (distance < 500) {
    result = "0.5km 이내";
  } else if (distance < 1000) {
    result = "1km 이내";
  } else {
    result = "2km 이내";
  }
  return result;
}
