import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import './Download.css'
import Layout from '../components/Layout/Layout'
import CommunityCarousel from './../components/Community/CommunityCarousel'

// functions
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
                postId: result.id,
                category: result.category,
                url: result.url,
                content: result.content,
                humanCount: result.human_count,
                time: result.time,
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
        fetch(content.url, {mode: 'no-cors'})
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
        fetch(content.url, {mode: 'no-cors'})
        .then((image) => {
            return image.blob();
        })
        .then((blob) => {
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement("a")
            a.href = url
            a.download = `PhoRest_${content.time.slice(0, 10)}.gif`
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
                        <CommunityCarousel communityType="photogroup" contents={picPopular}/>
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