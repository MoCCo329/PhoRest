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
            if (!result.data) {
                community.getComments(comment.postId)
                .then(result => {
                    dispatch(setDetailComment(result.data))
                })
            } else {
                switch ( result.data ) {
                    case 1 :     
                        msg = '로그인한 계정과 댓글 작성자가 다릅니다.'
                        setModalBasic(msg)
                        break    
                    case 2 :     
                        msg = '삭제하려는 댓글은 존재하지 않는 댓글입니다'
                        setModalBasic(msg)
                        break    
                    case 3 :     
                        msg = '로그인 정보가 정확하지 않습니다. 다시 로그인 해주세요'
                        setModalBasic(msg)
                        break    
                    case 4 :     
                        msg = '삭제하려는 댓글은 존재하지 않는 댓글입니다'
                        setModalBasic(msg)
                        break     
                    case 5:
                        msg = '작성한 내용이 없습니다'
                        setModalBasic(msg)
                        break
                    case 6:
                        msg = '글자수는 최대 255글자를 넘을 수 없습니다.'
                        setModalBasic(msg)
                        break
                    default :    
                        break
                }
            }
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