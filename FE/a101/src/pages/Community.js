import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import './Community.css'
import Layout from '../components/Layout/Layout'
import Profile from '../components/User/Profile.js'
import CommentsList from '../components/Community/CommentsList'
import SharePost from '../components/Community/SharePost'

// functions
import { setDetailPost, setDetailComment } from '../store/modules/community'
import community from './../api/community'

// icons
import likeFilled from '../assets/UI/heart_filled.png'
import likeEmpty from '../assets/UI/heart_empty.png'
import bookmarkFilled from '../assets/UI/bookmark_filled.png'
import bookmarkEmpty from '../assets/UI/bookmark_empty.png'

export default function Community(props) {
    const postId = (Number(atob(useParams().postId)) - 37) / 73
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [isEditing, setIsEditing] = useState(false)
    const [isWriter, setIsWriter] = useState(false)
    const [isSharing, setIsSharing] = useState(false)

    const detailPost = useSelector(state => state.detailPost)
    const currentUser = useSelector(state => state.currentUser)

    useEffect(() => {
        community.detailPost(postId)
        .then(result => {
            dispatch(setDetailPost(result.data))
        }            
        )
        community.getComments(postId)
        .then(result => {
            dispatch(setDetailComment(result.data))
        })
    }, [])

    useEffect(() => {
        community.detailPost(postId)
        .then(result => {
            dispatch(setDetailPost(result.data))
        })
    }, [!!detailPost])

    useEffect(() => {
        if (detailPost.users) {
            setIsSharing(
                detailPost.users.some((user) => {
                    return user.username===currentUser.username
                })
            )
        }
        setIsWriter(detailPost.isWriter)
    }, [detailPost, currentUser])

    useEffect(() => {
        return () => {
            dispatch(setDetailPost({}))
            dispatch(setDetailComment([]))
        }
    }, [])

    // 프레임이면 글표시랑 프레임 편집 링크

    // community-header 상단에 도착하면 고정시키기
    // community-comment를 style="overflow:scroll"

    const likePost = (postId) => {
        if (!currentUser.username) {
          return alert('로그인 후 좋아요가 가능합니다')
        }
        community.likePost(postId)
        .then(result => {
            dispatch(setDetailPost(result.data))
        })
      }

      const bookmarkPost = (postId) => {
        if (!currentUser.username) {
          return alert('로그인 후 좋아요가 가능합니다')
        }
        community.bookmarkPost(postId)
        .then(result => {
            dispatch(setDetailPost(result.data))
        })
      }

    const deletePost = () => {
        let confirmResult = false
        if (detailPost.category==='photogroup') {
            confirmResult = window.confirm('포즈게시글 소유권을 삭제합니다.')
        } else {
            confirmResult = window.confirm('프레임게시글을 삭제합니다.')
        }

        if (confirmResult) {
            community.deletePost(postId)
            .then(result => {
                if (result.data===0) {
                    community.detailPost(postId)
                    .then(result => 
                        dispatch(setDetailPost(result.data))
                    )
                } else {
                    alert('잘못된 접근입니다.')
                }
            })
        }
    }

    
    return (
        <Layout>
            <main>
                <div className="community-header">
                    { detailPost.category==='frame' ? '프레임' : null }{ detailPost.category === 'photogroup' ? '포즈' : null } 게시판
                    { detailPost.category==='photogroup' ? <div className='human-count'>{detailPost.humanCount}명</div> : null }
                    { detailPost.frameId ? <div className='frame-id'>프레임 ID : {detailPost.frameId}</div> : null }
                </div>
                <hr />
                <h3>Content</h3>
                <div className="community-body">
                    <div className="community-body-meta">
                        <div className='community-body-profiles'>
                        {
                            detailPost.users ?
                            detailPost.users.map((user) => 
                                <div className='community-body-for-test' key={user.username}><Profile user={user}/></div>
                            ) : <div>게시글을 공유한 사람이 없습니다. 첫 공유의 주인공이 되어주세요</div>
                        }
                        </div>
                        <div className='community-share'>
                            {
                                isWriter && detailPost.category!=='frame' ?
                                <SharePost isSharing={isSharing} postId={detailPost.id} ></SharePost> : null
                            }
                        </div>
                        <div className='community-delete'>
                            {
                                isWriter ?
                                <div onClick={() => deletePost()}>내 게시글에서 삭제하기</div> : null
                            }
                        </div>
                        <div className='community-body-icons'>
                            <img className='icon-img' src={detailPost.isLike ? likeFilled : likeEmpty } alt='like' name='like' onClick={() => likePost(postId)}></img>
                            {detailPost.likeCount}
                            <img className='icon-img' src={detailPost.isBookmark ? bookmarkFilled : bookmarkEmpty} alt='bookmark' name='bookmark-alt' onClick={() => bookmarkPost(postId)}></img>
                            <box-icon type={isEditing ? 'solid' : 'regular'} name='message-square-dots' onClick={() => {setIsEditing(!isEditing)}}></box-icon>
                        </div>
                        {
                            isWriter && detailPost.category==='frame' ?
                            <div onClick={() => navigate(`/community/edit/${btoa((postId) * 73 + 37)}`)}>프레임 편집하기</div> : null
                        }
                    </div>
                    <div className="community-body-content">
                        <div>
                            <img src={detailPost.url} alt={detailPost.content} />
                        </div>
                        <div>
                            { detailPost.category === "frame" ? detailPost.content : null }
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