import './Comments.css'

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import community from './../../api/community'
import { setDetailComment } from './../../store/modules/community'

export default function CommentsNew(props) {
    let dispatch = useDispatch()

    const [content, setContent] = useState('')
    const currentUser = useSelector(state => state.currentUser)
    const postId = useSelector(state => state.detailPost).id

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
                })
            } else {
                switch ( result.data )
                {
                  case 3 :     
                    alert('로그인 에러')
                    break;     
                  case 4 :     
                    alert('삭제하려는 댓글은 존재하지 않는 댓글입니다')
                    break;     
                
                  default :    
                    alert('내용을 적어야만 작성가능합니다')
                }
            }
        })

        return props.setIsEditing(false)
    }

    return (
        <div className='comment-new'>
            <textarea type='text' onChange={(e) => {setContent(e.target.value)}}></textarea>
            <button onClick={() => {clickAddComment()}}>작성</button>
            <button onClick={() => {props.setIsEditing(false)}}>취소</button>
        </div>
    )
}