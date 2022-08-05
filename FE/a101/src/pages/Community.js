import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import './Community.css'
import Layout from '../components/Layout/Layout'
import Profile from '../components/Member/Profile.js'
import CommentsList from '../components/Community/CommentsList'
import CommentsNew from './../components/Community/CommentsNew'

// functions
import { setDetailPost } from '../store/modules/community'
import download from './../api/download'

export default function Community(props) {

    let [isEditing, setIsEditing] = useState(false)
    let [isLike, setIsLike] = useState(false)  // 서버 내용을 redux로 저장하는식으로 바꿀예정
    let [isBookmark, setIsBookmark] = useState(false)

    const dispatch = useDispatch()
    const { postId } = useParams()
    let content = useSelector(state => state.detailPost)

    if (!content || (content.postId !== postId)) {
        download.detailPost(postId)
        .then(result => result.data)
        .then(result => {
            // const copy = {
            //     postId: result.id,
            //     category: result.category,
            //     url: result.url,
            //     content: result.content,
            //     humanCount: result.human_count,
            //     time: result.time,
            // }
            dispatch(setDetailPost(result))
        })
    }

    useEffect(() => {
        return () => {dispatch(setDetailPost({}))}
    }, [])

    // props 게시판 종류가 네컷이면 포즈가 있어야하며
    // 프레임이면 글표시랑 프레임 편집 링크

    // community-header 상단에 도착하면 고정시키기
    // community-comment를 style="overflow:scroll"

    return (
        <Layout>
            <main>
                <h3 className="community-title">
                    { content.category === 'frame' ? '프레임' : '포즈'} 게시판
                    { content.category==='photogroup' ? <> ({content.humanCount}명)</> : null }
                </h3>
                <hr />
                <div className="community-body">
                    <h3>Content</h3>
                    <div className="community-header">
                        <div className='community-header-for-test'><Profile user={props.writer}/><div>분홍호랑이</div></div>
                        <div className='community-header-icons'>
                            <box-icon type={isLike ? 'solid' : 'regular' } name='like' onClick={() => setIsLike(!isLike)}></box-icon>
                            <box-icon type={isBookmark ? 'solid' : 'regular'} name='bookmark-alt' onClick={() => {setIsBookmark(!isBookmark)}}></box-icon>
                            <box-icon name='message-square-dots' onClick={() => {setIsEditing(!isEditing)}}></box-icon>
                        </div>
                    </div>
                    <div className="community-content">
                        <div>
                            <img src={content.url} alt={content.content} />
                        </div>
                        <div>
                            { content.category === "frame" ? content.content : null }
                        </div>
                    </div>
                </div>
                <hr />
                <div className="community-comment">
                    <h3>Comments</h3>
                    <CommentsList />
                    { isEditing ? <CommentsNew setIsEditing={setIsEditing} /> : null }
                </div>
            </main>
        </Layout>
    )
}