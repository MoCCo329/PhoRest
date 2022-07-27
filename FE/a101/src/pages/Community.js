import Profile from './../components/Members/Profile'
import Comment from './../components/Community/Comment'
import CommentEdit from './../components/Community/CommentEdit'
import Frame from './../components/Community/Frame'
import Pic from './../components/Community/Pic'

import { useState } from 'react'


export default function Community(props) {

    let [isEditing, setIsEditing] = useState(false)
    let [isLike, setIsLike] = useState(false)  // 서버 내용을 redux로 저장하는식으로 바꿀예정
    let [isBookmark, setIsBookmark] = useState(false)
    const { communityType } = props

    return (
        // props 게시판 종류가 네컷이면 포즈가 있어야하며
        // 프레임이면 글표시랑 프레임 편집 링크

        <div>
            <p className="community-title">{communityType} 게시판</p>
            <div className="community">
                <div className="community-header"> {/* 상단에 도착하면 고정 */}
                    <Profile user={props.writer}/>
                    { isLike ?
                        <box-icon type='solid' name='like' onClick={() => {setIsLike(!isLike)}}></box-icon>
                        : <box-icon name='like' onClick={() => {setIsLike(!isLike)}}></box-icon>}
                    { isBookmark ?
                        <box-icon type='solid' name='bookmark-alt' onClick={() => {setIsBookmark(!isBookmark)}}></box-icon>
                        : <box-icon name='bookmark-alt' onClick={() => {setIsBookmark(!isBookmark)}}></box-icon> }
                    <box-icon name='message-square-dots' onClick={() => {setIsEditing(!isEditing)}}></box-icon>
                </div>
                <div className="community-body">
                    { communityType === "frame" ? <Frame/> : <Pic/> }
                </div>
                <div className="community-comment"> {/* style="overflow:scroll" */}
                    <Comment />
                    { isEditing ? <CommentEdit /> : null }
                </div>
            </div>
        </div>
    )
}