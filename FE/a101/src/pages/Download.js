import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import './Download.css'
import Layout from '../components/Layout/Layout'
import CommunityCarousel from './../components/Community/CommunityCarousel'

// functions
import { setDetailPost } from '../store/modules/community'
import s3 from './../api/s3'
import mypage from './../api/mypage'


export default function Main() {
    const dispatch = useDispatch()
    const postId = (Number(atob(useParams().postId)) + 37) / 73

    let content = useSelector(state => state.detailPost)
    const currentUser = useSelector(state => state.currentUser)
    const [isOwned, setIsOwned] = useState(false)

    if (!content.url) {
        s3.detailPost(postId)
        .then(result => {
            dispatch(setDetailPost(result.data))
        })
    }
    console.log(isOwned, currentUser.username)
    useEffect(() => {
        if (!isOwned && currentUser.username) {
            mypage.ownPost(postId)
            .then(result => {
                if (result.data) {
                    setIsOwned(true)
                } else {
                    setIsOwned(false)
                }
            })
        }
    }, [currentUser])

    const imageDownload = () => {
        fetch(content.url + '?timestamp=2')
        .then((image) => {
            return image.blob();
        })
        .then((blob) => {
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement("a")
            a.href = url
            a.download = `PhoRest_${content.time.slice(0, 10)}.png`
            a.click()
            a.remove()
            window.URL.revokeObjectURL(url)
        })
    }
    const videoDownload = () => {
        fetch(content.videoURL + '?timestamp=2')
        .then((image) => {
            return image.blob();
        })
        .then((blob) => {
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement("a")
            a.href = url
            a.download = `PhoRest_${content.time.slice(0, 10)}.mp4`
            a.click()
            a.remove()
            window.URL.revokeObjectURL(url)
        })
    }

    return (
        <Layout>
            <main>
                <div className="download-img">
                    <img src={content.url} alt={content.content} /><br />
                </div>
                <div className="download-links">
                    <div className="download-links-item download-picture" onClick={() => imageDownload()}>
                        <box-icon type='solid' name='camera'></box-icon>
                        <p>사진 다운로드</p>
                    </div>
                    <div className="download-links-item download-video" onClick={() => videoDownload()}>
                        <box-icon type='solid' name='camera-movie'></box-icon>
                        <p>동영상 다운로드</p>
                    </div>
                </div>
                <hr />
                <div className="download-community">
                    <div>
                        <CommunityCarousel communityType="photogroup" />
                    </div>
                    <hr />
                    <div>
                        <CommunityCarousel communityType="frame" />
                    </div>
                </div>
            </main>
        </Layout>
    )
}