import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Scrollbar, A11y } from "swiper"

import community from "../../api/community"
import { setPhotoLike, setFrameLike } from "./../../store/modules/community"

import "./CommunityCarousel.css"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

export default function CommunityCarousel(props) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { communityType } = props

  const [humanCount, setHumanCount] = useState(1)
  const photo = useSelector((state) => state.photoLike)
  const frame = useSelector((state) => state.frameLike)

  const move = (postId) => {
    navigate(`/community/${btoa(postId * 73 + 37)}`)
  }

  useEffect(() => {
    if (communityType === "photogroup") {
      community
        .photoLike({ limit: 100, offset: 0, humanCount: humanCount })
        .then((result) => {
          dispatch(setPhotoLike(result.data))
        })
    } else {
      community.frameLike({ limit: 100, offset: 0 }).then((result) => {
        dispatch(setFrameLike(result.data))
      })
    }
  }, [])

  useEffect(() => {
    community
      .photoLike({ limit: 100, offset: 0, humanCount: humanCount })
      .then((result) => {
        dispatch(setPhotoLike(result.data));
      });
  }, [humanCount])

  return (
    <div className="community-carousel">
      <div className="community-carousel-header">
        <h5>{communityType} 게시판 ✨</h5>
        {communityType === "photogroup" ? (
          <div className="community-carousel-select">
            {[1, 2, 3, 4, 5, 6].map((num, idx) => (
              <div
                className="community-carousel-select-btn"
                onClick={() => setHumanCount(num)}
                style={{ backgroundColor: num === humanCount ? "#ffc036" : "" }}
                key={idx}
              >
                {num}명
              </div>
            ))}
          </div>
        ) : null}
      </div>
      <div className="community-carousel-slider">
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
          {communityType === "photogroup" && photo.length
            ? photo.map((content) => (
                <SwiperSlide key={content.id}>
                  <img
                    onClick={() => move(content.id)}
                    className="community-carousel-slider-img"
                    src={content.url}
                    alt={content.postId}
                  />
                  <div className="show-likedCnt">
                    <div>❤</div>
                    <p>{content.likeCount}</p>
                  </div>
                  <br></br>
                </SwiperSlide>
              ))
            : null}
          {communityType === "frame" && frame.length
            ? frame.map((content) => (
                <SwiperSlide key={content.id}>
                  <img
                    onClick={() => move(content.id)}
                    className="community-carousel-slider-img"
                    src={content.url}
                    alt={content.postId}
                  />
                  <div className="show-likedCnt">
                    <div>❤</div>
                    <p>{content.likeCount}</p>
                  </div>
                  <br></br>
                </SwiperSlide>
              ))
            : null}
        </Swiper>
      </div>
    </div>
  )
}
