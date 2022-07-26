import { useState } from 'react'
import CommunityScroll from '../components/Community/CommunityScroll'


export default function Main() {
    let [numOfPeople, setNumOfPeople] = useState(2)

    return (
        <div>
            <div className="download">
                <div className="download-img">
                    {/* <img /> */}
                </div>
                <div className="download-links">
                    <div>
                        <box-icon type='solid' name='camera'></box-icon>
                        사진 다운로드
                    </div>
                    <div>
                        <box-icon type='solid' name='camera-movie'></box-icon>
                        동영상 다운로드
                    </div>
                    <div>
                        AR 보기
                    </div>
                </div>
            </div>
            <div className="download-community">
                <div>
                    <div>
                        <p>네컷 게시판</p>
                        {/* 인원수 선택창*/}
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