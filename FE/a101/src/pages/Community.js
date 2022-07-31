import Profile from '../components/Members/Profile.js'
import CommentsList from '../components/Community/CommentsList'
import CommentsNew from './../components/Community/CommentsNew'

import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'


export default function Community(props) {

    let [isEditing, setIsEditing] = useState(false)
    let [isLike, setIsLike] = useState(false)  // 서버 내용을 redux로 저장하는식으로 바꿀예정
    let [isBookmark, setIsBookmark] = useState(false)

    const { postId } = useParams()
    useEffect(() => {
      // return // pic actions실행해서 content변경
    })

    let content = useSelector(state => state.pic)

    // props 게시판 종류가 네컷이면 포즈가 있어야하며
    // 프레임이면 글표시랑 프레임 편집 링크

    // community-header 상단에 도착하면 고정시키기
    // community-comment를 style="overflow:scroll"

    return (
        <div>
            <p className="community-title">{ content.category === 'frame' ? '프레임' : '사진'} { postId } 게시판 (더미파일이라 게시판 구분 없음)</p>

            <div className="community">
                <hr />
                <div className="community-header">
                    <Profile user={props.writer}/>
                    { content.category==='pic' ? <div>{content.peopleNum}명</div> : null }
                    <box-icon type={isLike ? 'solid' : 'regular' } name='like' onClick={() => setIsLike(!isLike)}></box-icon>
                    <box-icon type={isBookmark ? 'solid' : 'regular'} name='bookmark-alt' onClick={() => {setIsBookmark(!isBookmark)}}></box-icon>
                    <box-icon name='message-square-dots' onClick={() => {setIsEditing(!isEditing)}}></box-icon>
                </div>
                <hr />
                <div className="community-body">
                    <div>
                        <img src={content.url} alt={content.content} />
                    </div>
                    <div>
                        { content.category === "frame" ? content.content : null }
                    </div>
                </div>
                <hr />
                <div className="community-comment">
                    <CommentsList />
                    { isEditing ? <CommentsNew setIsEditing={setIsEditing} /> : null }
                </div>
            </div>
        </div>
    )
}