import Profile from '../components/Members/Profile.js'
import CommentsList from '../components/Community/CommentsList'
import CommentsNew from './../components/Community/CommentsNew'
import Frame from './../components/Community/Frame'
import Pic from './../components/Community/Pic'

import { useState } from 'react'
import { useParams } from 'react-router-dom'
// import { useSelector, useDispatch } from 'react-redux'


export default function Community(props) {

    let [isEditing, setIsEditing] = useState(false)
    let [isLike, setIsLike] = useState(false)  // 서버 내용을 redux로 저장하는식으로 바꿀예정
    let [isBookmark, setIsBookmark] = useState(false)
    const { postId } = useParams()
    // postId를 얻으면 해당 정보를 api로 요청
    // 데이터가 redux에 들어오면 표시
    const communityType = 'frame'

    // props 게시판 종류가 네컷이면 포즈가 있어야하며
    // 프레임이면 글표시랑 프레임 편집 링크

    // community-header 상단에 도착하면 고정시키기
    // community-comment를 style="overflow:scroll"

    return (
        <div>
            {/* <p className="community-title">{ communityType === 'frame' ? '프레임' : '사진'} { postId } 게시판</p> */}
            {postId} 게시판 detail
            <div className="community">
                <div className="community-header">
                    <Profile user={props.writer}/>
                    <box-icon type={isLike ? 'solid' : 'regular' } name='like' onClick={() => setIsLike(!isLike)}></box-icon>
                    <box-icon type={isBookmark ? 'solid' : 'regular'} name='bookmark-alt' onClick={() => {setIsBookmark(!isBookmark)}}></box-icon>
                    <box-icon name='message-square-dots' onClick={() => {setIsEditing(!isEditing)}}></box-icon>
                </div>
                <div className="community-body">
                    { communityType === "frame" ? <Frame/> : <Pic/> }
                </div>
                <div className="community-comment">
                    <CommentsList />
                    { isEditing ? <CommentsNew /> : null }
                </div>
            </div>
        </div>
    )
}