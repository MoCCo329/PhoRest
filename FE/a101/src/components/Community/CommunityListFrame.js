/* eslint-disable default-case */
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// functions
import { setFrameLike, addFrameLike, likeFrameLike, bookmarkFrameLike, setFrameRecent, addFrameRecent, likeFrameRecent, bookmarkFrameRecent } from '../../store/modules/community'
import community from '../../api/community'

export default function CommunityListFrame() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  let frameLike = useSelector(state => state.frameLike)
  let frameRecent = useSelector(state => state.frameRecent)

  const [type, setType] = useState(true)  // true면 like, false면 recent

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
    community.likePost(postId)
    .then(result => {
      let isLike = false
      if (result.data===1) {isLike = true}
      if (type) {
        dispatch(likeFrameLike({postId:postId, isLike:isLike}))
      } else {
        dispatch(likeFrameRecent({postId:postId, isLike:isLike}))
      }
    })
  }

  const bookmarkPost = (postId) => {
    community.bookmarkPost(postId)
    .then(result => {
      let isBookmark = false
      if (result.data===1) {isBookmark = true}
      if (type) {
        dispatch(bookmarkFrameLike({postId:postId, isBookmark:isBookmark}))
      } else {
        dispatch(bookmarkFrameRecent({postId:postId, isBookmark:isBookmark}))
      }
    })
  }

  const move = (postId) => {
    navigate(`/community/${postId}`)
  }

  return (
    <div className="community-list">

      <div className="community-list-header">
        <h3>프레임 게시판</h3>
        <div onClick={() => setType(true)} style={{backgroundColor: type ? '#ffc036' : ''}}>인기순</div>/<div onClick={() => setType(false)} style={{backgroundColor: !type ? '#ffc036' : ''}}>최신순</div>
      </div>
      <div className='community-list-body'>
        {
          type ?
          frameLike.map((post, idx) => (
            <div key={idx}>
              <img src={post.url} alt={post.id} onClick={() => {move(post.id)}}/>
              <box-icon type={post.isLike ? 'solid' : 'regular' } name='like' onClick={() => likePost(post.id)}></box-icon>
              {post.likeCount}
              <box-icon type={post.isBookmark ? 'solid' : 'regular'} name='bookmark' onClick={() => bookmarkPost(post.id)}></box-icon>
            </div>
          )) : 
          frameRecent.map((post, idx) => (
            <div key={idx}>
              <img src={post.url} alt={post.id} onClick={() => {move(post.id)}}/>
              <box-icon type={post.isLike ? 'solid' : 'regular' } name='like' onClick={() => likePost(post.id)}></box-icon>
              {post.likeCount}
              <box-icon type={post.isBookmark ? 'solid' : 'regular'} name='bookmark' onClick={() => bookmarkPost(post.id)}></box-icon>
            </div>
          ))
        }
      </div>
    </div>
  )
}