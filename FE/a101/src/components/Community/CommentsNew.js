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
                alert('잘못된 접근입니다')
            }
        })
        return props.setIsEditing(false)
    }

    return (
        <div>
            <input type='text' onChange={(e) => {setContent(e.target.value)}}></input> | 
            <button onClick={() => {clickAddComment()}}>작성</button> |
            <button onClick={() => {props.setIsEditing(false)}}>취소</button>
        </div>
    )
}