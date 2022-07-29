import { useDispatch } from 'react-redux'
import { deleteComment, setEditCommentId } from '../../store/community'

export default function Comments(props) {
    // const changeEditCommentId = () => {
    //     return props.setEditCommentId(props.comment.commentId)
    // }
    const username = 'test2'
    let dispatch = useDispatch()

    return (
        <div>
            댓글 작성자 : {props.comment.username} | 
            댓글 내용 : {props.comment.content} | 
            {
                username===props.comment.username ?
                (<>
                <button onClick={() => {dispatch(setEditCommentId(props.comment.commentId))}}>편집</button>
                <button onClick={() => {dispatch(deleteComment(props.idx))}}>삭제</button>
                </>)
                : null
            }
        </div>
    )
  }