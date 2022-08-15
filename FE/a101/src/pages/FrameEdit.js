import './FrameEdit.css'

import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import ImageEdit from '../components/Utils/ImageEdit'
import Layout from '../components/Layout/Layout'

import community from '../api/community'
import ModalBasic from '../components/Utils/ModalBasic'
import { setDetailPost } from '../store/modules/community'

export default function FrameEdit() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const postId = (Number(atob(useParams().postId)) - 37) / 73

    const [type, setType] = useState(false)
    const [frameURL, setFrameURL] = useState('')
    const [content, setContent] = useState('')

    // 모달용 변수 - basic
    const [showBasic, setShowBasic] = useState(false)
    let msg = ''
    const [message, setMessage] = useState('')
    // 모달용 함수 - basic
    const handleCloseBasic = () => setShowBasic(false)
    const setModalBasic = (msg) => {
    setShowBasic((showBasic) => {
    return !showBasic
    })
    setMessage(msg)
    }

    useEffect(() => {  // LTM2이면 new frame
        if (postId!==-1) {  // true 면 수정, false면 생성
            setType(true)
        }
    }, [])

    useEffect(() => {
        if (type) {
            community.detailPost(postId)
            .then(result => {
                if (result.data.category==="photogroup") {
                    navigate(`/community/${btoa((postId) * 73 + 37)}`)
                } else {
                    dispatch(setDetailPost(result.data))
                    setFrameURL(result.data.url)
                    setContent(result.data.content)
                }
            })
        }
    }, [postId, type])


    const editComplete = () => {
        let formdata = new FormData()
        formdata.append('content', content)
        formdata.append('image', null)

        community.editPost(postId, formdata)
        .then(result => {
            if (result.data===0) {
                navigate(`/community/${btoa(postId * 73 + 37)}`)
            } else {
                switch ( result.data ) {
                    case 1 :     
                        msg = '로그인 정보가 정확하지 않습니다. 다시 로그인 해주세요.'
                        setModalBasic(msg)
                        break    
                    case 2 :     
                        msg = '수정하려는 게시물은 존재하지 않는 게시물입니다.'
                        setModalBasic(msg)
                        break    
                    case 3 :     
                        msg = '로그인한 계정의 마이페이지에 존재하지 않는 게시물입니다.'
                        setModalBasic(msg)
                        break     
                    case 4:
                        msg = '잘못된 접근입니다.'
                        setModalBasic(msg)
                        break
                    case 6:
                        msg = '글자수는 최대 255글자를 넘을 수 없습니다.'
                        setModalBasic(msg)
                        break
                    default :    
                        break
                }
            }
        })
    }


    return (
        <Layout>
            {
                type ?
                <div className='frame-edit-content'>
                    <p className='notice-frame'>✅ 권장되는 프레임의 사이즈는 가로: 1500px 세로: 1000px 입니다</p>
                    {
                        frameURL ? <img src={ frameURL } alt="frameImage"></img> : null
                    }

                    <label htmlFor="content">글 내용 : </label>
                    <input name="content" onChange={(e) => setContent(e.target.value)} type="text" id="content" defaultValue={content} />

                    <button onClick={editComplete}>완료</button>
                    <button onClick={() => navigate(-1)}>뒤로가기</button>
                </div> :
                <ImageEdit></ImageEdit>
            }
            <ModalBasic
                show={showBasic}
                onHide={handleCloseBasic}
                text={message}
            />  
        </Layout>
    )
  }