import { useEffect, useState } from "react"
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"

import ScrollCalendar from "../ScrollCalendar/ScrollCalendar"

export default function MyGallery(props) {
  const navigate = useNavigate()
  
  const [type, setType] = useState('photogroup')
  const [view, setView] = useState(true)
  const [bookmarked, setBookmarked] = useState([])

  useEffect(() => {
    if (props.category==='frame') {
      setView(true)
      setType('frame')
    } else if (props.category==='photogroup') {
      setType('photogroup')
    } else {
      setView(true)
      setType('bookmark')
      setBookmarked(userDetail.postDTOS.filter(post => post.isBookmark))
    }
  }, [props.category])

  const userDetail = useSelector(state => state.userDetail)

  return (
    <div>
      {
        type==='photogroup' &&
        <div>
          <div onClick={() => setView(true)} style={{ backgroundColor : view ? '#fff7e7' : '' }} >갤러리</div>
          <div onClick={() => setView(false)} style={{ backgroundColor : !view ? '#fff7e7' : '' }}  >달력</div>
        </div>
      }      

      <div className="view-wrapper">
        {
          view ?
          <div>
            {
            userDetail.postDTOS &&
            userDetail.postDTOS.filter(post => post.category===type)===0 &&
            <p>등록된 게시물이 없습니다</p>
            }
            <div className="container-gallery">
              { userDetail && !(type==='bookmark') &&
                userDetail.postDTOS.filter(post => post.category===type)
                .map((post, idx) => (
                  <div className="img-board" key={ idx } onClick={() => {navigate(`/community/${btoa((post.id) * 73 + 37)}`)}}>
                    <img className="post-image" src={ post.url } alt='post' />
                    { post.isLike ? '좋아요함' : '좋아요안함' } 
                    { post.isBookmark ? '북마크됨' : '북마크안됨' }
                  </div>
                ))
              }
            </div>
          </div> :
          <ScrollCalendar />
        }
      </div>

      <div className="view-wrapper">
        {
          type==='bookmark' && <p>등록된 게시물이 없습니다</p> && bookmarked.length &&
          bookmarked.map((post, idx) => (
            <div className="img-board" key={ idx } onClick={() => {navigate(`/community/${btoa((post.id) * 73 + 37)}`)}}>
              <img className="post-image" src={ post.url } alt='post' />
              { post.isLike ? '좋아요함' : '좋아요안함' }
            </div>
          ))
        }
      </div>
    </div>
  )
}