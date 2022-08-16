import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Layout from '../components/Layout/Layout'


export default function NotFound404() {
    const navigate = useNavigate()
    const location = useLocation()
    
    console.log(location.pathname==='/login')

    useEffect(() => {
        if (location.pathname==='/login') {
            return navigate('/')
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