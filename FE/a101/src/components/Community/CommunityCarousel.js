import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import p1 from './../../assets/1.png'
import p2 from './../../assets/2.png'
import p3 from './../../assets/3.png'
import p4 from './../../assets/4.png'
import p5 from './../../assets/5.png'

export default function CommunityCarousel(props) {

  const dummyContents = [
    {
      category: 'frame',
      date: new Date(),
      frameId: 1,
      postId: 1,
      content: 'testtest1',
      url: p1,
      peopleNum: 1
    },
    {
      category: 'frame',
      date: new Date(),
      frameId: 2,
      postId: 2,
      content: 'testtest2',
      url: p2,
      peopleNum: 1
    },
    {
      category: 'frame',
      date: new Date(),
      frameId: 3,
      postId: 3,
      content: 'testtest3',
      url: p3,
      peopleNum: 1
    },
    {
      category: 'frame',
      date: new Date(),
      frameId: 1,
      postId: 1,
      content: 'testtest1',
      url: p1,
      peopleNum: 1
    },
    {
      category: 'frame',
      date: new Date(),
      frameId: 3,
      postId: 3,
      content: 'testtest3',
      url: p3,
      peopleNum: 1
    },
    {
      category: 'frame',
      date: new Date(),
      frameId: 4,
      postId: 4,
      content: 'testtest4',
      url: p4,
      peopleNum: 2
    },
    {
      category: 'frame',
      date: new Date(),
      frameId: 5,
      postId: 5,
      content: 'testtest5',
      url: p5,
      peopleNum: 2
    },
    {
      category: 'frame',
      date: new Date(),
      frameId: 3,
      postId: 3,
      content: 'testtest3',
      url: p3,
      peopleNum: 2
    },
    {
      category: 'frame',
      date: new Date(),
      frameId: 4,
      postId: 4,
      content: 'testtest4',
      url: p4,
      peopleNum: 2
    },
    {
      category: 'frame',
      date: new Date(),
      frameId: 5,
      postId: 5,
      content: 'testtest5',
      url: p5,
      peopleNum: 2
    },
  ]
  const { communityType } = props
  const [peopleNum, setPeopleNum] = useState(1)
  const navigate = useNavigate()
  const move = (postId) => {
    console.log(1111)
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
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
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