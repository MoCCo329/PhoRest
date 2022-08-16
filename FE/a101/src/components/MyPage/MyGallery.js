import { useEffect, useState } from "react"
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"

import mypage from "../../api/mypage"

import ScrollCalendar from "../ScrollCalendar/ScrollCalendar"
import likeFilled from '../../assets/UI/heart_filled.png'
import likeEmpty from '../../assets/UI/heart_empty.png'
import bookmarkFilled from '../../assets/UI/bookmark_filled.png'
import bookmarkEmpty from '../../assets/UI/bookmark_empty.png'
import lock from '../../assets/UI/lock.png'
import FloatBtn from "../Utils/FloatingBtn"


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
    <div className="mygallery">
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
          <div className="container-gallery">
            { userDetail && !(type==='bookmark') ? 
              (
              userDetail.postDTOS.filter(post => post.category===type).length===0 ?
              <p className='no-content'>등록된 게시물이 없습니다</p> :
              userDetail.postDTOS.filter(post => post.category===type)
              .map((post, idx) => (
                <div className="img-board" key={ idx } onClick={() => {navigate(`/community/${btoa((post.id) * 73 + 37)}`)}}>
                  <img className="post-image" src={ post.url } alt='post' />
                  <img className='icon-img' src={ post.isLike ? likeFilled : likeEmpty } name='like' alt='like' ></img>{String(post.likeCount)+' '}
                  <img className='icon-img' src={ post.isBookmark ? bookmarkFilled : bookmarkEmpty } name='bookmark' alt='bookmark' ></img>
                  {
                  isMyMypage && type==='photogroup' ?
                  (isSharing(post) ? '' : <img className='icon-img' src={ lock } name='lock' alt='lock' ></img>) : null
                  }
                </div>
              ))
              ) :
              null
            }
          </div> :
          <ScrollCalendar />
        }
      </div>
      {
        type==='bookmark' && bookmarked.length ?
        
        <div className="container-gallery">
        {
          bookmarked.map((post, idx) => (
            <div className="img-board" key={ idx } onClick={() => {navigate(`/community/${btoa((post.id) * 73 + 37)}`)}}>
              <img className="post-image" src={ post.url } alt='post' />
              <img className='icon-img' src={ post.isLike ? likeFilled : likeEmpty } name='like' alt='like' ></img>

              { !isMyMypage ? 
                <img className='icon-img' src={ post.isBookmark ? bookmarkFilled : bookmarkEmpty } name='bookmark' alt='bookmark' ></img> :
                null
              }
            </div>))
        } 
        </div> :
        (
        type==='bookmark' ?
        <p className='no-content-bookmark'>북마크한 게시물이 없습니다</p> :
        null
        )
      }
      
      <div id="top" onClick={() => { window.scrollTo({ top: 0, left: 0, behavior: "smooth" }) }}>
        <FloatBtn/>
      </div>
    </div>
  )
}