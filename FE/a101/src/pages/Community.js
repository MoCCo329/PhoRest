import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import './Community.css'
import Layout from '../components/Layout/Layout'
import Profile from '../components/User/Profile.js'
import CommentsList from '../components/Community/CommentsList'
import SharePost from '../components/Community/SharePost'
import FloatBtn from '../components/Utils/FloatingBtn'

// functions
import { setDetailPost, setDetailComment } from '../store/modules/community'
import community from './../api/community'
import ModalConfirm from '../components/Utils/ModalConfirm'
import ModalBasic from '../components/Utils/ModalBasic'

// icons
import likeFilled from '../assets/UI/heart_filled.png'
import likeEmpty from '../assets/UI/heart_empty.png'
import bookmarkFilled from '../assets/UI/bookmark_filled.png'
import bookmarkEmpty from '../assets/UI/bookmark_empty.png'

//external library
import moment from 'moment'

export default function Community(props) {
    const postId = (Number(atob(useParams().postId)) - 37) / 73
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [isEditing, setIsEditing] = useState(false)
    const [isWriter, setIsWriter] = useState(false)
    const [isSharing, setIsSharing] = useState(false)

    const detailPost = useSelector(state => state.detailPost)
    const currentUser = useSelector(state => state.currentUser)

    // 모달용 변수 - confirm
    const [show, setShow] = useState(false)
    let msg = ''
    const [message, setMessage] = useState('')
    let todo = ''
    const [toDo, setToDo] = useState('')
    // 모달용 함수 - confirm
    const handleClose = () => setShow(false)
    const setModal = (msg, todo) => {
        setShow((show) => {
            return !show
        })
        setMessage(msg)
        setToDo(todo)
    }
    // 모달용 변수 - basic
    const [showBasic, setShowBasic] = useState(false)
    // 모달용 함수 - basic
    const handleCloseBasic = () => setShowBasic(false)
    const setModalBasic = (msg) => {
        setShowBasic((showBasic) => {
            return !showBasic
        })
        setMessage(msg)
    }
    // 모달용 변수 - confirm 로그인
    const [showLogin, setShowLogin] = useState(false)
    // 모달용 함수 - confirm 로그인
    const handleCloseLogin = () => setShowLogin(false)
    const setModalLogin = (msg) => {
        setShowLogin((showLogin) => {
            return !showLogin
        })
        setMessage(msg)
        setToDo(todo)
    }

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
    }, [postId])

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


    // community-header 상단에 도착하면 고정시키기
    // community-comment를 style="overflow:scroll"

    const likePost = (postId) => {
        if (!currentUser.username) {
            msg = '로그인 후 좋아요가 가능합니다. 로그인 하시겠습니까?'
            todo = '로그인'
            setModalLogin(msg, todo)
            return
        }
        community.likePost(postId)
        .then(result => {
            dispatch(setDetailPost(result.data))
        })
      }

      const bookmarkPost = (postId) => {
        if (!currentUser.username) {
            msg = '로그인 후 북마크가 가능합니다. 로그인 하시겠습니까?'
            todo = '로그인'
            setModalLogin(msg, todo)
            return
        }
        community.bookmarkPost(postId)
        .then(result => {
            dispatch(setDetailPost(result.data))
        })
      }
    
    const deleteConfirmed = () => {
        community.deletePost(postId)
        .then(result => {
            if (result.data===0) {
                community.detailPost(postId)
                .then(result => {
                    dispatch(setDetailPost(result.data))
                    navigate('/')
                })
            } else {
                msg = '잘못된 접근입니다'
                setModalBasic(msg)
            }
        })
    }
    const deletePost = () => {
        // let confirmResult = false
        if (detailPost.category==='photogroup') {
            msg = '포즈게시글 소유권을 삭제합니다.'
            todo = '삭제'
            setModal(msg, todo)
            // confirmResult = window.confirm('포즈게시글 소유권을 삭제합니다.')
        } else {
            msg = '프레임게시글을 삭제합니다.'
            todo = '삭제'
            setModal(msg, todo)
            // confirmResult = window.confirm('프레임게시글을 삭제합니다.')
        }
    }

    const clickFrameId = () => {
        community.framePost(detailPost.frameId)
        .then(result => {
            navigate(`/community/${btoa((result.data) * 73 + 37)}`)
        })
    }

    const changeToDate= (datetime) => {
        const date = moment(datetime).format('YYYY년 MM월 DD일')
        return date
    }
    
    return (
        <Layout>
            <main>
                <div className='community-content'>
                    <div className="community-header">
                        <h5>{ detailPost.category==='frame' ? '프레임' : null }{ detailPost.category === 'photogroup' ? '포즈' : null } 게시판</h5>
                        { detailPost.category==='photogroup' ? <div className='post-division'>{detailPost.humanCount}명</div> : null }
                        { detailPost.category==='photogroup' ? <div className='post-division-click' onClick={clickFrameId} >프레임 ID {detailPost.frameId}</div> : null }
                        { detailPost.category==='frame' ? <div className='post-division' >프레임 ID {detailPost.frameId}</div> : null }
                    </div>
                    <div className="community-body">
                        <div className="community-body-meta">
                            <div className='community-body-profiles'>
                            {
                                detailPost.users ?
                                detailPost.users.map((user) => 
                                // <img key={user.username} className='community-body-for-test' src={user.profileURL ? user.profileURL : defaultProfile} alt='profile'></img>    
                                <div className='community-body-for-test' key={user.username}><Profile user={user}/></div>
                                ) : <div className='normal-text'>게시글을 공유한 사람이 없습니다. 첫 공유의 주인공이 되어주세요</div>
                            }
                            </div>
                            <div className='user-post-edit'>
                                <div className='community-share'>
                                    {
                                        isWriter && detailPost.category!=='frame' ?
                                        <SharePost isSharing={isSharing} postId={detailPost.id} ></SharePost> : null
                                    }
                                </div>
                                <div>
                                    {
                                        isWriter && detailPost.category==='frame' ?
                                        <div className='community-frame-edit' onClick={() => navigate(`/community/edit/${btoa((postId) * 73 + 37)}`)}>프레임 편집하기</div> : null
                                    }
                                </div>
                                <div>
                                    {
                                        isWriter ?
                                        <div className='community-delete' onClick={() => deletePost()}>삭제하기</div> : null
                                    }
                                </div>
                            </div>
                        </div>
                        
                        <div className="community-body-content">
                            <div className="community-date">
                                {changeToDate(detailPost.time)}
                            </div>
                            <div className='community-img-container'>
                                <img className='community-img' src={detailPost.url} alt={detailPost.content} />
                            </div>
                            <div className='photo-info-content-left'>
                                <div className='like-cont-content'>
                                    <img className='icon-img' src={detailPost.isLike ? likeFilled : likeEmpty } alt='like' name='like' onClick={() => likePost(postId)}></img>
                                    {detailPost.likeCount}
                                </div>
                                <img className='icon-img' src={detailPost.isBookmark ? bookmarkFilled : bookmarkEmpty} alt='bookmark' name='bookmark-alt' onClick={() => bookmarkPost(postId)}></img>
                                
                            </div>
                            <div className='normal-text'>
                                { detailPost.category === "frame" ? detailPost.content : null }
                            </div>
                        </div>
                        
                        <div className='community-comment'>
                            <h6>댓글</h6>
                            <div className="community-comment-add" onClick={() => {setIsEditing(!isEditing)}}>✍ 댓글 추가하기</div>
                            <CommentsList isEditing={isEditing} setIsEditing={setIsEditing} />
                        </div>
                    </div>
                    <div id="top" onClick={() => { window.scrollTo({ top: 0, left: 0, behavior: "smooth" }) }}>
                        <FloatBtn/>
                    </div>
                </div>
                <ModalConfirm
                    show={show}
                    onHide={handleClose}
                    text={message}
                    action={deleteConfirmed}
                    todo={toDo}
                />
                <ModalConfirm
                    show={showLogin}
                    onHide={handleCloseLogin}
                    text={message}
                    action={() => navigate('/login')}
                    todo={toDo}
                />
                <ModalBasic
                    show={showBasic}
                    onHide={handleCloseBasic}
                    text={message}
                />
            </main>
        </Layout>
    )
}