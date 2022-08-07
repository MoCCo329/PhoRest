import { useState } from 'react'
import { useDispatch } from 'react-redux'

import mypage from '../../api/mypage'
import community from '../../api/community'
import { setDetailPost } from '../../store/modules/community'


export default function Comments(props) {
  const dispatch = useDispatch()
  const [isSharing, setIsSharing] = useState(props.isSharing)

  const sharePost = () => {
    mypage.sharePost(props.postId)
    .then(result => {
      if (result.data===0 || result.data===1) {
        community.detailPost(props.postId)
        .then(result => 
          dispatch(setDetailPost(result.data))
        )
      } else {
        alert('잘못된 접근입니다.')
      }
    })
  }

  const clickSharing = (type) => {
    if (type===1 && !isSharing) {
      setIsSharing(true)
      sharePost()
    }
    if (type===2 && isSharing) {
      setIsSharing(false)
      sharePost()
    }
  }

  return (
      <div>
        <div style={{backgroundColor: isSharing ? '#ffc036' : ''}} onClick={() => clickSharing(1)}>공유</div>
        <div style={{backgroundColor: !isSharing ? '#ffc036' : ''}} onClick={() => clickSharing(2)}>비공유</div>          
      </div>
    )
  }