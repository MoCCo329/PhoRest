export default function Comments(props) {
    
    const changeEditCommentId = () => {
        return props.setEditCommentId(props.comment.commentId)
    }

    return (
        <div>
            여기는 Comments
            {props.comment.username}
            <button onClick={() => {changeEditCommentId()}}>편집하기</button>
        </div>
    )
  }