// 네브바
// 카테고리 (이야기, 먹자지껄, 매일매일)
// 배너
// 분류 (최신순, 참여자순)
// 투표목록 (바깥 components 폴더에 있음)
// 하단바 (components 폴더에 있음)

import React from 'react'
import Banner from './Banner'
import Category from './Category'


function MainPage() {
  return (
    <>
      <div>MainPage</div>
      <Category name="이야기" />
      <Category name="먹자지껄" />
      <Category name="매일매일" />
      <Banner />
    </>
  )
}

export default MainPage