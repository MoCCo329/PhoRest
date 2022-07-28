import Calendar from './../components/Calendar/Calender'
import CommunityScroll from '../components/Community/CommunityScroll'
import Layout from '../components/Layout/Layout'


export default function Main() {
    return (
        <Layout>
            <div className="main-calendar">
                <Calendar />
            </div>
            <div className="main-community">
                <div>
                    <CommunityCarousel communityType="pic" />
                </div>
                <div>
                    <CommunityCarousel communityType="frame" />
                </div>
            </div>
        </Layout>
    )
}