import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import './Download.css'
import Layout from '../components/Layout/Layout'
import CommunityCarousel from './../components/Community/CommunityCarousel'

// functions
import { setDetailPost } from '../store/modules/community'
import s3 from './../api/s3'


export default function Main() {
    const photoLike = useSelector(state => state.photoLike)
    // const picRecent = useSelector(state => state.photoRecent])
    const frameLike = useSelector(state => state.frameLike)
    // const frameRecent = useSelector(state => state.frameRecent)

    const dispatch = useDispatch()
    console.log(useParams().postId)
    const postId = (Number(atob(useParams().postId)) + 37) / 73
    console.log(postId)
    let content = useSelector(state => state.detailPost)

    if (!!!content.url) {
        s3.detailPost(postId)
        .then(result => result.data)
        .then(result => {
            const copy = {
                postId: result.id,
                category: result.category,
                url: result.url,
                content: result.content,
                humanCount: result.humanCount,
                time: result.time,
                photogroupId: result.photogroupId,
                frameId: result.frameId,
            }
            dispatch(setDetailPost(copy))
        })
    }

    useEffect(() => {
        return () => {dispatch(setDetailPost({}))}
    }, [])
    
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
        fetch(content.url + '?timestamp=2')
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
                        <CommunityCarousel communityType="photogroup" contents={photoLike}/>
                    </div>
                    <hr />
                    <div>
                        <CommunityCarousel communityType="frame" contents={frameLike}/>
                    </div>
                </div>
            </main>
        </Layout>
    )
}