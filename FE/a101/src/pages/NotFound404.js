import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Layout from '../components/Layout/Layout'


export default function NotFound404() {
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (location.pathname==='/login') {
            navigate(-1)
        }
        if (location.pathname==='/kakao') {
            navigate(-1)
        }
    }, [location])

    return (
        <Layout>
            <div>
                페이지가 없습니다.
            </div>
        </Layout>
    )
}