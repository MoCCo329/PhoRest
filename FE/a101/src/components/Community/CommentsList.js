import './Comments.css'

import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

import Comments from './Comments'
import CommentsEdit from './CommentsEdit'
import CommentsNew from './CommentsNew'

export default function CommentsList(props) {
    const commRef = useRef(null)

    const { isEditing, setIsEditing } = props
    let comments = useSelector(state => state.detailComments)
    
    const [editCommentId, setEditCommentId] = useState(0)

    // 댓글작성자랑 개시글작성자랑 같으면 배경색?

    useEffect(() => {
        if (commRef.current) {
            commRef.current.scrollIntoView({behavior: 'smooth'})
        }
      }, [])
    
    return (
        <div>
            <div className='comments-new'>
                {
                    isEditing ?
                    <CommentsNew setIsEditing={setIsEditing} setEditCommentId={setEditCommentId}></CommentsNew>
                    : null
                }
            </div>
            <div className='comments' ref={commRef}>
                { 
                    comments && comments.length ?
                    comments.map((comment, idx) => {
                        if (editCommentId === comment.id) {
                            return (
                            // <div ref={idx === comments.length - 1 ? commRef : null}>
                            <div>
                                <CommentsEdit comment={comment} key={comment.id} setEditCommentId={setEditCommentId}/>
                            </div>
                            )
                        }
                        return <Comments comment={comment} key={comment.id} setEditCommentId={setEditCommentId}/>
                    })
                    : <div className='normal-text'>댓글이 없습니다</div>
                }
            </div>
        </div>
    )
}