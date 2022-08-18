import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { setPostForKakao } from '../store/modules/mypage'

import Layout from '../components/Layout/Layout'


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
        } else  if (location.pathname==='/login') {
            navigate(-1)
        } else if (location.pathname==='/kakao') {
            navigate(-1)
        }
    }, [currentUser, location])
    

    return (
        <Layout>
            <div>
                페이지가 없습니다.
            </div>
        </Layout>
    )
}