import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import CommunityCarousel from '../components/Community/CommunityCarousel'


export default function Main() {
    const picPopular = useSelector(state => state.picPopular)
    // const picRecent = useSelector(state => state.picRecent)
    const framePopular = useSelector(state => state.framePopular)
    // const frameRecent = useSelector(state => state.frameRecent)

    const { postId } = useParams()
    useEffect(() => {
      // return // dispatch pic.actions실행해서 content변경
    })
    let content = useSelector(state => state.pic)
    
    const imageDownload = () => {
        fetch(content.url)
        .then((image) => {
            return image.blob();
        })
        .then((blob) => {
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement("a")
            a.href = url
            a.download = `PhoRest_${content.date}.png`
            a.click()
            a.remove()
            window.URL.revokeObjectURL(url)
        })
    }
    const videoDownload = () => {
        fetch(content.url)
        .then((image) => {
            return image.blob();
        })
        .then((blob) => {
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement("a")
            a.href = url
            a.download = `PhoRest_${content.date}.gif`
            a.click()
            a.remove()
            window.URL.revokeObjectURL(url)
        })
    }

    return (
        <div>
            <div className="download">
                <div className="download-img">
                    <img src={content.url} alt={content.content} />
                    {postId} 사진
                </div>
                <hr />
                <div className="download-links">
                    <div onClick={() => imageDownload()}>
                        <box-icon type='solid' name='camera'></box-icon>
                        사진 다운로드
                    </div>
                    <div onClick={() => videoDownload()}>
                        <box-icon type='solid' name='camera-movie'></box-icon>
                        동영상 다운로드
                    </div>
                    {/* <div>
                        AR 보기
                    </div> */}
                </div>
            </div>
            <hr />
            <div className="download-community">
                <div>
                    <CommunityCarousel communityType="pic" contents={picPopular}/>
                </div>
                <hr />
                <div>
                    <CommunityCarousel communityType="frame" contents={framePopular}/>
                </div>
            </div>
        </div>
    )
}