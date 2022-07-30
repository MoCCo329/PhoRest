import { useSelector } from 'react-redux'

import Calendar from './../components/Calendar/Calender'
import CommunityCarousel from '../components/Community/CommunityCarousel'
import Layout from '../components/Layout/Layout'


export default function Main() {
    const picPopular = useSelector(state => state.picPopular)
    // const picRecent = useSelector(state => state.picRecent)
    const framePopular = useSelector(state => state.framePopular)
    // const frameRecent = useSelector(state => state.frameRecent)


    return (
        <Layout>
            <div className="main-calendar">
                <Calendar />
            </div>
            <hr />
            <div className="main-community">
                <div>
                    <CommunityCarousel communityType="pic" contents={picPopular}/>
                </div>
                <hr />
                <div>
                    <CommunityCarousel communityType="frame" contents={framePopular}/>
                </div>
            </div>
        </Layout>
    )
}