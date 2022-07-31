import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addComment, setEditCommentId } from '../../store/modules/community'

export default function CommentsNew(props) {
    const [content, setContent] = useState('')
    let dispatch = useDispatch()
    let commentsLen = useSelector(state => state.comments).length + 1
    const clickAddComment = () => {
        dispatch(setEditCommentId(0))
        const comment = {
            username: '초록물고기',
            content: content,
            commentId : commentsLen,
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