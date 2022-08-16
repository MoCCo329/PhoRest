import './Comments.css'

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import community from './../../api/community'
import { setDetailComment } from './../../store/modules/community'

import ModalBasic from '../Utils/ModalBasic'
import ModalConfirm from '../Utils/ModalConfirm'
import { useNavigate } from 'react-router-dom'
import { set } from 'date-fns/esm'

export default function CommentsNew(props) {
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

    let dispatch = useDispatch()
    const navigate = useNavigate()

    const [content, setContent] = useState('')
    const currentUser = useSelector(state => state.currentUser)
    const postId = useSelector(state => state.detailPost).id

    const changeContent = (e) => {
        const copy = e.target.value.slice(0, 255)
        e.target.value = copy
        setContent(copy)
    }

    const clickAddComment = () => {
        props.setEditCommentId(0)

        if (!currentUser.username) {
            msg = '로그인 후 댓글 작성이 가능합니다. 로그인 하시겠습니까?'
            todo = '로그인'
            setModal(msg, todo)
            return
        }

        const comment = {
            content: content
        }

        community.createComment(postId, comment)
        .then(result => {
            if (!result.data) {
                community.getComments(postId)
                .then(result => {
                    dispatch(setDetailComment(result.data))
                    props.setIsEditing(false)
                    window.scrollTo({top:document.body.scrollHeight, behavior: "smooth"})
                })
            } else {
                switch ( result.data ) {
                    case 3 :     
                        msg = '로그인 정보가 정확하지 않습니다. 다시 로그인 해주세요'
                        changeShow(msg)
                        break    
                    case 4 :     
                        msg = '삭제하려는 댓글은 존재하지 않는 댓글입니다'
                        changeShow(msg)
                        break     
                    case 5:
                        msg = '작성한 내용이 없습니다'
                        changeShow(msg)
                        break
                    case 6:
                        msg = '글자수는 최대 255글자를 넘을 수 없습니다.'
                        changeShow(msg)
                        break
                    default :    
                        break
                }
            }
        })
        // return props.setIsEditing(false)
    }

    return (
        <div className='comment-new'>
            <textarea type='text' onChange={(e) => changeContent(e)}></textarea>
            <div className='comment-info'>
                <div>
                    <button onClick={() => {clickAddComment()}}>작성</button>
                    <button onClick={() => {props.setIsEditing(false)}}>취소</button>
                </div>
                <div>{`${content.length} / 255`}</div>
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