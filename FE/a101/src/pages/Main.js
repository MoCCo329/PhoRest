import { useState } from 'react'
import Calendar from './../components/Calendar/Calender'
import CommunityScroll from '../components/Community/CommunityScroll'


export default function Main() {

    let [numOfPeople, setNumOfPeople] = useState(2)

    return (
        <div>
            <div className="main-calendar">
                <Calendar />
            </div>
            <div className="main-community">
                <div>
                    <div>
                        <p>네컷 게시판</p>
                    </div>
                    <CommunityScroll communityType="pic" numOfPeople={numOfPeople}/>
                </div>
                <div>
                    <CommunityScroll communityType="frame" />
                </div>
            </div>
        </div>
    )
}