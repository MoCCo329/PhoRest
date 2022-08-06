import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper'

import './CommunityCarousel.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default function CommunityCarousel(props) {
  const navigate = useNavigate()

  const { communityType } = props
  const dummyContents = props.contents
  const [humanCount, setHumanCount] = useState(1)

  const move = (postId) => {
    navigate(`/community/${btoa((postId) * 73 + 37)}`)
  }

  return (
      <div className="community-carousel">
        <div className="community-carousel-header">
          <h3>{communityType} 게시판</h3>
          {
            communityType==="photogroup" ?
            <div className="community-carousel-select">
              {[1, 2, 3, 4, 5, 6].map((num, idx) =>
                (
                  <div className="community-carousel-select-btn" onClick={() => setHumanCount(num)} style={{backgroundColor: num===humanCount ? '#ffc036' : ''}} key={idx}>{num}명</div>
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
              (communityType==='frame' || content.humanCount===humanCount) ?
              <SwiperSlide key={idx}>
                <img onClick={() => move(content.postId)}
                  className="community-carousel-slider-img"
                  
                  src={content.url}
                  alt={content.postId}
                />
              </SwiperSlide> : null
            )}
          </Swiper>
        </div>
      </div>
  )
}