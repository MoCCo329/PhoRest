import './Comments.css'

import { useState } from 'react'
import { useDispatch } from 'react-redux'

import community from '../../api/community'
import ModalConfirm from '../Utils/ModalConfirm'
import ModalBasic from '../Utils/ModalBasic'

import { setDetailComment} from '../../store/modules/community'

export default function CommentsEdit(props) {
    let dispatch = useDispatch()

    const [content, setContent] = useState(props.comment.content)
    const { comment } = props
    
    // 모달용 변수 - confirm
    const [show, setShow] = useState(false)
    let msg = ''
    const [message, setMessage] = useState('')
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
    // 모달용 변수 - basic
    const [showBasic, setShowBasic] = useState(false)
    // 모달용 함수 - basic
    const handleCloseBasic = () => setShowBasic(false)
    const setModalBasic = (msg) => {
        setShowBasic((showBasic) => {
            return !showBasic
        })
        setMessage(msg)
    }
    const deleteConfirmed = () => {
        community.deleteComment(comment.postId, comment.id)
        .then(result => {
            if (result.data) {
                community.getComments(comment.postId)
                .then(result => {
                    dispatch(setDetailComment(result.data))
                })
            } else {
                msg = '잘못된 접근입니다'
                setModalBasic(msg)
            }
        })

        return props.setEditCommentId(0)
    }

    const clickEditComment = () => {
        if (content==='') {
            // const confirmResult = window.confirm('댓글 내용이 없습니다. 댓글을 삭제하시겠습니까?')
            msg = '댓글 내용이 없습니다. 댓글을 삭제하시겠습니까?'
            todo = '삭제'
            setModal(msg, todo)
            return
        }

        const newComment = {
            content: content
        }

        community.editComment(comment.postId, comment.id, newComment)
        .then(result => {
            community.getComments(comment.postId)
            .then(result => {
                dispatch(setDetailComment(result.data))
            })
        })

        return props.setEditCommentId(0)
    }

    return (
        <div className='comment-edit'>
            댓글 작성자 : {props.comment.nickname} |
            댓글 내용 : <textarea type='text' onChange={(e) => {setContent(e.target.value)}} value={content}></textarea> 
            <button onClick={() => clickEditComment()}>수정</button>
            <button onClick={() => props.setEditCommentId(0)}>취소</button>
            <ModalConfirm
                show={show}
                onHide={handleClose}
                text={message}
                action={deleteConfirmed}
                todo={toDo}
            />
            <ModalBasic
                show={showBasic}
                onHide={handleCloseBasic}
                text={message}
            />
        </div>
    )
}