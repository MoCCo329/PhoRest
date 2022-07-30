import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default function CommunityCarousel(props) {


  const { communityType } = props
  const dummyContents = props.contents
  const [peopleNum, setPeopleNum] = useState(1)
  const navigate = useNavigate()
  const move = (postId) => {
    navigate(`/community/${postId}`)
  }

  return (
      <div>
        <div className="community-carousel-header">
          <p>{communityType} 게시판</p>
          {
            communityType==='pic' ?
            <div className="communityScroll-select">
              {[1, 2, 3, 4, 5, 6].map((num, idx) =>
                (
                  <div onClick={() => setPeopleNum(num)} style={{backgroundColor: num===peopleNum ? 'blue' : ''}} key={idx}>{num}명</div>
                )
              )}
            </div> : null
          }
        </div>
        <div className='community-carousel-slider'>
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            slidesPerView={3}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            // onSwiper={(swiper) => console.log(swiper)}
            // onSlideChange={() => console.log('slide change')}
          >
            {dummyContents.map((content, idx) =>
              (communityType==='frame' || content.peopleNum===peopleNum) ?
              <SwiperSlide key={idx}>
                <img onClick={() => move(content.postId)}
                  className="d-block w-100"
                  src={content.url}
                  alt={content.postId}
                />
              </SwiperSlide> : null
            )}
          </Swiper>
        </div>
        {communityType==='pic' ? '더미파일이 몇개없어서 지금은 1,2명만 확인가능' : null}
      </div>
  )
}