import Profile from '../components/Members/Profile.js'
import CommentsList from '../components/Community/CommentsList'
import CommentsNew from './../components/Community/CommentsNew'

import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import p1 from './../assets/1.png'
import p2 from './../assets/2.png'
import p3 from './../assets/3.png'
import p4 from './../assets/4.png'
import p5 from './../assets/5.png'


export default function Community(props) {

    let [isEditing, setIsEditing] = useState(false)
    let [isLike, setIsLike] = useState(false)  // 서버 내용을 redux로 저장하는식으로 바꿀예정
    let [isBookmark, setIsBookmark] = useState(false)
    let commentsLen = useSelector(state => state.comments).length + 1
    const dummyContents = [
        {
          category: 'pic',
          date: new Date(),
          frameId: 1,
          postId: 1,
          content: 'content of 1',
          url: p1,
          peopleNum: 1
        },
        {
          category: 'frame',
          date: new Date(),
          frameId: 2,
          postId: 2,
          content: 'content of 2',
          url: p2,
          peopleNum: 1
        },
        {
          category: 'frame',
          date: new Date(),
          frameId: 3,
          postId: 3,
          content: 'content of 3',
          url: p3,
          peopleNum: 1
        },
        {
          category: 'frame',
          date: new Date(),
          frameId: 4,
          postId: 4,
          content: 'content of 4',
          url: p4,
          peopleNum: 2
        },
        {
          category: 'frame',
          date: new Date(),
          frameId: 5,
          postId: 5,
          content: 'content of 5',
          url: p5,
          peopleNum: 2
        },
    ]

    const { postId } = useParams()
    const content = dummyContents[postId - 1]
    // postId를 얻으면 해당 정보를 api로 요청
    // 데이터가 redux에 들어오면 표시

    // props 게시판 종류가 네컷이면 포즈가 있어야하며
    // 프레임이면 글표시랑 프레임 편집 링크

    // community-header 상단에 도착하면 고정시키기
    // community-comment를 style="overflow:scroll"

    return (
        <div>
            <p className="community-title">{ content.category === 'frame' ? '프레임' : '사진'} { postId } 게시판 (더미파일이라 게시판 구분 없음)</p>

            <div className="community">
                <hr></hr>
                <div className="community-header">
                    <Profile user={props.writer}/>
                    { content.category==='pic' ? <div>{content.peopleNum}명</div> : null }
                    <box-icon type={isLike ? 'solid' : 'regular' } name='like' onClick={() => setIsLike(!isLike)}></box-icon>
                    <box-icon type={isBookmark ? 'solid' : 'regular'} name='bookmark-alt' onClick={() => {setIsBookmark(!isBookmark)}}></box-icon>
                    <box-icon name='message-square-dots' onClick={() => {setIsEditing(!isEditing)}}></box-icon>
                </div>
                <hr></hr>
                <div className="community-body">
                    <div>
                        <img src={content.url} alt={content.content} />
                    </div>
                    <div>
                        { content.category === "frame" ? content.content : null }
                    </div>
                </div>
                <hr></hr>
                <div className="community-comment">
                    <CommentsList />
                    { isEditing ? <CommentsNew commentsLen={commentsLen} setIsEditing={setIsEditing} /> : null }
                </div>
            </div>
        </div>
    )
}