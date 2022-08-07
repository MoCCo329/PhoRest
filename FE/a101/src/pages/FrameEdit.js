import { useState, useEffect } from 'react'
import { useParams, useNavigate, Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import community from '../api/community'
import s3 from '../api/s3'
import { setDetailPost } from '../store/modules/community'

export default function FrameEdit() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const postId = (Number(atob(useParams().postId)) - 37) / 73

    const [type, setType] = useState(false)
    const [frameURL, setFrameURL] = useState('1')
    const [content, setContent] = useState('')

    const detailPost = useSelector(state => state.detailPost)

    useEffect(() => {
        if (postId!==-1) {
            setType(true)
        }
    }, [])

    useEffect(() => {
        if (type) {
            community.detailPost(postId)
            .then(result => {
                // if (result.data.category==="photogroup") {
                //     navigate(`/community/${btoa((postId) * 73 + 37)}`)
                // } else {
                    dispatch(setDetailPost(result.data))
                    setFrameURL(result.data.url)
                // }
            })
        }
    }, [postId, type])

    const changeImageURL = (e) => {

      }

    const deleteImage = () => {
        document.querySelector('#frame').value = ''
        setFrameURL('')
      }

    const clickComplete = () => {
        let formdata = new FormData()
        formdata.append('image', 1)
        formdata.append('content', content)

        s3.uploadFrame(formdata)
        .then(result => {
            console.log(result.data)
        })
    }
    
    return (
        <div>
            { frameURL ? <img src={ frameURL } alt="frameImage"></img> : null }
            {
                frameURL ? <button onClick={() => deleteImage()}>지우기</button> : null
            }
            <label htmlFor="frame">이미지 업로드 : </label>
            <input name="frame" onChange={(e) => changeImageURL(e)} type="file" accept="image/*" id="frame" />

            <label htmlFor="content">글 내용 : </label>
            <input name="content" onChange={(e) => setContent(e.target.value)} type="text" id="content" />

            <button onClick={() => clickComplete()}>완료</button>
        </div>
    )
  }