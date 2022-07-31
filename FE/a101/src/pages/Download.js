import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import './Download.css'
import CommunityCarousel from './../components/Community/CommunityCarousel'
import Layout from '../components/Layout/Layout'

import { fetchPic } from '../store/modules/community'
import download from './../api/download'


export default function Main() {
    const picPopular = useSelector(state => state.picPopular)
    // const picRecent = useSelector(state => state.picRecent)
    const framePopular = useSelector(state => state.framePopular)
    // const frameRecent = useSelector(state => state.frameRecent)

    const dispatch = useDispatch()
    const { postId } = useParams()
    let content = useSelector(state => state.pic)

    if (!!!content.url) {
        download.pic(postId)
        .then(result => result.data)
        .then(result => {
            const copy = {
                category: String(result.category==='photogroup' ? 'pic' : 'frame'),
                postId: result.id,
                url: result.url,
                peopleNum: result.human_count,
                date: result.time,
                content: result.content
            }
            dispatch(fetchPic(copy))
        })
    }

    const reset = () => {
        dispatch(fetchPic({}))
    }
    useEffect(() => {
        return reset()
    }, [])
    
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
                        <CommunityCarousel communityType="pic" contents={picPopular}/>
                    </div>
                    <hr />
                    <div>
                        <CommunityCarousel communityType="frame" contents={framePopular}/>
                    </div>
                </div>
            </main>
        </Layout>
    )
}