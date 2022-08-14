import './Comments.css'

import { useState } from 'react'
import { useDispatch } from 'react-redux'

import community from '../../api/community'
import ModalConfirm from '../Utils/ModalConfirm'
import { setDetailComment} from '../../store/modules/community'

export default function CommentsEdit(props) {
    let dispatch = useDispatch()

    const [content, setContent] = useState(props.comment.content)
    const { comment } = props
    
    // 모달용 변수
    const [show, setShow] = useState(false)
    let msg = ''
    const [message, setMessage] = useState('')
    let todo = ''
    const [toDo, setToDo] = useState('')
    const handleClose = () => setShow(false)
    // 모달용 함수
    const setModal = (msg, todo) => {
        setShow((show) => {
            return !show
        })
        setMessage(msg)
        setToDo(todo)
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
                alert('잘못된 접근입니다')
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

            // const confirmResult = confirm
            // if (confirmResult) {
            //     community.deleteComment(comment.postId, comment.id)
            //     .then(result => {
            //         if (result.data) {
            //             community.getComments(comment.postId)
            //             .then(result => {
            //                 dispatch(setDetailComment(result.data))
            //             })
            //         } else {
            //             alert('잘못된 접근입니다')
            //         }
            //     })

            //     return props.setEditCommentId(0)
            // } else {
            //     return
            // }
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
        </div>
    )
}