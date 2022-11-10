// 카테고리에 맞는 배너
// 광고일수도 있고, 인기있는 투표일수도 있음
// 사진이 들어갈 경우, 배경을 어둡게 하고 흰색 글씨 사용

import React from 'react'
import Banner1 from '../../img/banner1.png'

function Banner() {
  return (
    <div>
      <img src={Banner1} className="Banner1" alt="Banner" />
    </div>
  )
}

export default Banner