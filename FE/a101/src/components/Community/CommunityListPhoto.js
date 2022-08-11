import './CommunityListPhoto.css'

/* eslint-disable default-case */
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// functions
import { setPhotoLike, addPhotoLike, likePhotoLike, bookmarkPhotoLike, setPhotoRecent, addPhotoRecent, likePhotoRecent, bookmarkPhotoRecent, setLikeRecent, setPhotoCnt } from '../../store/modules/community'
import community from '../../api/community'

import Pagination from './Pagination'

// icons
import likeFilled from '../../assets/UI/heart_filled.png'
import likeEmpty from '../../assets/UI/heart_empty.png'
import bookmarkFilled from '../../assets/UI/bookmark_filled.png'
import bookmarkEmpty from '../../assets/UI/bookmark_empty.png'

export default function CommunityListPhoto() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [humanCount, setHumanCount] = useState(1)

  const type = useSelector(state => state.likeRecent)  // true면 like, false면 recent
  const currentUser = useSelector(state => state.currentUser)
  const photoLike = useSelector(state => state.photoLike)
  const photoRecent = useSelector(state => state.photoRecent)
  const photoCnt = useSelector(state => state.photoCnt)

  // const [likeFilteredEnd, setLikeFilteredEnd] = useState(false)
  // const [recentFilteredEnd, setRecentFilteredEnd] = useState(false)

  const limit = 8
  const [page, setPage] = useState(0)

  useEffect(() => {
    community.photoLike({limit: limit, offset: page * limit, humanCount: humanCount})
    .then(result => {
      dispatch(setPhotoLike(result.data))
    })
    community.photoRecent({limit: limit, offset: page * limit, humanCount: humanCount})
    .then(result => {
      dispatch(setPhotoRecent(result.data))
    })
    community.photoCount(humanCount)
    .then(result => {
      dispatch(setPhotoCnt(result.data))
    })
  }, [])

  useEffect(() => {
    community.photoLike({limit: limit, offset: page * limit, humanCount: humanCount})
    .then(result => {
      dispatch(setPhotoLike(result.data))
    })
    community.photoRecent({limit: limit, offset: page * limit, humanCount: humanCount})
    .then(result => {
      dispatch(setPhotoRecent(result.data))
    })
  }, [type, humanCount])

  useEffect(() => {
    community.photoLike({limit: limit, offset: page * limit, humanCount: humanCount})
    .then(result => {
      dispatch(setPhotoLike(result.data))
    })
    community.photoRecent({limit: limit, offset: page * limit, humanCount: humanCount})
    .then(result => {
      dispatch(setPhotoRecent(result.data))
    })
  }, [page])

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
        dispatch(likePhotoLike(result.data))
      } else {
        dispatch(likePhotoRecent(result.data))
      }
    })
  }

  const bookmarkPost = (postId) => {
    if (!currentUser.username) {
      return alert('로그인 후 좋아요가 가능합니다')
    }
    community.bookmarkPost(postId)
    .then(result => {
      if (type) {
        dispatch(bookmarkPhotoLike(result.data))
      } else {
        dispatch(bookmarkPhotoRecent(result.data))
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
          <h5>포즈 게시판</h5>
        </div>
        <div className='sub-tab'>
          <div className='sub-tab-btn' onClick={() => dispatch(setLikeRecent(true))} style={{backgroundColor: type ? '#d8ec84' : ''}}>인기순</div>
          <div className='sub-tab-btn' onClick={() => dispatch(setLikeRecent(false))} style={{backgroundColor: !type ? '#d8ec84' : ''}}>최신순</div>
        </div>
        <div className="community-list-select">
        {[1, 2, 3, 4, 5, 6].map((num, idx) =>
          (
            <div className="community-list-select-btn" onClick={() => setHumanCount(num)} style={{backgroundColor: num===humanCount ? '#ffd89e' : ''}} key={idx}>{num}명</div>
          )
        )}
        </div>        
      </div>
        <div className='community-list-body'>
          {
            type ?
            photoLike.map((post, idx) => (
              <div className='photo-gallery' key={idx}>
                <img className='photo-img' src={post.url} alt={post.id} onClick={() => {move(post.id)}}/>
                <div className='photo-info-content'>
                  <div className='like-cnt-content'>
                    <img className='icon-img' src={ post.isLike ? likeFilled : likeEmpty } name='like' onClick={() => likePost(post.id)} alt='like' ></img>
                    {post.likeCount}
                  </div>
                  <img className='icon-img' src={ post.isBookmark ? bookmarkFilled : bookmarkEmpty } name='bookmark' onClick={() => bookmarkPost(post.id)} alt='bookmark' ></img>
                </div>
              </div>
            )) :
            photoRecent.map((post, idx) => (
              <div className='photo-gallery' key={idx}>
                <img className='photo-img' src={post.url} alt={post.id} onClick={() => {move(post.id)}}/>
                <div className='photo-info-content'>
                  <div className='like-cnt-content'>
                    <img className='icon-img' src={ post.isLiked ? likeFilled : likeEmpty } name='like' onClick={() => likePost(post.id)} alt='like' ></img>
                    {post.likeCount}
                  </div>
                    <img className='icon-img' src={ post.isBookmark ? bookmarkFilled : bookmarkEmpty } name='bookmark' onClick={() => bookmarkPost(post.id)} alt='bookmark' ></img>  
                </div>
              </div>
            ))
          }
        </div>
        <div className='main-pagination'>
           <Pagination
            total={photoCnt}
            limit={limit}
            page={page}
            setPage={setPage}
          />
        </div>
    </div>
  )
}