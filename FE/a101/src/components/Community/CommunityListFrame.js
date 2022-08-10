import './CommunityListFrame.css'

/* eslint-disable default-case */
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// functions
import { setFrameLike, addFrameLike, likeFrameLike, bookmarkFrameLike, setFrameRecent, addFrameRecent, likeFrameRecent, bookmarkFrameRecent, setLikeRecent } from '../../store/modules/community'
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

  const type = useSelector(state => state.likeRecent)  // true면 like, false면 recent

  const frameLike = useSelector(state => state.frameLike)
  const frameRecent = useSelector(state => state.frameRecent)
  const currentUser = useSelector(state => state.currentUser)

  const [offset, setOffset] = useState(0)
  const postTotal = 100
  const pagesNum = parseInt(postTotal / 12) 
  let pages = Array.from({length: pagesNum}, (v, i) => i+1)


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

  useEffect(() => {
    if (type) {
      community.frameLike({limit: 5, offset: 0})
      .then(result => {
        dispatch(setFrameLike(result.data))
      })
    } else {
      community.frameRecent({limit: 5, offset: 0})
      .then(result => {
        dispatch(setFrameRecent(result.data))
      })
    }
  }, [type])

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

  const clickFrameEdit = () => {
    if (!currentUser.username) {
      if (window.confirm('로그인 후 프레임 생성이 가능합니다. 로그인하시겠습니까?')) {
        return navigate('/login')
      }
      return null
    }
    return navigate('/community/edit/LTM2')
  }

  console.log(offset)
  return (
    <div className="community-list">

      <div className="community-list-header">
        <div className='tab-title'>
          <h5>프레임 게시판</h5>
        </div>
        <div className='sub-tab'>
          <div className='sub-tab-btn' onClick={() => dispatch(setLikeRecent(true))} style={{backgroundColor: type ? '#d8ec84' : ''}}>인기순</div>
          <div className='sub-tab-btn' onClick={() => dispatch(setLikeRecent(false))} style={{backgroundColor: !type ? '#d8ec84' : ''}}>최신순</div>
        </div>
        <div className='create-frame'>
          <div className='create-frame-btn'>
            <div onClick={() => clickFrameEdit()}><img className='icon-img' src={add} alt='add'/> 프레임 생성하러 가기</div>
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
                    <img className='icon-img' src={post.isLike ? likeFilled : likeEmpty } name='like' onClick={() => likePost(post.id)} alt='like' ></img>
                    {post.likeCount}
                  </div>
                  <img className='icon-img' src={post.isBookmark ? bookmarkFilled : bookmarkEmpty} name='bookmark' onClick={() => bookmarkPost(post.id)} alt='like' ></img>
                </div>
              </div>
            )) :
            frameRecent.map((post, idx) => (
              <div className='photo-gallery' key={post.id}>
                <img className='photo-img' src={post.url} alt={post.id} onClick={() => {move(post.id)}}/>
                <div className='photo-info-content'>
                  <div className='like-cnt-content'>
                    <img className='icon-img' src={post.isLike ? likeFilled : likeEmpty } name='like' onClick={() => likePost(post.id)} alt='bookmark' ></img>
                    {post.likeCount}
                  </div>
                  <img className='icon-img' src={post.isBookmark ? bookmarkFilled : bookmarkEmpty} name='bookmark' onClick={() => bookmarkPost(post.id)} alt='bookmark' ></img>
                </div>
              </div>
            ))
          }
        </div>
        <div className='main-pagination'>
          {pages.map((num, idx) => (
            <div key={idx} onClick={() => setOffset(idx)}>{num}</div>
          ))}
        </div>
    </div>
  )
}