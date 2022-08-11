import './Comments.css'

import { useDispatch, useSelector } from 'react-redux'

import community from '../../api/community'
import { setDetailComment } from '../../store/modules/community'

import Profile from '../User/Profile'


export default function Comments(props) {
    const currentUser = useSelector(state => state.currentUser)
    let dispatch = useDispatch()

    const clickDelete = () => {
        community.deleteComment(props.comment.postId, props.comment.id)
        .then(result => {
            if (result.data) {
                community.getComments(props.comment.postId)
                .then(result => {
                    dispatch(setDetailComment(result.data))
                })
            }
        })
    }
    
    
    return (
        <div className='each-comment'>
            <Profile user={props.comment} /> 
            <div className='each-comment-content'>
                <div className='each-comment-content-info'>
                    {props.comment.nickname} | {props.comment.time.slice(0, 10)} {props.comment.time.slice(11, 19)}
                    <span></span>
                    {
                        currentUser.nickname===props.comment.nickname ?
                        (<>
                        <button onClick={() => {props.setEditCommentId(props.comment.id)}}>편집</button>
                        |
                        <button onClick={() => clickDelete()}>삭제</button>
                        </>)
                        : null
                    }
                </div>
                <div className='normal-text'>
                    {props.comment.content}
                </div>
            </div>
        </div>
    )
  }