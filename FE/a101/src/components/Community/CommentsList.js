import { useSelector } from 'react-redux'

import Comments from './Comments'
import CommentsEdit from './CommentsEdit'

export default function CommentsList() {
    let editCommentId = useSelector(state => state.editCommentId)
    let dummyComments = useSelector(state => state.comments)

    // 댓글 리스트를 map으로 표시
    // currentUser와 댓글 username이 같으면 편집 아이콘 표시
    // 편집 아이콘 누를시 editCommentId 변화
    // map 돌리면서 editCommentId와 같으면 댓글 대신 댓글 편집창을 띄운다.

    return (
        <div>
            { dummyComments.map((comment, idx) => {
                if (editCommentId === comment.commentId) {
                    return <CommentsEdit comment={comment} idx={idx} key={idx}/>
                }
                return <Comments comment={comment} idx={idx} key={idx}/>
            })}
        </div>
    )
}