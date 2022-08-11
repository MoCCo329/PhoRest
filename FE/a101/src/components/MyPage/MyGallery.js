import { useEffect, useState } from "react"
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"

import mypage from "../../api/mypage"

import ScrollCalendar from "../ScrollCalendar/ScrollCalendar"

export default function MyGallery(props) {
  const navigate = useNavigate()
  
  const [type, setType] = useState('photogroup')
  const [view, setView] = useState(true)
  const [bookmarked, setBookmarked] = useState([])
  const userDetail = useSelector(state => state.userDetail)
  const currentUser = useSelector(state => state.currentUser)
  const [isMyMypage, setIsMyMypage] = useState(false)

  useEffect(() => {
    if (props.category==='photogroup') {
      setType('photogroup')
    } else if (props.category==='frame') {
      setView(true)
      setType('frame')
    } else {
      setView(true)
      setType('bookmark')
    }
  }, [props.category])
  
  useEffect(() => {
    if (userDetail && userDetail.username===currentUser.username) {
      setIsMyMypage(true)
    } else {
      setIsMyMypage(false)
    }
  }, [userDetail, currentUser])

  useEffect(() => {
    mypage.bookmarked(userDetail.username)
    .then(result => setBookmarked(result.data))
  }, [userDetail])
  
  const isSharing = (post) => {
    if (post.users) {
      if (post.users.some(user => user.username===currentUser.username)) {
        return true
      }
    }
    return false
  }


  return (
    <div>
      {
        type==='photogroup' &&
        <div className="gallery-type-container">
          <div className="gallery-type" onClick={() => setView(true)} style={{ backgroundColor : view ? '#f5737f' : '' }} >갤러리</div>
          <div className="gallery-type" onClick={() => setView(false)} style={{ backgroundColor : !view ? '#f5737f' : '' }}  >달력</div>
        </div>
      }

      <div className="view-wrapper">
        {
          view ?
          <div>
            <div className="container-gallery">
              { userDetail && !(type==='bookmark') ? 
                (
                userDetail.postDTOS.filter(post => post.category===type).length===0 ?
                <p>등록된 게시물이 없습니다</p> :
                userDetail.postDTOS.filter(post => post.category===type)
                .map((post, idx) => (
                  <div className="img-board" key={ idx } onClick={() => {navigate(`/community/${btoa((post.id) * 73 + 37)}`)}}>
                    <img className="post-image" src={ post.url } alt='post' />
                    { post.isLike ? '좋아요함' : '좋아요안함' }
                    { post.isBookmark ? '북마크됨' : '북마크안됨' }
                    {
                    isMyMypage && type==='photogroup' ?
                    (isSharing(post) ? '공유중' : '비공유중') : null
                    }
                  </div>
                ))
                ) :
                null
              }
            </div>
          </div> :
          <ScrollCalendar />
        }
      </div>

      <div className="view-wrapper">
        {
          type==='bookmark' && bookmarked.length ?
          bookmarked.map((post, idx) => (
            <div className="img-board" key={ idx } onClick={() => {navigate(`/community/${btoa((post.id) * 73 + 37)}`)}}>
              <img className="post-image" src={ post.url } alt='post' />
              { post.isLike ? '좋아요함' : '좋아요안함' }
              { !isMyMypage ? 
                (post.isBookmark ? '북마크됨' : '북마크 안됨') :
                null
              }
            </div>
          )) :
          (
          type==='bookmark' ?
          <p>북마크한 게시물이 없습니다</p> :
          null
          )
        }
      </div>
    </div>
  )
}