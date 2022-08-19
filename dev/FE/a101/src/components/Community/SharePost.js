import './SharePost.css'

import { useState } from 'react'
import { useDispatch } from 'react-redux'

import mypage from '../../api/mypage'
import community from '../../api/community'
import ModalBasic from '../Utils/ModalBasic'

import { setDetailPost } from '../../store/modules/community'


export default function Comments(props) {
  const dispatch = useDispatch()
  const [isSharing, setIsSharing] = useState(props.isSharing)

  // 모달용 변수 - basic
  const [showBasic, setShowBasic] = useState(false)
  let msg = ''
  const [message, setMessage] = useState('')
  // 모달용 함수 - basic
  const handleCloseBasic = () => setShowBasic(false)
  const setModalBasic = (msg) => {
      setShowBasic((showBasic) => {
          return !showBasic
      })
      setMessage(msg)
  }

  const sharePost = () => {
    mypage.sharePost(props.postId)
    .then(result => {
      if (result.data===0 || result.data===1) {
        community.detailPost(props.postId)
        .then(result => 
          dispatch(setDetailPost(result.data))
        )
      } else {
        msg = '잘못된 접근입니다'
        setModalBasic(msg)
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
      <div className='share-post-edit'>
        <div style={{backgroundColor: isSharing ? '#ffc036' : ''}} onClick={() => clickSharing(1)}>공유</div>
        <div style={{backgroundColor: !isSharing ? '#ffc036' : ''}} onClick={() => clickSharing(2)}>비공유</div>
        <ModalBasic
          show={showBasic}
          onHide={handleCloseBasic}
          text={message}
        />          
      </div>
    )
  }