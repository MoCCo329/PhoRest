import Calendar from './../components/Calendar/Calender'
import CommunityCarousel from '../components/Community/CommunityCarousel'


export default function Main() {
    return (
        <div>
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
        </div>
    )
}