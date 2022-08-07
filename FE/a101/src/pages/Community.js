import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import './Community.css'
import Layout from '../components/Layout/Layout'
import Profile from '../components/User/Profile.js'
import CommentsList from '../components/Community/CommentsList'
import SharePost from '../components/Community/SharePost'

// functions
import { setDetailPost, setDetailComment, likeDetailPost, bookmarkDetailPost } from '../store/modules/community'
import community from './../api/community'

export default function Community(props) {

    const postId = (Number(atob(useParams().postId)) - 37) / 73
    const dispatch = useDispatch()

    const [isEditing, setIsEditing] = useState(false)
    const [isWriter, setIsWriter] = useState(false)
    const [isSharing, setIsSharing] = useState(false)

    const content = useSelector(state => state.detailPost)
    const currentUser = useSelector(state => state.currentUser)

    useEffect(() => {
        if (!content || (content.id !== postId)) {
            community.detailPost(postId)
            .then(result => 
                dispatch(setDetailPost(result.data))
            )

            community.getComments(postId)
            .then(result => {
                dispatch(setDetailComment(result.data))
            })
        }
    })

    useEffect(() => {
        if (content.users) {
            setIsSharing(
                content.users.some((user) => {
                    return user.username===currentUser.username
                })
            )
            setIsWriter(content.isWriter)
        }

    }, [content, currentUser.username])

    useEffect(() => {
        return () => {
            dispatch(setDetailPost({}))
            dispatch(setDetailComment([]))
        }
    }, [])

    // 프레임이면 글표시랑 프레임 편집 링크

    // community-header 상단에 도착하면 고정시키기
    // community-comment를 style="overflow:scroll"

    const clickLike = () => {
        community.likePost(postId)
        .then(result => {
            if (result.data===1) {
                dispatch(likeDetailPost(true))
            } else if (result.data===0) {
                dispatch(likeDetailPost(false))
            } else {
                alert('로그인 후 좋아요가 가능합니다')
            }
        })
    }

    const clickBookmark = () => {
        community.bookmarkPost(postId)
        .then(result => {
            if (result.data===1) {
                dispatch(bookmarkDetailPost(true))
            } else if (result.data===0) {
                dispatch(bookmarkDetailPost(false))
            } else {
                alert('로그인 후 북마크가 가능합니다')
            }
        })
    }

    return (
        <Layout>
            <main>
                <div className="community-header">
                    { content.category === 'frame' ? '프레임' : '포즈'} 게시판
                    { content.category==='photogroup' ? <div className='human-count'>{content.humanCount}명</div> : null }
                </div>
                <hr />
                <h3>Content</h3>
                <div className="community-body">
                    <div className="community-body-meta">
                        <div className='community-body-profiles'>
                        {
                            content.users ?
                            content.users.map((user) => 
                                <div className='community-body-for-test' key={user.username}><Profile user={user}/></div>
                            ) : <div>게시글을 공유한 사람이 없습니다. 첫 공유의 주인공이 되어주세요</div>
                        }
                        </div>
                        <div>
                            {
                                isWriter ?
                                <SharePost isSharing={isSharing} postId={content.postId} ></SharePost> : null
                            }
                        </div>
                        <div className='community-body-icons'>
                            {
                                !isWriter ?
                                <div>
                                    <box-icon type={content.isLike ? 'solid' : 'regular' } name='like' onClick={() => clickLike()}></box-icon>
                                    <box-icon type={content.isBookmark ? 'solid' : 'regular'} name='bookmark-alt' onClick={() => clickBookmark()}></box-icon>
                                </div> : null
                            }
                            <box-icon type={isEditing ? 'solid' : 'regular'} name='message-square-dots' onClick={() => {setIsEditing(!isEditing)}}></box-icon>
                        </div>
                        {
                            content.category==="photogroup" ?
                            <button>사진에 쓰인 프레임 보러가기(미완)</button> : null
                        }
                    </div>
                    <div className="community-body-content">
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
                    <CommentsList isEditing={isEditing} setIsEditing={setIsEditing} />
                </div>
            </main>
        </Layout>
    )
}