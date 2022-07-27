import { useState } from 'react'

import Comments from './Comments'
import CommentsEdit from './CommentsEdit'

export default function CommentsList() {
    const dummyComments = [
        {username: 'test1', content: 'testestesttes', commentId: 1, date: new Date()},
        {username: 'test2', content: 'testestesttes', commentId: 2, date: new Date()},
        {username: 'test3', content: 'testestesttes', commentId: 3, date: new Date()},
        {username: 'test4', content: 'testestesttes', commentId: 4, date: new Date()},
        {username: 'test5', content: 'testestesttes', commentId: 5, date: new Date()},
    ]

    let [editCommentId, setEditCommentId] = useState(1)


    // 댓글 리스트를 map으로 표시
    // currentUser와 댓글 username이 같으면 편집 아이콘 표시
    // 편집 아이콘 누를시 editCommentId 변화
    // map 돌리면서 editCommentId와 같으면 댓글 대신 댓글 편집창을 띄운다.

    return (
        <div>
            { dummyComments.map((comment, idx) => {
                if (editCommentId === comment.commentId) {
                    return <CommentsEdit comment={comment} key={idx}/>
                }
                return <Comments comment={comment} setEditCommentId={setEditCommentId} key={idx}/>
            })}
        </div>
    )
}