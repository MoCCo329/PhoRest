import './CommunityListFrame.css'

/* eslint-disable default-case */
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// functions
import { setFrameLike, addFrameLike, likeFrameLike, bookmarkFrameLike, setFrameRecent, addFrameRecent, likeFrameRecent, bookmarkFrameRecent } from '../../store/modules/community'
import community from '../../api/community'

// icons
import add from '../../assets/UI/add.png'
import likeFilled from '../../assets/UI/heart_filled.png'
import likeEmpty from '../../assets/UI/heart_empty.png'
import bookmarkFilled from '../../assets/UI/bookmark_filled.png'
import bookmarkEmpty from '../../assets/UI/bookmark_empty.png'

export default function CommunityListFrame() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [type, setType] = useState(true)  // true면 like, false면 recent

  const frameLike = useSelector(state => state.frameLike)
  const frameRecent = useSelector(state => state.frameRecent)
  const currentUser = useSelector(state => state.currentUser)

  useEffect(() => {
    community.frameLike({limit: 5, offset: 0})
    .then(result => {
      dispatch(setFrameLike(result.data))
    })
    community.frameRecent({limit: 5, offset: 0})
    .then(result => {
      dispatch(setFrameRecent(result.data))
    })
  }, [])

  // infinite scroll
  // useEffect(() => {
  //   document.addEventListener('scroll', function (event) {
  //     const { scrollTop, clientHeight, scrollHeight } = document.documentElement
  //     if (scrollTop + clientHeight >= scrollHeight - 10) {
  //       if (!likeFilteredEnd && type) {
  //         community.photoLike({limit: 5, offset: likeFiltered.length, humanCount: humanCount})
  //         .then(result => {
  //           if (!!result.data) {
  //             dispatch(addPhotoLike([...new Set([...likeFiltered, ...result.data])]))
  //           } else {
  //             setLikeFilteredEnd(true)
  //           }
  //         })
  //       } else if (!recentFilteredEnd && !type) {
  //         community.photoRecent({limit: 5, offset: recentFiltered.length, humanCount: humanCount})
  //         .then(result => {
  //           if (!!result.data) {
  //             dispatch(addPhotoRecent(result.data))
  //           } else {
  //             setRecentFilteredEnd(true)
  //           }
  //         })
  //       }
  //     }
  //   })
  // })

  const likePost = (postId) => {
    if (!currentUser.username) {
      return alert('로그인 후 좋아요가 가능합니다')
    }
    community.likePost(postId)
    .then(result => {
      if (type) {
        dispatch(likeFrameLike(result.data))
      } else {
        dispatch(likeFrameRecent(result.data))
      }
    })
  }

  const bookmarkPost = (postId) => {
    if (!currentUser.username) {
      return alert('로그인 후 북마크가 가능합니다')
    }
    community.bookmarkPost(postId)
    .then(result => {
      if (type) {
        dispatch(bookmarkFrameLike(result.data))
      } else {
        dispatch(bookmarkFrameRecent(result.data))
      }
    })
  }

  const move = (postId) => {
    navigate(`/community/${btoa((postId) * 73 + 37)}`)
  }


  return (
    <div className="community-list">

      <div className="community-list-header">
        <div className='tab-title'>
          <h5>프레임 게시판</h5>
        </div>
        <div className='sub-tab'>
          <div className='sub-tab-btn' onClick={() => setType(true)} style={{backgroundColor: type ? '#d8ec84' : ''}}>인기순</div>
          <div className='sub-tab-btn' onClick={() => setType(false)} style={{backgroundColor: !type ? '#ffd89e' : ''}}>최신순</div>
        </div>
        <div className='create-frame'>
          <div className='create-frame-btn'>
            <div onClick={() => navigate('/community/edit/LTM2')}><img className='icon-img' src={add} alt='add'/>프레임 생성하러 가기</div>
          </div>
        </div>
      </div>
        <div className='community-list-body'>
          {
            type ?
            frameLike.map((post, idx) => (
              <div className='photo-gallery' key={idx}>
                <img className='photo-img' src={post.url} alt={post.id} onClick={() => {move(post.id)}}/>
                <div className='photo-info-content'>
                  <div className='like-cnt-content'>
                    <img className='icon-img' src={post.isLike ? likeFilled : likeEmpty } name='like' onClick={() => likePost(post.id)}></img>
                    {post.likeCount}
                  </div>
                  <img className='icon-img' src={post.isBookmark ? bookmarkFilled : bookmarkEmpty} name='bookmark' onClick={() => bookmarkPost(post.id)}></img>
                </div>
              </div>
            )) :
            frameRecent.map((post, idx) => (
              <div className='photo-gallery' key={idx}>
                <img className='photo-img' src={post.url} alt={post.id} onClick={() => {move(post.id)}}/>
                <div className='photo-info-content'>
                  <div className='like-cnt-content'>
                    <img className='icon-img' src={post.isLike ? likeFilled : likeEmpty } name='like' onClick={() => likePost(post.id)}></img>
                    {post.likeCount}
                  </div>
                  <img className='icon-img' src={post.isBookmark ? bookmarkFilled : bookmarkEmpty} name='bookmark' onClick={() => bookmarkPost(post.id)}></img>
                </div>
              </div>
            ))
          }
        </div>
    </div>
  )
}