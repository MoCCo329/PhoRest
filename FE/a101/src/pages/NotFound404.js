// import { useLocation, useNavigate } from 'react-router-dom'
import Layout from '../components/Layout/Layout'


export default function NotFound404() {
    // const location = useLocation()

    // useEffect(() => {
    //     if (location.pathname==='/login') {
    //         return navigate(-2)
    //     }
    // }, [location])

    return (
        <Layout>
            <div>
                페이지가 없습니다.
            </div>
        </Layout>
    )
}