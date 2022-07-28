// import { useState } from 'react'
import { useParams } from 'react-router-dom'

import CommunityCarousel from '../components/Community/CommunityCarousel'


export default function Main() {
    const { postId } = useParams()


    return (
        <div>
            <div className="download">
                <div className="download-img">
                    {/* <img /> */}
                    {postId} 사진
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
                    <CommunityCarousel communityType="frame" />
                </div>
                <div style={{height: '100px', position: 'absolute'}}></div>
                <div>
                    <CommunityCarousel communityType="Pic" />
                </div>
            </div>
        </div>
    )
}