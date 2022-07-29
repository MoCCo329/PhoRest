import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addComment, setEditCommentId } from '../../store/community'

export default function CommentsNew(props) {
    const [content, setContent] = useState('')
    let dispatch = useDispatch()
    const clickAddComment = () => {
        dispatch(setEditCommentId(0))
        const comment = {
            username: 'test2',
            content: content,
            commentId : props.commentsLen,
            date: '서울시 여러분'
        }

    dispatch(addComment(comment))
    return props.setIsEditing(false)
    }

    return (
        <div>
            <input type='text' onChange={(e) => {setContent(e.target.value)}}></input> | 
            <button onClick={() => {clickAddComment()}}>작성</button>
        </div>
    )
}