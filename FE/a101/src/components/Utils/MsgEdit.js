import { useState } from 'react'

import download from './../../api/s3'

import ModalBasic from '../Utils/ModalBasic'
import ModalConfirm from '../Utils/ModalConfirm'
import { useNavigate } from 'react-router-dom'


export default function MsgEdit (props) {
  // 모달용
  const [showBasic, setShowBasic] = useState(false)
  let msg = ''
  const [message, setMessage] = useState('')
  // 모달용 함수
  const handleCloseBasic = () => setShowBasic(false)
  const changeShow = (msg) => {
    setShowBasic((showBasic) => {
      return !showBasic
    })
    setMessage(msg)
  }
  // 모달용 변수 - confirm
  const [show, setShow] = useState(false)
  let todo = ''
  const [toDo, setToDo] = useState('')
  // 모달용 함수 - confirm
  const handleClose = () => setShow(false)
  const setModal = (msg, todo) => {
    setShow((show) => {
        return !show
    })
    setMessage(msg)
    setToDo(todo)
  }

  const navigate = useNavigate()

  const [content, setContent] = useState('')
  const changeContent = (e) => {
    const copy = e.target.value.slice(0, 100)
    e.target.value = copy
    setContent(copy)
  }

  const clickEditMessage = () => {
    if (!content) {
      return alert('글을 입력해 주세요')
    }

    const data = { content }
    download.msgEdit(props.postId, data)
    .then(result => {
      if (!result.data) {
        msg = '메시지가 미래로 보내졌습니다'
        changeShow(msg)
        props.setIsEditing(false)
      } else {
        switch ( result.data ) {
          case 1 :
            msg = '회원 정보가 바르지 않습니다'
            changeShow(msg)
            break
          case 2 :
            msg = '회원 정보가 바르지 않습니다'
            changeShow(msg)
            break
          case 4 :
            msg = '새로고침 후 이용해 주세요'
            changeShow(msg)
            break
          case 5:
            msg = '존재하지 않는 개시글입니다'
            changeShow(msg)
            break
          case 6:
            msg = '글자수는 100글자를 넘을 수 없습니다'
            changeShow(msg)
            break
          case 7:
            msg = '작성한 내용이 없습니다'
            changeShow(msg)
            break
          default :
              break
        }
      }
    })
  }


  return (
    <div className='msg-edit'>
      <textarea type='text' onChange={(e) => changeContent(e)}></textarea>
      <div className='comment-info'>
        <div>
            <button className="post-division" onClick={() => {clickEditMessage()}}>작성</button>
            <button className="post-division" onClick={() => {props.setIsEditing(false)}}>취소</button>
        </div>
        <div>{`${content.length} / 100`}</div>
      </div>

      <ModalBasic
        show={showBasic}
        onHide={handleCloseBasic}
        text={message}
      />
      <ModalConfirm
        show={show}
        onHide={handleClose}
        text={message}
        action={() => navigate('/login')}
        todo={toDo}
      />
    </div>
  )
}