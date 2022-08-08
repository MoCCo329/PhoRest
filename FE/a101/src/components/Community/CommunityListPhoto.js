/* eslint-disable default-case */
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// functions
import { setPhotoLike, addPhotoLike, likePhotoLike, bookmarkPhotoLike, setPhotoRecent, addPhotoRecent, likePhotoRecent, bookmarkPhotoRecent } from '../../store/modules/community'
import community from '../../api/community'

export default function CommunityListPhoto() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const photoLike = useSelector(state => state.photoLike)
  const photoRecent = useSelector(state => state.photoRecent)
  const currentUser = useSelector(state => state.currentUser)

  const [humanCount, setHumanCount] = useState(1)
  const [type, setType] = useState(true)  // true면 like, false면 recent

  const [likeFiltered, setLikeFiltered] = useState([])
  const [recentFiltered, setRecentFiltered] = useState([])
  // const [likeFilteredEnd, setLikeFilteredEnd] = useState(false)
  // const [recentFilteredEnd, setRecentFilteredEnd] = useState(false)

  useEffect(() => {
    if (likeFiltered.length===0) {
      community.photoLike({limit: 5, offset: 0, humanCount: humanCount})
      .then(result => {
        dispatch(setPhotoLike(result.data))
      })
    }
    if (recentFiltered.length===0) {
      community.photoRecent({limit: 5, offset: 0, humanCount: humanCount})
      .then(result => {
        dispatch(setPhotoRecent(result.data))
      })
    }
  })

  useEffect(() => {
    setLikeFiltered(photoLike.filter((post, idx) => {
      return post.humanCount===humanCount
      }
    ))
    setRecentFiltered(photoRecent.filter((post, idx) => {
      return post.humanCount===humanCount
      }
    ))
  }, [photoLike, photoRecent, humanCount])

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
        <h3>포즈 게시판</h3>
          <div className="community-list-select">
          {[1, 2, 3, 4, 5, 6].map((num, idx) =>
            (
              <div className="community-list-select-btn" onClick={() => setHumanCount(num)} style={{backgroundColor: num===humanCount ? '#ffc036' : ''}} key={idx}>{num}명</div>
            )
          )}
          </div>
        <div onClick={() => setType(true)} style={{backgroundColor: type ? '#ffc036' : ''}}>인기순</div>/<div onClick={() => setType(false)} style={{backgroundColor: !type ? '#ffc036' : ''}}>최신순</div>
      </div>
      <div className='community-list-body'>
        {
          type ?
          likeFiltered.map((post, idx) => (
            <div key={idx}>
              <img src={post.url} alt={post.id} onClick={() => {move(post.id)}}/>
              <box-icon type={post.isLike ? 'solid' : 'regular' } name='like' onClick={() => likePost(post.id)}></box-icon>
              {post.likeCount}
              <box-icon type={post.isBookmark ? 'solid' : 'regular'} name='bookmark' onClick={() => bookmarkPost(post.id)}></box-icon>
            </div>
          )) :
          recentFiltered.map((post, idx) => (
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