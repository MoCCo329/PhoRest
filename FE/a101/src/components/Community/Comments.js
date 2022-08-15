import './Comments.css'

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import community from '../../api/community'
import { setDetailComment } from '../../store/modules/community'

import Profile from '../User/Profile'
import ModalConfirm from '../Utils/ModalConfirm'

import moment from 'moment'

export default function Comments(props) {
    const currentUser = useSelector(state => state.currentUser)
    let dispatch = useDispatch()

    // 모달용 변수
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    let msg = '정말로 삭제하시겠습니까?'
    let todo = '삭제'
    // 모달용 함수
    const setModal = () => {
        setShow((show) => {
            return !show
        })
    }

    const deleteConfirmed = () => {
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

    const clickDelete = () => {
        setModal()
    }
    
    const changeToDate= (datetime) => {
        let now = moment(new Date())
        let duration = moment.duration(now.diff(datetime))
        // const date = moment(datetime).format('YYYY년 MM월 DD일')
        let minute = duration.asMinutes()
        let hours = duration.asHours()
        let days = duration.asDays()
        let weeks = duration.asWeeks()
        let month = duration.asMonths()
        if (hours < 1) {
            return parseInt(minute) + '분 전'
        } else if (hours < 24) {
            return parseInt(hours) + '시간 전'
        } else if (weeks < 1) {
            return parseInt(days) + '일 전'
        } else if (month < 1) {
            return parseInt(weeks) + '주 전'
        } else {
            return parseInt(month) + '달 전'
        }
    }
    
    return (
        <div className='each-comment'>
            <Profile user={props.comment} /> 
            <div className='each-comment-content'>
                <div className='each-comment-content-info'>
                    {props.comment.nickname} | {changeToDate(props.comment.time)}
                    <span></span>
                    {
                        currentUser.username===props.comment.username ?
                        (<>
                        <button onClick={() => {props.setEditCommentId(props.comment.id)}}>편집</button>
                        |
                        <button onClick={() => clickDelete()}>삭제</button>
                        </>)
                        : null
                    }
                </div>
                <div className='normal-text'>
                    <p style={{"whiteSpace": "pre-line"}}>{props.comment.content}</p>
                </div>
            </div>
            <ModalConfirm
                show={show}
                onHide={handleClose}
                text={msg}
                action={deleteConfirmed}
                todo={todo}
            />
        </div>
    )
  }  // .replaceAll(/<br>|<brV>|<br V>/g, '\r\n')