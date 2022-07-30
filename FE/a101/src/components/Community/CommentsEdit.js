import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { editComment, deleteComment, setEditCommentId } from '../../store/modules/community'

export default function CommentsEdit(props) {
    const [content, setContent] = useState(props.comment.content)
    let dispatch = useDispatch()

    const clickEditComment = () => {
        if (content==='') {
            const confirmResult = window.confirm('댓글 내용이 없습니다. 댓글을 삭제하시겠습니까?')
            if (confirmResult) {
                dispatch(deleteComment(props.idx))
            }
        }
        const comment = {
            username: props.comment.username,
            content: content,
            commentId: props.comment.commentId,
            date: '서울시 여러분'
        }
        const idx = props.idx
        dispatch(editComment({comment, idx}))
        return dispatch(setEditCommentId(0))
    }
    const cancelEdit = () => {
        return dispatch(setEditCommentId(0))
    }
    
    // 댓글작성자랑 개시글작성자랑 같으면 배경색?
    return (
        <div>
            댓글 작성자 : {props.comment.username} |
            댓글 내용 : <input type='text' onChange={(e) => {setContent(e.target.value)}} value={content}></input> | 
            <button onClick={() => {clickEditComment()}}>수정</button>
            <button onClick={() => {cancelEdit()}}>취소</button>
        </div>
    )
}