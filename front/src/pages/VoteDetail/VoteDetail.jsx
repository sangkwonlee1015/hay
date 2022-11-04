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

import React from 'react'

function VoteDetail() {
  const data = {
    items: [
    ],
    closed: false,
    multiple: false,
    expansion: false,
    showTotal: true,
    creator: "",
  }
  const customStyles = {

  }
  
  
  
  
  
  
  
  
  return (
    <>
      <div>
        VoteDetail
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
