import { useState } from 'react'
import { useDispatch } from 'react-redux'


import community from '../../api/community'
import { setDetailComment} from '../../store/modules/community'

export default function CommentsEdit(props) {
    let dispatch = useDispatch()

    const [content, setContent] = useState(props.comment.content)
    const { comment } = props

    const clickEditComment = () => {
        if (content==='') {
            const confirmResult = window.confirm('댓글 내용이 없습니다. 댓글을 삭제하시겠습니까?')
            if (confirmResult) {
                
                community.deleteComment(comment.postId, comment.id)
                .then(result => {
                    if (result.data) {
                        community.getComments(comment.postId)
                        .then(result => {
                            dispatch(setDetailComment(result.data))
                        })
                    } else {
                        alert('잘못된 접근입니다')
                    }
                })

                return props.setEditCommentId(0)
            } else {
                return
            }
        }

        const newComment = {
            content: content
        }

        community.editComment(comment.postId, comment.id, newComment)
        .then(result => {
            community.getComments(comment.postId)
            .then(result => {
                dispatch(setDetailComment(result.data))
            })
        })

        return props.setEditCommentId(0)
    }

    return (
        <div>
            댓글 작성자 : {props.comment.nickname} |
            댓글 내용 : <input type='text' onChange={(e) => {setContent(e.target.value)}} value={content}></input> | 
            <button onClick={() => clickEditComment()}>수정</button>
            <button onClick={() => props.setEditCommentId(0)}>취소</button>
        </div>
    )
}