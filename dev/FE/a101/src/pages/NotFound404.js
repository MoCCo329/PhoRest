import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { setPostForKakao } from '../store/modules/mypage'

import Layout from '../components/Layout/Layout'
import img404 from '../assets/img404.png'

import './NotFound404.css'


export default function NotFound404() {
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()

    const postForKakao = useSelector(state => state.postForKakao)
    const currentUser = useSelector(state => state.currentUser)

    useEffect(() => {
        if (postForKakao && currentUser.username && currentUser.kakao) {
            navigate(`/download/${btoa((postForKakao) * 73 - 37)}`)
            return dispatch(setPostForKakao(''))
        }
        else if (location.pathname==='/login' || location.pathname==='/kakao') {
            alert(`${location.pathname}`)
            navigate(-1, { replace: true })
        }
    }, [currentUser, location])


    return (
        <Layout>
            <div className='not-found-404'>
                <p>없는 페이지 입니다</p>
                <img src={img404} alt="introduce" />
            </div>
        </Layout>
    )
}