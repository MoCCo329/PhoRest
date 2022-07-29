import Calendar from './../components/Calendar/Calender'
import CommunityCarousel from '../components/Community/CommunityCarousel'
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