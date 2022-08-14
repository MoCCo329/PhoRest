import './Comments.css'

import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import community from './../../api/community'
import { setDetailComment } from './../../store/modules/community'

import ModalBasic from '../Utils/ModalBasic'

export default function CommentsNew(props) {
    // 모달용
    const [show, setShow] = useState(false)
    const [message, setMessage] = useState('')
    const handleClose = () => setShow(false)

    let dispatch = useDispatch()

    const [content, setContent] = useState('')
    const currentUser = useSelector(state => state.currentUser)
    const postId = useSelector(state => state.detailPost).id

    const changeShow = (msg) => {
        setShow((show) => {
            console.log('show', show)
            return !show
        })
        setMessage((message) => {
            return msg
        })
    }
    let msg = ''
    const clickAddComment = () => {
        props.setEditCommentId(0)

        if (!currentUser.username) {
            return alert('로그인 후 이용해주세요')
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
                })
            } else {
                switch ( result.data ) {
                    case 3 :     
                        alert('로그인 에러')
                        break    
                    case 4 :     
                        alert('삭제하려는 댓글은 존재하지 않는 댓글입니다')
                        break     
                    case 5:
                        // alert('작성한 내용이 없습니다')
                        msg = '작성한 내용이 없습니다'
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
            <textarea type='text' onChange={(e) => {setContent(e.target.value)}}></textarea>
            <button onClick={() => {clickAddComment()}}>작성</button>
            <button onClick={() => {props.setIsEditing(false)}}>취소</button>
            <ModalBasic
                show={show}
                onHide={handleClose}
                text={message}
            />
        </div>
    )
}